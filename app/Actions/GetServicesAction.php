<?php

namespace App\Actions;

use App\Models\Service;

class GetServicesAction
{
    public function execute()
    {
        return Service::latest()->paginate(10);
    }

    // GET /api/services
    public function get($date = null)
    {
        $date = $date ?? now()->toDateString();

        return Service::whereDate('service_date', $date)
            ->whereHas('users', function ($query) {
                $query->where('id', auth()->user()->id);
            })
            ->get();
    }
}
