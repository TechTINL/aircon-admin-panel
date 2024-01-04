<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateContractRequest extends FormRequest
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
            'title' => 'required|string',
            'billing_address' => 'nullable|string',
            'service_address' => 'nullable|string',
            'service_count' => 'nullable|integer',
            'unassigned_service_count' => 'nullable|integer',
            'assigned_service_count' => 'nullable|integer',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'amount' => 'nullable|string',
            'client_id' => 'nullable|exists:clients,id',
            'subClient_id' => 'nullable|exists:clients,id',
            'serviceData' => 'array',
        ];
    }
}
