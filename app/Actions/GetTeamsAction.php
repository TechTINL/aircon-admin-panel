<?php

namespace App\Actions;

use App\Models\User;

class GetTeamsAction
{
	public function execute()
	{
		// User::role('leader', 'api')
		return User::role('leader')
			->whereNotNull('team_id')
			->distinct('team_id')
			->select([
			'id', 'team_id', 'name'
			])
			->get();
	}
}
