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
        return User::all();
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
        $credentials = $request->validate([
            'login'     => ['bail', 'string', 'unique:users', 'min:2', 'max:32'],
            'full_name' => ['bail', 'string', 'min:2', 'max:64'],
            'email'     => ['bail', 'email', 'unique:users', 'min:8', 'max:64'],
            'region'    => ['bail', 'string', 'min:2', 'max:8'],
        ]);

        $user = User::find($id);
        $credentials = $request->all();   
        $user->update($credentials);
        return $user;
    }

    /**
     * Delete user
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        return User::destroy($id);
    }
}
