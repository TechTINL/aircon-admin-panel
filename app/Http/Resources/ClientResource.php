<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Propaganistas\LaravelPhone\PhoneNumber;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'clientId' => [
                'id' => $this->id,
                'name' => $this->name,
            ],
            'contactPerson' => [
                'name' => $this->firstContact->name ?? '',
                'type' => $this->type,
            ],
            'contact' => $this->firstContact->phone ?? '',
            'address_id' => $this->addresses->where('is_primary', true)->first()->id ?? '',
            'address' => $this->addresses->where('is_primary', true)->first()->address ?? '',
            'subClients' => $this->subClients,
        ];
    }
}
