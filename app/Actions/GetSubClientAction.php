<?php

namespace App\Actions;

use App\Models\Client;

class GetSubClientAction
{
	public function execute($client_id)
	{
		return Client::where('parent_id', $client_id)->paginate();
	}
}
