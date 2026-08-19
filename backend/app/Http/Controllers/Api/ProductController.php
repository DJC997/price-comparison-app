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
$category = $request->query('category');
$sort = $request->query('sort');

$query = Product::with([
'category',
'prices.store'
]);
$query->when($search, function ($query, $search) {
$query->where('name', 'like', '%' . $search . '%');
});
$query->when($category, function ($query, $category) {
$query->where('category_id', $category);
});
$query->when($sort === 'name_asc', function ($query) {
$query->orderBy('name', 'asc');
});

$query->when($sort === 'name_desc', function ($query) {
$query->orderBy('name', 'desc');
});

$query->when($sort === 'price_asc', function ($query) {
$query->withMin('prices', 'price')
->orderBy('prices_min_price', 'asc');
});

$query->when($sort === 'price_desc', function ($query) {
$query->withMin('prices', 'price')
->orderBy('prices_min_price', 'desc');
});

$products = $query->get();

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
