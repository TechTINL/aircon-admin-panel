<?php

namespace App\Notifications;

use App\Models\Service;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceAssignedNotification extends Notification
{
    use Queueable;

    private Service $service;

    /**
     * Create a new notification instance.
     */
    public function __construct(Service $service)
    {
        $service->load('client', 'subClient', 'leaders', 'technicians', 'tasks');
        $this->service = $service;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Assigned to Job',
            'body' => 'You have been assigned to a job',
            'data' => $this->service->toArray(),
            'created_at' => now(),
            'updated_at' => now()
        ];
    }
}
