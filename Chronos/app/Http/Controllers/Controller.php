<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function authUser() {
        if(! $auth = request()->header('Authorization')) {
            return null;
        }
        if(! $bearer = explode(' ', $auth)) {
            return null;
        }
        if(! $token = $bearer[1]) {
            return null;
        }
        return User::where('remember_token', $token)->first();
    }
}
