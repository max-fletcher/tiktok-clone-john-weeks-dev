<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'video' => asset($this->video),
            'created_at' => $this->created_at->format('M D Y'),
            'comments' => CommentResource::collection($this->comments),
            'likes' => LikeResource::collection($this->likes),
            'user' => new PostUserResource($this->user),
        ];
    }
}
