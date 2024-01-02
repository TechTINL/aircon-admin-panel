<?php

namespace App\Http\Controllers;

use App\Actions\ActivityAction\GetActivitiesAction;
use App\Actions\GetServicesAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(GetActivitiesAction $getActivitiesAction, GetServicesAction $getServicesAction): Response
    {
        return Inertia::render('Dashboard', [
            'activities' => $getActivitiesAction->execute(),
            'services' => $getServicesAction->getCountsByStatus(),
            'total' => $getServicesAction->getCounts(),
            'totalMonthly' => $getServicesAction->getCountsByCurrentMonth(),
            'countsByMonthly' => $getServicesAction->getCountsByMonthly(),
        ]);
    }
}
