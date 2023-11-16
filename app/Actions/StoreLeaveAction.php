<?php

namespace App\Actions;

use App\Models\Leave;
use Carbon\Carbon;

class StoreLeaveAction
{
	private function prepareData($data): array
	{
		return [
			'start_date' => Carbon::create($data['leave_date'][0]),
			'end_date' => Carbon::create($data['leave_date'][1]),
			'reason' => $data['reason'],
			'user_id' => $data['user_id'],
		];
	}

	public function execute($data)
	{
		$data = $this->prepareData($data);
		Leave::create($data);
	}
}
