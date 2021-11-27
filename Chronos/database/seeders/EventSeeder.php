<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::Table('events')->insert([
            'title' => 'lolka_event',
            'description' => 'Lol Kekovich event',
            'event_date' => Carbon::tomorrow(),
            'color' => 'red',
            'category' => 'task',
            'calendar_id' => 1,
            'owner_id' => 1,
        ]);

        \DB::Table('events')->insert([
            'title' => 'doder_event',
            'description' => 'Dod Erjanovich event',
            'event_date' => Carbon::tomorrow(),
            'color' => 'blue',
            'category' => 'arrangement',
            'calendar_id' => 2,
            'owner_id' => 2,
        ]);

        \DB::Table('events')->insert([
            'title' => 'Klumba_event',
            'description' => 'Klumb Anek event',
            'event_date' => Carbon::today(),
            'color' => 'green',
            'category' => 'reminder',
            'calendar_id' => 3,
            'owner_id' => 3,
        ]);

        \DB::Table('events')->insert([
            'title' => 'Shtora_event',
            'description' => 'Shtor Alik event',
            'event_date' => Carbon::tomorrow(),
            'color' => 'black',
            'category' => 'reminder',
            'calendar_id' => 4,
            'owner_id' => 4,
        ]);
    }
}
