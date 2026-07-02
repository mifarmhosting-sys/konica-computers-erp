<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MasterDataSeeder extends Seeder
{
    public function run(): void
    {
        $brands = ['HP', 'Dell', 'Lenovo', 'Apple', 'Konica'];
        
        foreach ($brands as $brandName) {
            Brand::firstOrCreate(
                ['name' => $brandName],
                [
                    'slug' => Str::slug($brandName),
                    'is_active' => true
                ]
            );
        }

        $categories = ['Laptops', 'Desktops', 'Peripherals', 'Networking', 'Storage'];
        
        foreach ($categories as $categoryName) {
            Category::firstOrCreate(
                ['name' => $categoryName],
                [
                    'slug' => Str::slug($categoryName),
                    'is_active' => true
                ]
            );
        }
    }
}