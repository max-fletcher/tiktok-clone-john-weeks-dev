<?php

namespace App\Http\Controllers\api\v1;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Services\FileService;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'video' => ['required', 'file', 'mimes:mp4'],
            'text' => ['required']
        ]);

        try {
            $post = new Post();
            $post = (new FileService)->addVideo($post, $request);

            $post->user_id = auth()->user()->id;
            $post->text = $request->text;
            $post->save();

            return response()->json(['success' => 'OK'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function show(string $id)
    {
        try {
            $post = Post::find($id);
            $posts = Post::where('user_id', $post->user_id)->get();

            // GET IDS OF POSTS WITH SAME user_id AS $post. THIS WILL ALLOW ALL POSTS MADE BY THE USER WHO MADE $post TO BE SHOWN.
            $ids = $posts->map(function($post){
                return $post->id;
            });

            return response()->json([
                'post' => new PostResource($post),
                'ids' => $ids
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(string $id)
    {
        try {
            $post = Post::findOrFail($id);
            if(!is_null($post->video) && file_exists(public_path() . $post->video)){
                unlink(asset($post->video));
            }
            $post->delete();

            return response()->json(['success' => 'OK'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
