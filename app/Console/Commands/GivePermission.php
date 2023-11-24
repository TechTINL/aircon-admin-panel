<?php

namespace App\Console\Commands;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Spatie\Permission\Models\Role;

class GivePermission extends Command implements PromptsForMissingInput
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'administration:give-permission {role} {permission}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Give a role a permission to';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $role_name = $this->argument('role');
        $role = Role::where('name', $role_name)->first();
        if (!$role) {
            $this->error("Could not find the role: $role_name");
            return;
        }

        $permission_name = $this->argument('permission');
        try {
            $role->givePermissionTo($permission_name);
        } catch (Exception $x) {
            $this->error($x->getMessage());
            return;
        }

        $this->info("The $role_name has been given permission to $permission_name");
    }
}
