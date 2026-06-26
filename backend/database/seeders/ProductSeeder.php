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
            'name' => 'iPhone 15',
            'description' => 'Apple smartphone'
        ]);

        Product::create([
            'category_id' => 2,
            'name' => 'Lenovo Legion 5',
            'description' => 'Gaming laptop'
        ]);
    }
}