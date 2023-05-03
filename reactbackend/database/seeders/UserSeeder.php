<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {

        DB::table('users')->insert([
            'name'=>'Sneha',
            'email'=>'Sneha@sigmainfo.nett',
            'password'=>Hash::make('Sneha@1234'),
            'isAdmin' => true

        ]);
        //
    }
}
