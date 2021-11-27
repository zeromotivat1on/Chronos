<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;
use App\Models\Calendar;

class CalendarController extends Controller
{
    /**
     * Find calendar by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getBy($id)
    {
        if(! $calendar = Calendar::find($id)) {
            return response()->json([
                'error' => 'Calendar with id not found',
                'id' => $id,
            ]);
        }

        return response()->json([
            'message' => 'Found calendar',
            'calendar' => $calendar,
        ]);
    }

    /**
     * Create a new calendar for calendar
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $credentials = $request->validate([
            'title'         => ['bail', 'required', 'string', 'min:2', 'max:32'],
            'description'   => ['bail', 'required', 'string', 'max:512'],
            'main'          => ['bail', 'required', 'bool'],
            'owner_id'      => ['bail', 'required', 'int']
        ]);
        
        $calendar = Calendar::create($credentials);
        return response()->json([
            'message' => 'Calendar successfully created',
            'calendar' => $calendar,
        ], 200);
    }

    /**
     * Update calendar
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return App\Models\Calendar $calendar
     */
    public function update(Request $request, $id)
    {
        if(! $calendar = Calendar::find($id)) {
            return response()->json([
                'error' => 'Calendar with id not found',
                'id' => $id,
            ], 404);
        }

        $credentials = $request->validate([
            'title'         => ['bail', 'string', 'min:2', 'max:32'],
            'description'   => ['bail', 'string', 'max:512'],
        ]);
        $calendar->update($credentials);

        return response()->json([
            'message' => 'Calendar update success',
            'updated_event' => $calendar,
        ], 200);
    }

    /**
     * Delete calendar
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        if(! Calendar::destroy($id)) {
            return response()->json([
                'error' => 'Calendar with id not found',
                'id' => $id,
            ], 404);
        }

        return response()->json([
            'message' => 'Calendar delete success',
        ]);
    }
    
    /**
     * Get calendar owner
     *
     * @return \Illuminate\Http\Response
     */
    public function owner($id)
    {
        return response()->json(
            Calendar::find($id)->owner()->first()
        );
    }

    /**
     * Get calendar events
     *
     * @return \Illuminate\Http\Response
     */
    public function events($id)
    {
        return response()->json(
            Calendar::find($id)->events()->get()
        );
    }
}
