<?php

namespace App\Actions;

use App\Models\Client;

class GetClientDetailAction
{
    public function execute(Client $client)
    {
        $client->load('contacts');

        return $client;
    }
}
