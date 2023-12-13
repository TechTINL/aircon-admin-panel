<?php

namespace App\Actions;

use App\Models\User;

class GetEmployeesAction
{
	public function get()
	{
		return User::role([
			'sub-contractor',
			'full-time-technician',
			'part-time-technician'
		], 'api')->latest()->get();
	}

	public function leader()
	{
		return User::role('leader', 'api')->latest()->get();
	}

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
