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

Route::prefix('auth')->group(function () {
    Route::post('/register', [App\Http\Controllers\AuthenticationController::class, 'register']);
    Route::post('/login', [App\Http\Controllers\AuthenticationController::class, 'login']);
    Route::post('/logout', [App\Http\Controllers\AuthenticationController::class, 'logout']);
    // Route::post('/password-reset', [App\Http\Controllers\AuthenticationController::class, 'passwordForgot']);
    // Route::post('/password-reset/{token}', [App\Http\Controllers\AuthenticationController::class, 'passwordReset']);
});

Route::prefix('user')->group(function () {
    Route::get('/', [App\Http\Controllers\UserController::class, 'getAll']);
    Route::get('/{id}', [App\Http\Controllers\UserController::class, 'getBy']);
    Route::patch('/update/{id}', [App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/delete/{id}', [App\Http\Controllers\UserController::class, 'delete']);
});