<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PermissionsSeeder::class);

        $super_admin = User::factory()->create([
             'name' => 'Super Admin',
             'phone' => '959796874350',
        ]);
        $super_admin->assignRole('super-admin');

        $admin = User::factory()->create([
             'name' => 'Admin',
             'phone' => '959796874351',
        ]);
        $admin->assignRole('admin');

        $leader = User::factory()->create([
             'name' => 'Dummy Leader',
             'phone' => '959796874352',
        ]);
        $leader_role = Role::findByName('leader', 'api');
        $leader->assignRole($leader_role);

        $sub_contractor = User::factory()->create([
             'name' => 'Dummy Sub Contractor',
             'phone' => '959796874353',
        ]);
        $sub_contractor_role = Role::findByName('sub-contractor', 'api');
        $sub_contractor->assignRole($sub_contractor_role);

        $full_time_technician = User::factory()->create([
             'name' => 'Dummy Full Time Technician',
             'phone' => '959796874354',
        ]);
        $full_time_technician_role = Role::findByName('full-time-technician', 'api');
        $full_time_technician->assignRole($full_time_technician_role);

        $part_time_technician = User::factory()->create([
             'name' => 'Dummy Part Time Technician',
             'phone' => '959796874355',
        ]);
        $part_time_technician_role = Role::findByName('part-time-technician', 'api');
        $part_time_technician->assignRole($part_time_technician_role);
    }
}
