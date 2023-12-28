<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\PostController;
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



    Route::post('/update-user-image/{id}', [UserController::class, 'updateUserImage']);
    Route::get('/get-user/{id}', [UserController::class, 'getUser']);
    Route::post('/update-user/{id}', [UserController::class, 'updateUser']);

    Route::post('post/store', [PostController::class, 'store']);
    Route::get('post/show/{id}', [PostController::class, 'show']);
    Route::post('post/destroy/{id}', [PostController::class, 'destroy']);
});