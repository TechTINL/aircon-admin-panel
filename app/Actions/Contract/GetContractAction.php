<?php

namespace App\Actions\Contract;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Collection;

class GetContractAction
{
	public function execute($client = null)
    {
        if ($client) {
            if ($client->isSubClient()) {
                return Contract::where('subClient_id', $client->id)->latest()->paginate(10);
            }
            return Contract::where('client_id', $client->id)->latest()->paginate(10);
        }

        return Contract::latest()->paginate(10);
    }
}
