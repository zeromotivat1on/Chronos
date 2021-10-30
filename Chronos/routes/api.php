<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function () {
    Route::post('/register', [App\Http\Controllers\AuthenticationController::class, 'register']);
    Route::post('/login', [App\Http\Controllers\AuthenticationController::class, 'login']);
    Route::post('/logout', [App\Http\Controllers\AuthenticationController::class, 'logout']);
    Route::post('/password-reset', [App\Http\Controllers\AuthenticationController::class, 'passwordForgot']);
    Route::post('/password-reset/{token}', [App\Http\Controllers\AuthenticationController::class, 'passwordReset']);
});