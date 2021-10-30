<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

use Mail;

use App\Models\User;

class AuthenticationController extends Controller
{
    /**
     * Register a new user with unique login and email
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        
    }

    /**
     * User sign in
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JWT $token
     */
    public function login(Request $request)
    {

    }

    /**
     * User sign out
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {

    }

    /**
     * Refresh a token
     *
     * @return \Illuminate\Http\Response
     */
    public function refreshToken() {
        return $this->saveToken(auth()->refresh());
    }

    /**
     * Save JWT token in table and get it array structure
     *
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function saveToken($token) {

    }

    /**
     * Send a link to user e-mail
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function passwordForgot(Request $request)
    {

    }

    /**
     * Reset user password
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $confirm_token
     * 
     * @return \Illuminate\Http\Response
     */
    public function passwordReset(Request $request, $confirm_token)
    {

    }
}