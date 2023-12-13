<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class EmployeeResource extends JsonResource
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
	        'phone' => $this->phone,
	        'role' => $this->getRoleNames()->map(function ($role) {
		        return Str::headline($role);
	        })->implode(', '),
	        'team' => $this->team()->first()->name ?? 'No team',
	        'organization' => $this->organization,
	        'joined' => $this->created_at->diffForHumans(),
	        'lastOnline' => $this->last_online_at != null
		        ? Carbon::create($this->last_online_at)->diffForHumans() : 'Never',
        ];
    }
}
