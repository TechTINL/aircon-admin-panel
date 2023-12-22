<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

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
            'leaders_id' => 'required|array',
            'leaders_id.*' => 'required|exists:users,id',
            'technician_count' => 'required|integer',
            'employees_id' => 'required|array',
            'employees_id.*' => 'required|exists:users,id',
            'service_date' => 'required|date',
            'service_time' => 'required|string',
            'tasks' => 'required|array',
        ];
    }
}
