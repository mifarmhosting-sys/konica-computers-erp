<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // ==========================================
    // READ (List)
    // Route: GET /api/customers
    // ==========================================
    public function index()
    {
        // Fetches all CRM customers, newest first
        return Customer::latest()->get();
    }

    // ==========================================
    // CREATE
    // Route: POST /api/customers
    // ==========================================
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:customers',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string'
        ]);

        $customer = Customer::create($validated);
        
        // 201 Created HTTP status code
        return response()->json($customer, 201);
    }

    // ==========================================
    // READ (Single)
    // Route: GET /api/customers/{customer}
    // ==========================================
    public function show(Customer $customer)
    {
        // Laravel Route Model Binding automatically fetches the record
        return $customer;
    }

    // ==========================================
    // UPDATE
    // Route: PUT/PATCH /api/customers/{customer}
    // ==========================================
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            // Notice: We append the current customer ID so it doesn't fail its own unique phone check
            'phone' => 'sometimes|required|string|max:20|unique:customers,phone,'.$customer->id,
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string'
        ]);

        $customer->update($validated);
        return response()->json($customer);
    }

    // ==========================================
    // DELETE
    // Route: DELETE /api/customers/{customer}
    // ==========================================
    public function destroy(Customer $customer)
    {
        $customer->delete();
        
        // 204 No Content HTTP status code
        return response()->json(null, 204);
    }
}