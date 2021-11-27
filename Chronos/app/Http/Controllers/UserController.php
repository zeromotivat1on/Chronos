<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Get all users
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll()
    {
        if(! $user = User::find($id)) {
            return response()->json([
                'error' => 'user with id not found',
                'id' => $id,
            ]);
        }

        return response()->json([
            'message' => 'Found user',
            'user' => $user,
        ]);
    }

    /**
     * Find user by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getBy($id)
    {
        return User::find($id);
    }

    /**
     * Update user
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return App\Models\User $user
     */
    public function update(Request $request, $id)
    {
        if(! $user = User::find($id)) {
            return response()->json([
                'error' => 'User with id not found',
                'id' => $id,
            ], 404);
        }

        $credentials = $request->validate([
            'login'     => ['bail', 'string', 'unique:users', 'min:2', 'max:32'],
            'full_name' => ['bail', 'string', 'min:2', 'max:64'],
            'email'     => ['bail', 'email', 'unique:users', 'min:8', 'max:64'],
            'region'    => ['bail', 'string', 'min:2', 'max:8'],
        ]);
        $user->update($credentials);

        return response()->json([
            'message' => 'User update success',
            'updated_user' => $user,
        ], 200);
    }

    /**
     * Delete user
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        if(! User::destroy($id)) {
            return response()->json([
                'error' => 'User with id not found',
                'id' => $id,
            ], 404);
        }

        return response()->json([
            'message' => 'User delete success',
        ]);
    }

    /**
     * Get all user events
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function events($id)
    {
        return response()->json(
            User::find($id)->events()->get()
        );
    }
}
