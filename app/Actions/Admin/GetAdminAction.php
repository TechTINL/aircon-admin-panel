<?php

namespace App\Actions\Admin;

use App\Models\User;

class GetAdminAction
{
	public function execute($deleted = false)
	{
        if ($deleted) {
            return User::role(['admin', 'super-admin'])->onlyTrashed()->latest()->paginate(10);
        }
        
		return User::role(['admin', 'super-admin'])->latest()->paginate(10);
	}
}
