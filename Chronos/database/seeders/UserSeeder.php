<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::Table('users')->insert([
            'login' => 'lolka',
            'full_name' => 'Lol Kekovich',
            'email' => 'lol.aka.kek@gmail.com',
            'password' => Hash::make('loler228kekich322'),
            'region' => 'ua',
        ]);

        \DB::Table('users')->insert([
            'login' => 'doder',
            'full_name' => 'Dod Erjanovich',
            'email' => 'dodd.err@gmail.com',
            'password' => Hash::make('superdoder'),
            'region' => 'uk',
        ]);

        \DB::Table('users')->insert([
            'login' => 'Klumba',
            'full_name' => 'Klumb Anek',
            'email' => 'klumba@gmail.com',
            'password' => Hash::make('klubnyaksupertopxddd'),
            'region' => 'af',
        ]);

        \DB::Table('users')->insert([
            'login' => 'Shtora',
            'full_name' => 'Shtor Alik',
            'email' => 'shtorka@gmail.com',
            'password' => Hash::make('shtorO4ka'),
            'region' => 'ru',
        ]);
    }
}
