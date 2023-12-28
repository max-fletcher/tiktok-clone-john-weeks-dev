<?php

namespace App\Http\Controllers\api\v1;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;

class ProfileController extends Controller
{
    public function show(string $id)
    {
        try {
            $posts = Post::where('user_id', $id)->orderBy('created_at', 'desc')->get();
            $user = User::where('id', $id)->get();

            return response()->json([
                'posts' => PostResource::collection($posts),
                'user' => new UserResource($user),
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
