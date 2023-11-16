<?php

namespace App\Actions\Admin;

use App\Models\User;

class GetAdminAction
{
	public function execute()
	{
		return User::role('admin')->latest()->paginate(10);
	}
}
