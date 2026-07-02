<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\PurchaseOrder;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Total Revenue: Sum of all PAID invoices in the current month
        $totalRevenue = Invoice::whereBetween('created_at', [$startOfMonth, $endOfMonth])
                               ->where('status', 'paid')
                               ->sum('total_amount');

        // Total Cost of Goods Sold: Sum of all RECEIVED purchase orders in the current month
        $totalCogs = PurchaseOrder::whereBetween('order_date', [$startOfMonth, $endOfMonth])
                                  ->where('status', 'received')
                                  ->sum('total_amount');

        // Total Expenses: Sum of all logged expenses in the current month
        $totalExpenses = Expense::whereBetween('expense_date', [$startOfMonth, $endOfMonth])
                                ->sum('amount');

        // Net Profit = Revenue - (COGS + Expenses)
        $netProfit = $totalRevenue - $totalCogs - $totalExpenses;

        return response()->json([
            'data' => [
                'total_revenue' => (float) $totalRevenue,
                'total_cost_of_goods' => (float) $totalCogs,
                'total_expenses' => (float) $totalExpenses,
                'net_profit' => (float) $netProfit,
                'month_label' => Carbon::now()->format('F Y'),
            ]
        ]);
    }
}