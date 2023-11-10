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

        // get contact
        $contact = $this->contactData($request);

        // create contact
        $client_id->contacts()->create($contact);
    }

}
