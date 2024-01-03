<?php

namespace App\Actions;

use App\Models\Service;
use App\Models\User;
use App\Notifications\ServiceAssignedNotification;

class SaveServiceAction
{
    public function execute($data, $teamLeaderIds, $technicianIds, $tasks): Service
    {
        $service = Service::create($data);

        $this->assignLeaders($service, $teamLeaderIds);
        $this->assignTechnicians($service, $technicianIds);

        foreach ($tasks as $task) {
            $data = [
                'name' => $task['name'],
                'duration_hours' => $task['hours'],
                'duration_minutes' => $task['minutes'],
                'cost' => $task['cost'],
                'service_id' => $service->id
            ];

            $service->tasks()->create($data);
        }

        return $service;
    }

    public function assignLeaders($service, $leaderIds): void
    {
        $service->leaders()->sync($leaderIds);

        foreach ($leaderIds as $leaderId) {
            User::find($leaderId)->notify(new ServiceAssignedNotification($service));
        }
    }

    public function assignTechnicians($service, $technicianIds): void
    {
        $service->technicians()->sync($technicianIds);

        foreach ($technicianIds as $technicianId) {
            User::find($technicianId)->notify(new ServiceAssignedNotification($service));
        }
    }
}
