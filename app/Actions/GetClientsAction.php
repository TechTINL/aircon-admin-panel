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

    public function execute(): LengthAwarePaginator
    {
        return $this->getClientsWithFirstContact();
    }
}
