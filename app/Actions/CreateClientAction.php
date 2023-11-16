<?php

namespace App\Actions;

use App\Http\Requests\StoreClientRequest;
use App\Models\Client;

class CreateClientAction
{
    // Extract Client Data from request
    private function clientData(StoreClientRequest $request): array
    {
        return [
            'name' => $request->name,
            'type' => $request->type,
            'postal_code' => $request->postal_code,
            'address' => $request->address,
            'billing_address' => $request->billing_address,
	        'parent_id' => $request->input('parent_id'),
        ];
    }

	// Get Billing Address Data from request
	private function billingAddressData(StoreClientRequest $request): array
	{
		return [
			'name' => $request->name,
			'phone' => $request->contact_number,
			'postal_code' => $request->postal_code,
			'address' => $request->address,
		];
	}

    // Get Contact Data from request
    private function contactData(StoreClientRequest $request): array
    {
        return [
            'name' => $request->contact_name,
            'phone' => $request->contact_number,
            'email' => $request->email,
            'is_primary' => true,
        ];
    }

    public function execute(StoreClientRequest $request): void
    {
        // create client
        $client_id = Client::create($this->clientData($request));

		if ($request->billing_address != null) {
			// Create Billing Address
			$client_id->addresses()->create($this->billingAddressData($request));
		}

        // get contact
        $contact = $this->contactData($request);

        // create contact
        $client_id->contacts()->create($contact);
    }

}
