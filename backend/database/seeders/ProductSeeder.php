<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
public function run(): void
{
Product::create([
'category_id' => 1,
'name' => 'iPhone 17',
'description' => 'Apple smartphone'
]);

Product::create([
'category_id' => 1,
'name' => 'Samsung Galaxy S25',
'description' => 'Samsung smartphone'
]);

Product::create([
'category_id' => 1,
'name' => 'Xiaomi 15',
'description' => 'Xiaomi smartphone'
]);

Product::create([
'category_id' => 2,
'name' => 'Lenovo Legion 5',
'description' => 'Gaming laptop'
]);

Product::create([
'category_id' => 2,
'name' => 'ASUS TUF Gaming A15',
'description' => 'Gaming laptop'
]);

Product::create([
'category_id' => 2,
'name' => 'HP ProBook 450',
'description' => 'Business laptop'
]);

Product::create([
'category_id' => 3,
'name' => 'NVIDIA GeForce RTX 5070',
'description' => 'Graphics card'
]);

Product::create([
'category_id' => 3,
'name' => 'AMD Radeon RX 9070 XT',
'description' => 'Graphics card'
]);

Product::create([
'category_id' => 3,
'name' => 'NVIDIA GeForce RTX 5060',
'description' => 'Graphics card'
]);
}
}