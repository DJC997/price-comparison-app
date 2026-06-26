<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'name' => 'Telefoni'
        ]);

        Category::create([
            'name' => 'Laptopovi'
        ]);

        Category::create([
            'name' => 'Grafičke kartice'
        ]);
    }
}