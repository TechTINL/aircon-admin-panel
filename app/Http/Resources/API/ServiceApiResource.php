<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceApiResource extends JsonResource
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
            'client' => $this->client,
            'sub_client' => $this->subClient,
            'service_number' => $this->service_number,
            'contract_number' => $this->contract->contract_number,
            'name' => $this->name,
            'type' => $this->type,
            'technician_count' => $this->technician_count,
            'service_no_of_time' => $this->service_no_of_time,
            'service_date' => $this->service_date,
            'service_time' => $this->service_time,
            'service_at' => $this->service_at,
            'service_address' => $this->service_address,
            'status' => $this->status,
            'leaders' => $this->leaders->pluck('name'),
            'technicians' => $this->technicians->pluck('name'),
            'report_status' => $this->report_status,
            'technician_report' => $this->technician_report,
            'photos' => PhotoApiResource::collection($this->photos),
            'task_visitation_note' => $this->task_visitation_note,
            'client_signature' => $this->client_signature ? url($this->client_signature) : null,
            'tasks' => $this->tasks
        ];
    }
}
