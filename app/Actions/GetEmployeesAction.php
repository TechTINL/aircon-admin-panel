<?php

namespace App\Actions;

use App\Http\Resources\ServiceResource;
use App\Models\User;

class GetEmployeesAction
{
	public function get()
	{
		return User::role([
			'sub-contractor',
			'full-time-technician',
			'part-time-technician'
		], 'api')->latest()->get();
	}

	public function leader()
	{
		return User::role('leader', 'api')->latest()->get();
	}

    // Get all employees with services details for job table, for a given date
    public function getWithServices($date)
    {
        if (!$date) {
            return [];
        }

        $users = User::role([
            'leader',
            'sub-contractor',
            'full-time-technician',
            'part-time-technician'
        ], 'api')
            ->with(['services' => function ($query) use ($date) {
                $query->whereDate('service_date', $date);
            }])
            ->latest()
            ->get()->map(function ($user) {
                $user->services = ServiceResource::collection($user->services)->resolve();
                return $user;
            });

        return $users;
    }

	public function execute()
	{
		return User::role([
			'leader',
			'sub-contractor',
			'full-time-technician',
			'part-time-technician'
		], 'api')->latest()->paginate(10);
	}
}
