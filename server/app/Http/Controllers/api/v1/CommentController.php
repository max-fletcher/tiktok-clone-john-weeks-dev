<?php

namespace App\Http\Controllers\api\v1;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id' => ['required'],
            'comment' => ['required'],
        ]);

        try {
            Comment::create([
                'post_id' => $validated['post_id'],
                'user_id' => auth()->user()->id,
                'text' => $validated['comment'],
            ]);

            return response()->json(['success' => 'OK']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(string $id)
    {
        try {
            $comment = Comment::find($id);
            $comment->delete();

            return response()->json(['success' => 'OK']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
