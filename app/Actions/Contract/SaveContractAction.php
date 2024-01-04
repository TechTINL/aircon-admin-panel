<?php

namespace App\Actions\Contract;

use App\Actions\SaveServiceAction;
use App\Models\Contract;
use Illuminate\Support\Carbon;

class SaveContractAction
{
    public function execute(
        $data,
        array $services,
        $service_address,
        $billing_address,
        $client_id,
        $subClient_id = null): Contract
    {
        $contract = Contract::create($data);

        if (empty($services) === false && count($services) > 0) {
            $currentNumberOfService = 1;
            $totalNumberOfService = count($services);
            foreach ($services as $service) {
                $service['contract_id'] = $contract->id;
                $service['type'] = 'contract';
                $service['service_address'] = $service_address;
                $service['billing_address'] = $billing_address;
                $service['status'] = count($service['teamLeaderIds']) > 0 ? 'scheduled' : 'unassigned';
                $service['service_no_of_time'] = "{$currentNumberOfService} of {$totalNumberOfService}";
                $service['service_time'] = $service['service_time'] ?? $service['service_time']['value'] ;
                $service['service_at'] = Carbon::parse(
                    Carbon::parse($service['service_date'])->format('Y-m-d') . ' ' . $service['service_time']);
                $service['client_id'] = $client_id;
                $service['subClient_id'] = $subClient_id;

                (new SaveServiceAction())
                    ->execute($service, $service['teamLeaderIds'], $service['technicianIds'], $service['tasks']);
            }
        }

        return $contract;
    }
}
