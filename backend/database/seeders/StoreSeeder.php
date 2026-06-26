<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Store;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        Store::create([
            'name' => 'Gigatron'
        ]);

        Store::create([
            'name' => 'Tehnomanija'
        ]);

        Store::create([
            'name' => 'BC Group'
        ]);
    }
}