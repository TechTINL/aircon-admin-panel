<?php

namespace App\Actions;

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

        return User::role([
            'leader',
            'sub-contractor',
            'full-time-technician',
            'part-time-technician'
        ], 'api')
            ->with(['services' => function ($query) use ($date) {
                $query->whereDate('service_at', $date);
            }])
            ->latest()
            ->get();
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
