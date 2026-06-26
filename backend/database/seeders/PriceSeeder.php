<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Price;

class PriceSeeder extends Seeder
{
    public function run(): void
    {
        Price::create([
            'product_id' => 1,
            'store_id' => 1,
            'price' => 124999.99,
            'product_url' => 'https://gigatron.rs/iphone-15'
        ]);

        Price::create([
            'product_id' => 1,
            'store_id' => 2,
            'price' => 122499.99,
            'product_url' => 'https://tehnomanija.rs/iphone-15'
        ]);

        Price::create([
            'product_id' => 2,
            'store_id' => 3,
            'price' => 189999.99,
            'product_url' => 'https://bcgroup.rs/legion-5'
        ]);
    }
}