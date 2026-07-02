<?php

use App\Http\Controllers\ExpenseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\CustomerController;

// Public Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Must be logged in via Sanctum cookie)
Route::middleware('auth:sanctum')->group(function () {
    // Phase 7: Wholesale Suppliers & Purchase Orders
    Route::apiResource('suppliers', SupplierController::class);
    Route::apiResource('purchase-orders', PurchaseOrderController::class);

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Phase 3: Inventory & Product Master Endpoints
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('brands', BrandController::class);
    Route::apiResource('products', ProductController::class);

    // Phase 5: Billing & POS Engine Endpoints
    Route::apiResource('invoices', InvoiceController::class);

    // Phase 6: Customers
    Route::apiResource('customers', CustomerController::class);
    
    // Phase 8: Store Expenses
    Route::apiResource('expenses', ExpenseController::class);

    // Phase 9: Dashboard
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index']);
});