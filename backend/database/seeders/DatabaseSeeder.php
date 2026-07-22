<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            MasterDataSeeder::class,
        ]);

        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        User::updateOrCreate(
            ['email' => 'admin@konicacomputers.store'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('passw0rd'),
                'role_id' => $adminRole->id,
                'email_verified_at' => now(),
            ]
        );
    }
}
