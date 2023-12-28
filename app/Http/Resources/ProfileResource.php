<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
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
            'name' => $this->name,
            'profile_photo_url' => "https://ui-avatars.com/api/?name=" . urlencode($this->name) . "&color=7F9CF5&background=EBF4FF",
            'phone_number' => $this->phone,
            'role' => $this->getRoleNames()->first()->name ?? 'N/A',
            'team' => $this->team()->first()?->name,
            'joined_at' => $this->created_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
