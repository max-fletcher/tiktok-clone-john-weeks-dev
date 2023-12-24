<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\api\v1\UserController;

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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logged-in-user', [UserController::class, 'loggedInUser']);
});


Route::middleware(['guest'])->post('/login', function (LoginRequest $request) {
    $request->authenticate();

    $auth_token = $request->user()->createToken('Auth Token')->plainTextToken;

    return response()->json([
        'status' => 'success',
        'auth_token' => $auth_token,
    ])
    ->withCookie('auth_token', $auth_token);
});