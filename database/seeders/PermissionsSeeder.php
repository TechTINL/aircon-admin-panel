<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'dashboard.any']);
        Permission::create(['name' => 'admin.any']);

		Role::create(['name' => 'super-admin']);
        Role::create(['name' => 'admin']);

        Role::create([
            'name' => 'leader',
            'guard_name' => 'api'
        ]);

        Role::create([
            'name' => 'sub-contractor',
            'guard_name' => 'api'
        ]);

        Role::create([
            'name' => 'full-time-technician',
            'guard_name' => 'api'
        ]);

        Role::create([
            'name' => 'part-time-technician',
            'guard_name' => 'api'
        ]);

        Role::findByName('super-admin')->givePermissionTo(Permission::all());
        Role::findByName('admin')->givePermissionTo(Permission::findByName('dashboard.any'));
    }
}
