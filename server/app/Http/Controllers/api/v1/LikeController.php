<?php

namespace App\Http\Controllers\api\v1;

use App\Models\Like;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LikeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id' => ['required']
        ]);

        try {
            $saved = Like::create([
                'user_id' => auth()->user()->id,
                'post_id' => $validated['post_id']
            ]);

            return response()->json([
                'like' => [
                    'id' => $saved->id,
                    'post_id' => $saved->post_id,
                    'user_id' => auth()->user()->id,
                ],
                'success' => 'OK'
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(string $id)
    {
        try {
            $like = Like::find($id);
            if($like)
                $like->delete();

            return response()->json([
                'like' => [
                    'id' => $like->id,
                    'post_id' => $like->post_id,
                    'user_id' => $like->user_id,
                ],
                'success' => 'OK'
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
