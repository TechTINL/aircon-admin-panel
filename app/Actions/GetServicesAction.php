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
        $query = Service::query();

        if ($date) {
            $query->whereDate('service_date', $date);
        }


            $query->whereHas('users', function ($query) {
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

    // Get All services of counts by current month
    public function getCountsByCurrentMonth()
    {
        return Service::whereMonth('service_date', now()->format('m'))->count();
    }

    // Get All services of counts by monthly according to type (contract or adhoc)
    // return as follows:
    // [
    //    ['Month', 'Contract', 'Hoc'],
    //    ['Oct 2023', 500, 2300],
    //    ['Nov 2023', 1300, 3000],
    //    ['Dec 2023', 1500, 2500],
    //  ];

    public function getCountsByMonthly()
    {
        $services = Service::selectRaw('MONTH(service_date) as month, type, count(*) as count')
            ->groupBy('month', 'type')
            ->get();

        // Temporary storage for counts
        $monthlyCounts = [];

        foreach ($services as $service) {
            // Initialize month in $monthlyCounts if not already set
            if (!isset($monthlyCounts[$service->month])) {
                $monthlyCounts[$service->month] = ['month' => $service->month, 'contract' => 0, 'adhoc' => 0];
            }

            // Increment the count based on the type
            if ($service->type === 'contract') {
                $monthlyCounts[$service->month]['contract'] += $service->count;
            } elseif ($service->type === 'adhoc') {
                $monthlyCounts[$service->month]['adhoc'] += $service->count;
            }
        }

        // Initialize the final data array with headers
        $data = [['Month', 'Contract', 'Hoc']];

        // Populate the final data array
        foreach ($monthlyCounts as $month => $counts) {
            $data[] = [$counts['month'], $counts['contract'], $counts['adhoc']];
        }

        return $data;
    }
}
