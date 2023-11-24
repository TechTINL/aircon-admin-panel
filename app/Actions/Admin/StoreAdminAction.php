<?php

namespace App\Actions\Admin;

use App\Models\User;

class StoreAdminAction
{
    public function execute($data): void
    {
        $data['password'] = bcrypt(config('constants.admin.password'));
        $user = User::create($data);
		$user->assignRole($data['role']);
    }
}
