<?php

namespace App\Actions\Admin;

use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class GetEmployeeRolesAction
{
	public function execute()
	{
		// Role::where('guard_name', 'api')
		return Role::where('guard_name', 'api')
			->get()
			->pluck('name')
			->map(function ($role) {
				return [
					'label' => Str::headline($role),
					'value' => $role,
				];
			})
			->toArray();
	}
}
