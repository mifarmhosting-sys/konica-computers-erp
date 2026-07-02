<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InvoiceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return InvoiceResource::collection(Invoice::with('items.product')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'nullable|string|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'payment_method' => 'required|in:cash,upi,card',
            'discount_amount' => 'nullable|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            $subtotal = 0;
            $invoiceItemsData = [];

            // Group items by product_id to gracefully handle duplicate cart entries
            $cartItems = collect($validated['items'])->groupBy('product_id')->map(function ($row) {
                return [
                    'product_id' => $row->first()['product_id'],
                    'quantity' => $row->sum('quantity')
                ];
            });

            foreach ($cartItems as $item) {
                // lockForUpdate() prevents race conditions if multiple cashiers sell the exact same item simultaneously
                $product = Product::where('id', $item['product_id'])->lockForUpdate()->first();

                if ($product->stock_quantity < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => ["Insufficient stock for {$product->name}. Available: {$product->stock_quantity}"]
                    ]);
                }

                $itemSubtotal = $product->selling_price * $item['quantity'];
                $subtotal += $itemSubtotal;

                $invoiceItemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->selling_price,
                    'item_subtotal' => $itemSubtotal,
                ];

                // Deduct inventory stock!
                $product->decrement('stock_quantity', $item['quantity']);
            }

            // Server-side financial calculations (blocks frontend tampering)
            $discountAmount = $validated['discount_amount'] ?? 0;
            $taxableAmount = max(0, $subtotal - $discountAmount);
            $taxAmount = $taxableAmount * 0.18; // 18% GST
            $totalAmount = $taxableAmount + $taxAmount;

            // Generate Invoice Number (e.g. INV-2026-00001)
            $lastInvoice = Invoice::lockForUpdate()->latest('id')->first();
            $nextId = $lastInvoice ? $lastInvoice->id + 1 : 1;
            $invoiceNumber = 'INV-' . date('Y') . '-' . str_pad($nextId, 5, '0', STR_PAD_LEFT);

            $invoice = Invoice::create([
                'invoice_number' => $invoiceNumber,
                'customer_name' => $validated['customer_name'] ?? null,
                'customer_phone' => $validated['customer_phone'] ?? null,
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $validated['payment_method'],
                'status' => 'paid',
            ]);

            // Save items using relation
            $invoice->items()->createMany($invoiceItemsData);

            DB::commit();

            return new InvoiceResource($invoice->load('items.product'));

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    
    public function show(Invoice $invoice)
    {
        return new InvoiceResource($invoice->load('items.product'));
    }
}