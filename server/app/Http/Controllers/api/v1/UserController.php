<?php

namespace App\Http\Controllers\api\v1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\FileService;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function loggedInUser()
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();
            return new UserResource($user);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(), 400]);
        }
    }

    public function updateUserImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'mimes:png,jpg,jpeg']
        ]);

        if($request->height === '' || $request->width === '' || $request->top === '' || $request->left === ''){
            return response()->json(['error' => 'THe dimensions are incomplete'], 400);
        }

        try {
            $user = (new FileService)->updateImage(auth()->user(), $request);
            $user->save();

            return response()->json(['success' => 'OK'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function getUser(string $id)
    {
        try {
            $user = User::findOrFail($id);

            return response()->json([
                'success' => 'OK',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function updateUser(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required',
            'bio' => 'nullable'
        ]);

        try {
            $user = User::findOrFail($id);

            $user->update($validated);

            return response()->json(['success' => 'OK'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
