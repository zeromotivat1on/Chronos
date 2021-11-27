<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CalendarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::Table('calendars')->insert([
            'title' => 'lolka_calendar',
            'description' => 'Lol Kekovich calendar',
            'main' => true,
            'owner_id' => 1
        ]);

        \DB::Table('calendars')->insert([
            'title' => 'doder_calendar',
            'description' => 'Dod Erjanovich calendar',
            'main' => true,
            'owner_id' => 2
        ]);
        
        \DB::Table('calendars')->insert([
            'title' => 'Klumba_calendar',
            'description' => 'Klumb Anek calendar',
            'main' => true,
            'owner_id' => 3
        ]);

        \DB::Table('calendars')->insert([
            'title' => 'Shtora_calendar',
            'description' => 'Shtor Alik calendar',
            'main' => true,
            'owner_id' => 4
        ]);
    }
}
