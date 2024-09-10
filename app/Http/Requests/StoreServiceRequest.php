<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'sub_client_id' => 'nullable|exists:clients,id',
            'service_address' => 'required|string',
            'billing_address' => 'required|string',
            'name' => 'required|string',
            'leaders_id' => 'nullable|array',
            'leaders_id.*' => 'nullable|exists:users,id',
            'technician_count' => 'required|integer',
            'employees_id' => 'nullable|array',
            'employees_id.*' => 'nullable|exists:users,id',
            'service_date' => 'required|date',
            'service_time' => 'required|string',
            'tasks' => 'required|array',
            'tasks.*.name' => 'required|string',
            'status' => ['required', Rule::in([
                'unassigned',
                'requires-follow-up',
                'on-hold',
                'completed',
                'scheduled',
                'follow-up-completed',
                'scheduled']
            )],
            'task_visitation_note' => 'nullable|string',
        ];
    }
}
