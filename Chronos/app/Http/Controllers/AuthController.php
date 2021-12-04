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
use App\Models\Calendar;
use Mail;


class AuthController extends Controller
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
        
        Calendar::create([
            'title' => 'Main',
            'description' => $user->login.' main calendar',
            'main' => true,
            'owner_id' => $user->id,
        ]);

        return response()->json($user, 200);
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

        if(! $token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'error' => 'Incorrect login or password'
            ], 400);
        }

        $user = JWTAuth::user();
        $user->remember_token = $token;
        $user->save();
        
        return response()->json([
            'message' => 'User login success',
            'jwt_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ], 200);
    }

    /**
     * User sign out
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $user = $this->authUser();
        $user->remember_token = null;
        $user->save();
        auth()->logout(true);
        return response()->json([ 
            'message' => 'User logout success',
        ], 200);
    }

    /**
     * Send password reset link to user email
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function passwordForgot(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['bail', 'required', 'email', 'min:8', 'max:64'],
        ]);
        $email = $credentials['email'];
        if(! $user = User::where('email', $email)->first()) {
            return response()->json([
                'error' => 'User with email not found',
                'email' => $email,
            ], 404);
        }

        $user->remember_token = null;
        $user->save();

        $token = Str::random(32);
        $passwordResetsTable = DB::table('password_resets');
        if ($passwordResetsTable->exists('email', $email)) {
            $passwordResetsTable
                ->where('email', $email)
                ->update(['token' => $token]);
        } else {
            $passwordResetsTable->insert([
                'email' => $email,
                'token' => $token
            ]);
        }

        $dataToSend = [
            'username'  => $user->login,
            'resetLink' => url('/password-reset/'.$token)
        ];

        Mail::send('passwordReset', $dataToSend, function($message) use ($email) {
            $message->to($email);
            $message->subject('Password Reset');
        });

        return response()->json([
            'message' => 'Password reset link email disptach success',
            'email' => $email,
        ], 200);
    }

    /**
     * Reset user password
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $token
     * @return \Illuminate\Http\Response
     */
    public function passwordReset(Request $request, $token)
    {
        $credentials = $request->validate([
            'password'  => ['bail', 'required', 'string', 'confirmed', 'min:4', 'max:256'],
        ]);
        if(! $passwordResetsRecord = DB::table('password_resets')->where('token', $token)->first()) {
            return response()->json([
                'error' => 'Record with token not found',
                'table' => 'password_resets',
                'token' => $token,
            ], 404);
        }

        if(! $user = User::where('email', $passwordResetsRecord->email)->first()) {
            return response()->json([
                'error' => 'User with email not found',
                'table' => 'password_resets',
                'email' => $passwordResetsRecord->email,
            ], 404);
        }

        $newPassword = $credentials['password'];
        $user->password = Hash::make($newPassword);
        $user->save();

        DB::table('password_resets')->where('token', $token)->update(['token' => null]);

        return response()->json([
            'message' => 'Password reset success'
        ], 200);
    }
}