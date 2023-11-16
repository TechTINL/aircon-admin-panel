<?php

namespace App\Actions;

use App\Models\User;

class GetEmployeesAction
{
	public function execute()
	{
		return User::role([
			'leader',
			'sub-contractor',
			'full-time-technician',
			'part-time-technician'
		], 'api')->latest()->paginate(10);
	}
}
