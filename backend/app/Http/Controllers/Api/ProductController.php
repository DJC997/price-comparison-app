<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
{
    $search = $request->query('search');

    $products = Product::with([
        'category',
        'prices.store'
    ])
    ->when($search, function ($query, $search) {
        $query->where('name', 'like', '%' . $search . '%');
    })
    ->get();

    return response()->json($products);
}

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }
}
