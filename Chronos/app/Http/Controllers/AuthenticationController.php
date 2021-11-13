<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Mail;


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
        $credentials = $request->validate([
            'login'     => ['bail', 'required', 'string', 'unique:users', 'min:2', 'max:32'],
            'full_name' => ['bail', 'required', 'string', 'min:2', 'max:64'],
            'email'     => ['bail', 'required', 'email', 'unique:users', 'min:8', 'max:64'],
            'password'  => ['bail', 'required', 'string', 'confirmed', 'min:4', 'max:256'],
            'region'    => ['bail', 'required', 'string', 'min:2', 'max:8'],
        ]);

        $credentials['password'] = Hash::make($credentials['password']);
        $user = User::create($credentials);
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ]);
    }

    /**
     * User sign in
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'login'     => ['bail', 'required', 'string', 'min:2', 'max:32'],
            'password'  => ['bail', 'required', 'string', 'min:4', 'max:256'],
        ]);

        try {
            $token = JWTAuth::attempt($credentials);
            $user = JWTAuth::user();

            $user->remember_token = $token;
            $user->save();
            
            return response()->json([
                'message' => 'User login success',
                'jwt_token' => $token,
                'token_type' => 'bearer',
                'user' => $user,
            ]);
        } catch(\Tymon\JWTAuth\Exceptions $ex) {
            return response()->json([
                'error' => 'User login exception',
                'error' => $ex,
            ]);
        }
    }

    /**
     * User sign out
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        if(JWTAuth::check()) {
            return response()->json([
                'error' => 'Login to start using the service',
            ]);
        }

        try {
            auth()->logout(true);
            return response()->json([ 
                'message' => 'User logout success',
            ]);
        } catch(\Tymon\JWTAuth\Exceptions $ex) {
            return response()->json([
                'error' => 'User logout exception',
                'exception' => $ex,
            ]);
        }
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