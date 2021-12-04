<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;

class EventController extends Controller
{

    /**
     * Find event by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getBy($id)
    {
        if(! $event = Event::find($id)) {
            return response()->json([
                'error' => 'Event with id not found',
                'id' => $id,
            ]);
        }

        return response()->json($event, 200);
    }

    /**
     * Create a new event for calendar
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $credentials = $request->validate([
            'title'         => ['bail', 'required', 'string', 'min:2', 'max:32'],
            'description'   => ['bail', 'required', 'string', 'max:512'],
            'event_date'    => ['bail', 'required', 'date'],
            'color'         => ['bail', 'required', 'string', 'max:16'],
            'category'      => ['bail', 'required', 'in:arrangement,reminder,task'],
            'calendar_id'   => ['bail', 'required', 'int'],
        ]);
        
        $user = $this->authUser();
        $credentials['owner_id'] = $user->id;
        $event = Event::create($credentials);
        return response()->json($event, 200);
    }

    /**
     * Update event
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return App\Models\Event $event
     */
    public function update(Request $request, $id)
    {
        if(! $event = Event::find($id)) {
            return response()->json([
                'error' => 'Event with id not found',
                'id' => $id,
            ], 404);
        }

        $credentials = $request->validate([
            'title'         => ['bail', 'string', 'min:2', 'max:32'],
            'description'   => ['bail', 'string', 'max:512'],
            'event_date'    => ['bail', 'datetime'],
            'color'         => ['bail', 'string', 'max:16'],
            'category'      => ['bail', 'enum', "in('arrangement', 'reminder', 'task')"],
        ]);
        $event->update($credentials);

        return response()->json($event, 200);
    }

    /**
     * Delete event
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        if(! Event::destroy($id)) {
            return response()->json([
                'error' => 'Event with id not found',
                'id' => $id,
            ], 404);
        }

        return response()->json([
            'message' => 'Event delete success',
        ], 200);
    }
    
    /**
     * Get event owner
     *
     * @return \Illuminate\Http\Response
     */
    public function owner($id)
    {
        return response()->json(
            Event::find($id)->owner()->first(),
            200
        );
    }
}
