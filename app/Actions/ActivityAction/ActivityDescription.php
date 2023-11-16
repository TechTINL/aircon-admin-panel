<?php

namespace App\Actions\ActivityAction;

use Spatie\Activitylog\Models\Activity;

class ActivityDescription
{
    /**
     * Returns the description for an activity.
     *
     * @param Activity $activity
     * @return string
     */
    public function getDescription(Activity $activity): string
    {
        return match ($activity->subject_type) {
            'App\\Models\\Client' => $activity->subject['parent_id'] !== null
                ? $this->getSubClientActivityDescription($activity)
                : $this->getClientActivityDescription($activity),
            'App\\Models\\Address' => $this->getAddressActivityDescription($activity),
            'App\\Models\\GeneralNote' => $this->getGeneralNoteActivityDescription($activity),
	        'App\\Models\\Contact' => $this->getContactActivityDescription($activity),
            default => $this->getDefaultDescription($activity),
        };
    }


    private function getClientActivityDescription(Activity $activity): string
    {
        $causerName = optional($activity->causer)->name ?? 'Unknown';
        $clientName = $activity->properties['attributes']['name'] ?? 'Unknown Client';

        return match ($activity->description) {
            'created' => "{$causerName} created a new client: {$clientName}",
            'updated' => "{$causerName} updated the client: {$clientName}",
            'deleted' => "{$causerName} deleted the client: {$clientName}",
            default => "Activity by {$causerName}",
        };
    }

    private function getSubClientActivityDescription(Activity $activity): string
    {
        $causerName = optional($activity->causer)->name ?? 'Unknown';
        $clientName = $activity->properties['attributes']['name'] ?? 'Unknown Client';

        return match ($activity->description) {
            'created' => "{$causerName} created a new sub-client: {$clientName}",
            'updated' => "{$causerName} updated the sub-client: {$clientName}",
            'deleted' => "{$causerName} deleted the sub-client: {$clientName}",
            default => "Activity by {$causerName}",
        };
    }

    private function getAddressActivityDescription(Activity $activity): string
    {
        $causerName = optional($activity->causer)->name ?? 'Unknown';
        $clientName = $activity->properties['attributes']['address'] ?? 'Unknown Address';

        return match ($activity->description) {
            'created' => "{$causerName} created a new address: {$clientName}",
            'updated' => "{$causerName} updated the address: {$clientName}",
            'deleted' => "{$causerName} deleted the address: {$clientName}",
            default => "Activity by {$causerName}",
        };
    }

    private function getGeneralNoteActivityDescription(Activity $activity): string
    {
        $causerName = optional($activity->causer)->name ?? 'Unknown';
        $clientName = $activity->properties['attributes']['note'] ?? 'Unknown Note';

        return match ($activity->description) {
            'created' => "{$causerName} created a new note: {$clientName}",
            'updated' => "{$causerName} updated the note: {$clientName}",
            'deleted' => "{$causerName} deleted the note: {$clientName}",
            default => "Activity by {$causerName}",
        };
    }

	private function getContactActivityDescription(Activity $activity): string
	{
		$causerName = optional($activity->causer)->name ?? 'Unknown';
		$clientName = $activity->properties['attributes']['name'] ?? 'Unknown Contact';

		return match ($activity->description) {
			'created' => "{$causerName} created a new contact: {$clientName}",
			'updated' => "{$causerName} updated the contact: {$clientName}",
			'deleted' => "{$causerName} deleted the contact: {$clientName}",
			default => "Activity by {$causerName}",
		};
	}

    private function getDefaultDescription(Activity $activity): string
    {
        return $activity->description;
    }
}
