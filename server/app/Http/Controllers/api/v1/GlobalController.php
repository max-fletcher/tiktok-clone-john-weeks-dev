<?php

namespace App\Http\Controllers\api\v1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class GlobalController extends Controller
{
    public function getRandomUser()
    {
        try {
            $suggested = User::inRandomOrder()->limit(5)->get();
            $following = User::inRandomOrder()->limit(10)->get();

            return response()->json([
                'suggested' => UserResource::collection($suggested),
                'following' => UserResource::collection($following),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
