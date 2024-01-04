<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractResource extends JsonResource
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
            'title' => $this->title,
            'contract_number' => $this->contract_number,
            'service_count' => $this->service_count,
            'unassigned_service_count' => $this->unassigned_service_count,
            'assigned_service_count' => $this->assigned_service_count,
            'billing_address' => $this->billing_address,
            'start_date' => Carbon::create($this->start_date)->format('Y-m-d'),
            'end_date' => Carbon::create($this->end_date)->format('Y-m-d'),
            'amount' => $this->amount,
            'client' => $this->client,
            'subClient' => $this->subClient,
            'created_at' => Carbon::create($this->created_at)->format('Y-m-d'),
            'updated_at' => $this->updated_at
        ];
    }
}
