<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Price;

class PriceSeeder extends Seeder
{
    public function run(): void
{
    // iPhone 17
    Price::create([
        'product_id' => 1,
        'store_id' => 1,
        'price' => 129999.99,
        'product_url' => 'https://gigatron.rs/',
    ]);

    Price::create([
        'product_id' => 1,
        'store_id' => 2,
        'price' => 126999.99,
        'product_url' => 'https://www.tehnomanija.rs/',
    ]);

    // Samsung Galaxy S25
    Price::create([
        'product_id' => 2,
        'store_id' => 2,
        'price' => 104999.99,
        'product_url' => 'https://www.tehnomanija.rs/',
    ]);

    Price::create([
        'product_id' => 2,
        'store_id' => 3,
        'price' => 101999.99,
        'product_url' => 'https://www.bcgroup-online.com/',
    ]);

    // Xiaomi 15
    Price::create([
        'product_id' => 3,
        'store_id' => 1,
        'price' => 89999.99,
        'product_url' => 'https://gigatron.rs/',
    ]);

    Price::create([
        'product_id' => 3,
        'store_id' => 3,
        'price' => 85999.99,
        'product_url' => 'https://www.bcgroup-online.com/',
    ]);

    // Lenovo Legion 5
    Price::create([
        'product_id' => 4,
        'store_id' => 1,
        'price' => 159999.99,
        'product_url' => 'https://gigatron.rs/',
    ]);

    Price::create([
        'product_id' => 4,
        'store_id' => 3,
        'price' => 154999.99,
        'product_url' => 'https://www.bcgroup-online.com/',
    ]);

    // ASUS TUF Gaming A15
    Price::create([
        'product_id' => 5,
        'store_id' => 2,
        'price' => 139999.99,
        'product_url' => 'https://www.tehnomanija.rs/',
    ]);

    Price::create([
        'product_id' => 5,
        'store_id' => 3,
        'price' => 134999.99,
        'product_url' => 'https://www.bcgroup-online.com/',
    ]);

    // HP ProBook 450
    Price::create([
        'product_id' => 6,
        'store_id' => 1,
        'price' => 109999.99,
        'product_url' => 'https://gigatron.rs/',
    ]);

    Price::create([
        'product_id' => 6,
        'store_id' => 2,
        'price' => 112999.99,
        'product_url' => 'https://www.tehnomanija.rs/',
    ]);

    // NVIDIA GeForce RTX 5070
    Price::create([
        'product_id' => 7,
        'store_id' => 1,
        'price' => 94999.99,
        'product_url' => 'https://gigatron.rs/',
    ]);

    Price::create([
        'product_id' => 7,
        'store_id' => 3,
        'price' => 91999.99,
        'product_url' => 'https://www.bcgroup-online.com/',
    ]);

    // AMD Radeon RX 9070 XT
    Price::create([
        'product_id' => 8,
        'store_id' => 2,
        'price' => 99999.99,
        'product_url' => 'https://www.tehnomanija.rs/',
    ]);

    Price::create([
        'product_id' => 8,
        'store_id' => 3,
        'price' => 96999.99,
        'product_url' => 'https://www.bcgroup-online.com/',
    ]);

    // NVIDIA GeForce RTX 5060
    Price::create([
        'product_id' => 9,
        'store_id' => 1,
        'price' => 64999.99,
        'product_url' => 'https://gigatron.rs/',
    ]);

    Price::create([
        'product_id' => 9,
        'store_id' => 2,
        'price' => 67999.99,
        'product_url' => 'https://www.tehnomanija.rs/',
    ]);
}
}