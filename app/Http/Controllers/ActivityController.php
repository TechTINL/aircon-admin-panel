<?php

namespace App\Http\Controllers;

use App\Actions\ActivityAction\GetActivitiesAction;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function index(GetActivitiesAction $getActivitiesAction): Response
    {
        return Inertia::render('RecentActivityPage', [
            'activities' => $getActivitiesAction->execute(),
        ]);
    }
}
