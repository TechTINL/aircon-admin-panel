<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContractRequest extends FormRequest
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
	        'service_count' => 'required|integer',
            'unassigned_service_count' => 'required|integer',
            'assigned_service_count' => 'required|integer',
            'billing_address' => 'required|string',
			'start_date' => 'required|date',
			'end_date' => 'required|date',
			'amount' => 'required|string',
	        'client_id' => 'required|exists:clients,id',
	        'subClient_id' => 'required|exists:clients,id',
        ];
    }
}
