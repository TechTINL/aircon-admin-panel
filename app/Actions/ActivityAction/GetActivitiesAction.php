<?php

namespace App\Actions\ActivityAction;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;

class GetActivitiesAction
{
    public function execute(): LengthAwarePaginator
    {
        $activities = Activity::with('causer')
            ->latest()
            ->paginate(10);

        $activityDescription = new ActivityDescription();

        foreach ($activities as $activity) {
            $activity->description = $activityDescription->getDescription($activity);
        }

        return $activities;
    }
}
