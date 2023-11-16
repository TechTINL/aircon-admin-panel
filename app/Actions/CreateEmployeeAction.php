<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class CreateEmployeeAction
{
	private function prepareData($data): array
	{
		return [
			'name' => $data['name'],
			'phone' => $data['phone'],
			'password' => bcrypt(config('constants.admin.password')),
			'team_id' => $data['team_id'],
			'organization' => $data['organization'],
		];
	}
	public function execute($data): void
	{
		// Set the default guard to 'api' before creating the user
		 Auth::shouldUse('api');

		$user = User::create($this->prepareData($data));
		$user->assignRole($data['role']);

		if (Role::where('name', $data['role'])->where('guard_name', 'api')->exists()) {
			$role = Role::findByName($data['role'], 'api');
			$user->assignRole($role);
		}

		Auth::shouldUse('web');
	}
}
