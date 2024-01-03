<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\v1\HomeController;
use App\Http\Controllers\api\v1\LikeController;
use App\Http\Controllers\api\v1\PostController;
use App\Http\Controllers\api\v1\UserController;
use App\Http\Controllers\api\v1\GlobalController;
use App\Http\Controllers\api\v1\CommentController;
use App\Http\Controllers\api\v1\ProfileController;

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
Route::get('home', [HomeController::class, 'index']);
Route::get('/get-random-users', [GlobalController::class, 'getRandomUsers']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logged-in-user', [UserController::class, 'loggedInUser']);
    Route::post('/update-user-image', [UserController::class, 'updateUserImage']);
    Route::get('/get-user/{id}', [UserController::class, 'getUser']);
    Route::post('/update-user/{id}', [UserController::class, 'updateUser']);

    Route::post('posts', [PostController::class, 'store']);
    Route::get('posts/{id}', [PostController::class, 'show']);
    Route::post('posts/{id}', [PostController::class, 'destroy']);

    Route::get('profiles/{id}', [ProfileController::class, 'show']);

    Route::post('comments', [CommentController::class, 'store']);
    Route::post('comments/{id}', [CommentController::class, 'destroy']);

    Route::post('likes', [LikeController::class, 'store']);
    Route::post('likes/{id}', [LikeController::class, 'destroy']);
});