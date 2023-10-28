<?php

namespace App\Actions;

use App\Models\Client;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetClientsAction
{
    /**
     * Get all clients with first contact
     */
    private function getClientsWithFirstContact(): LengthAwarePaginator
    {
        return Client::with('firstContact')->paginate(10);
    }

    /**
     * Search the clients with first contact according to the search term
     */
    private function searchClientsWithFirstContact(string $searchTerm): LengthAwarePaginator
    {
        return Client::with('firstContact')
            ->where('name', 'like', "%{$searchTerm}%")
            ->orWhere('type', 'like', "%{$searchTerm}%")
            ->orWhere('address', 'like', "%{$searchTerm}%")
            ->orWhere('billing_address', 'like', "%{$searchTerm}%")
            ->orWhereHas('firstContact', function ($query) use ($searchTerm) {
                $query->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('phone', 'like', "%{$searchTerm}%")
                    ->orWhere('email', 'like', "%{$searchTerm}%");
            })
            ->paginate(10);
    }

    public function execute(?string $searchTerm): LengthAwarePaginator
    {
        if ($searchTerm) {
            return $this->searchClientsWithFirstContact($searchTerm);
        }

        return $this->getClientsWithFirstContact();
    }
}
