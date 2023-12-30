<?php

namespace App\Actions;

use App\Models\Service;

class GetServicesAction
{
    public function execute($client = null)
    {
        if ($client) {
            if ($client->isSubClient()) {
                return Service::where('subClient_id', $client->id)->latest()->paginate(10);
            }
            return Service::where('client_id', $client->id)->latest()->paginate(10);
        }
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

    // Get All services of counts by status for a given date
    public function getCountsByStatus()
    {
        return Service::whereDate('service_date', now()->format('Y-m-d'))
            ->selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->get();
    }

    // Get All services of counts for today
    public function getCounts()
    {
        return Service::whereDate('service_date', now()->format('Y-m-d'))->count();
    }
}
