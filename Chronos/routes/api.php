<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\AuthController;

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
    Route::post('/register',                [AuthController::class, 'register']);
    Route::post('/login',                   [AuthController::class, 'login']);
    Route::post('/logout',                  [AuthController::class, 'logout']);
    Route::post('/password-forgot',         [AuthController::class, 'passwordForgot']);
    Route::post('/password-reset/{token}',  [AuthController::class, 'passwordReset']);
});

Route::prefix('user')->group(function () {
    Route::get('/',                 [UserController::class, 'getAll']);
    Route::get('/{id}',             [UserController::class, 'getBy']);
    Route::get('/events/{id}',      [UserController::class, 'events']);
    Route::get('/calendars/{id}',   [UserController::class, 'calendars']);
    Route::patch('/{id}',           [UserController::class, 'update']);
    Route::delete('/{id}',          [UserController::class, 'delete']);
});

Route::prefix('event')->group(function () {
    Route::get('/{id}',         [EventController::class, 'getBy']);
    Route::get('/owner/{id}',   [EventController::class, 'owner']);
    Route::post('/',            [EventController::class, 'create']);
    Route::patch('/{id}',       [EventController::class, 'update']);
    Route::delete('/{id}',      [EventController::class, 'delete']);
});

Route::prefix('calendar')->group(function () {
    Route::get('/{id}',         [CalendarController::class, 'getBy']);
    Route::get('/owner/{id}',   [CalendarController::class, 'owner']);
    Route::get('/events/{id}',  [CalendarController::class, 'events']);
    Route::post('/',            [CalendarController::class, 'create']);
    Route::patch('/{id}',       [CalendarController::class, 'update']);
    Route::delete('/{id}',      [CalendarController::class, 'delete']);
});