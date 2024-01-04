<?php

namespace App\Actions;

use App\Models\Service;
use App\Models\Task;
use App\Models\User;
use App\Notifications\ServiceAssignedNotification;
use Illuminate\Support\Facades\Log;

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

    function update($service, $data, $teamLeaderIds, $technicianIds, $tasks): void
    {
        $service->update($data);

        $this->assignLeaders($service, $teamLeaderIds);
        $this->assignTechnicians($service, $technicianIds);

        foreach ($tasks as $task) {
            $data = [
                'name' => $task['name'],
                'duration_hours' => $task['duration_hours'] ?? $task['hours'],
                'duration_minutes' => $task['duration_minutes'] ?? $task['minutes'],
                'cost' => $task['cost'],
                'service_id' => $service->id
            ];

            if (isset($task['id']) && $task['id']) {
                Task::find($task['id'])->update($data);
            } else {
                $service->tasks()->create($data);
            }
        }
    }

    public function assignLeaders($service, $leaderIds): void
    {
        foreach ($leaderIds as $leaderId) {
            $service->users()->sync([$leaderId => ['assigned_as' => 'team_leader']]);
        }

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
