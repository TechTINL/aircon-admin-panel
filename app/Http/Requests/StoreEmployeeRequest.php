<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('dashboard.any');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
	        'name' => 'required',
	        'phone' => ['required', 'string', 'phone:MY,SG,MM', 'unique:users'],
	        'role' => 'required',
	        'team_id' => ['nullable', 'exists:users,id'],
	        'organization' => 'required',
            'vehicle' => 'nullable',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'phone.phone' => 'The phone number is invalid.',
        ];
    }
}
