<?php

namespace App\Http\Controllers\api\v1;

use App\Models\User;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
