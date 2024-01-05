<?php

namespace App\Actions;

use App\Models\Contract;
use Illuminate\Support\Carbon;

class UpdateContractAction
{
    public function execute($contract, $data): void
    {
        $contract->update($data);

        // Update Contract's Services from ServiceData
        if (empty($data['serviceData']) === false && count($data['serviceData']) > 0) {
            $currentNumberOfService = 1;
            $totalNumberOfService = count($data['serviceData']);
            foreach ($data['serviceData'] as $service) {
                $service['contract_id'] = $contract->id;
                $service['type'] = 'contract';
                $service['service_address'] = $data['service_address'];
                $service['billing_address'] = $data['billing_address'];
                $service['status'] = count($service['teamLeaderIds']) > 0 ? 'scheduled' : 'unassigned';
                $service['service_no_of_time'] = "{$currentNumberOfService} of {$totalNumberOfService}";
                $service['service_at'] = Carbon::parse(
                    Carbon::parse($service['service_date'])->format('Y-m-d') . ' ' . $service['service_time']);

                $existingService = $contract->services()->where('id', $service['id'])->first();

                (new SaveServiceAction())->update(
                    $existingService,
                    $service,
                    $service['teamLeaderIds'],
                    $service['technicianIds'],
                    $service['tasks']
                );
            }
        }
    }
}
