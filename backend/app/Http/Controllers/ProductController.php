<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        // Eager load category and brand to prevent N+1 query problems
        return ProductResource::collection(
            Product::with(['category', 'brand'])->latest()->get()
        );
    }

    public function store(StoreProductRequest $request): ProductResource
    {
        $validated = $request->validated();
        
        // Generate unique URL slug
        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        
        while (Product::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . strtolower(Str::random(4));
        }
        
        $validated['slug'] = $slug;
        $validated['is_active'] = true;

        $product = Product::create($validated);

        // Load relationships before returning the resource
        $product->load(['category', 'brand']);

        return new ProductResource($product);
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product->load(['category', 'brand']));
    }

    public function update(Request $request, Product $product): ProductResource
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'brand_id' => 'sometimes|required|exists:brands,id',
            'sku' => 'sometimes|required|string|unique:products,sku,' . $product->id,
            'cost_price' => 'sometimes|required|numeric|min:0',
            'selling_price' => 'sometimes|required|numeric|gte:cost_price',
            'stock_quantity' => 'sometimes|required|integer|min:0',
            'alert_quantity' => 'sometimes|required|integer|min:1',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        if (isset($validated['name']) && $validated['name'] !== $product->name) {
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                $slug = $baseSlug . '-' . strtolower(Str::random(4));
            }
            $validated['slug'] = $slug;
        }

        $product->update($validated);

        return new ProductResource($product->load(['category', 'brand']));
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}