<?php

namespace App\Console\Commands;

use App\Models\User;
use Exception;
use Illuminate\Console\Command;

class AssignRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'administration:assign-role {phone} {role*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign a user to a role';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $phone = $this->argument('phone');
        $user = User::where('phone', $phone)->first();
        if (!$user) {
            $this->error("Could not find the user associated with $phone");
            return;
        }

        $role_names = $this->argument('role');

        try {
            $user->assignRole($role_names);
        } catch (Exception $x) {
            $this->error($x->getMessage());
            return;
        }

        $this->info("The user associated with $phone has been assigned to " . implode(", ", $role_names) . ".");
    }
}
