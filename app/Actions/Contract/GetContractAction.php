<?php

namespace App\Actions\Contract;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Collection;

class GetContractAction
{
	public function execute()
	{
		return Contract::latest()->paginate(10);
	}
}
