<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientApiResource extends JsonResource
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
            'address' => $this->addresses()->where('is_primary', true)->first()->address,
            'contact' => $this->contacts,
            'note' => $this->generalNotes,
            'contract' => $this->contracts->load('services'),
            'adhoc' => []
        ];
    }
}
