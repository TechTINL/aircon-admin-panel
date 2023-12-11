<?php

namespace App\Http\Controllers;

use App\Actions\Contract\GetContractAction;
use App\Actions\GetClientsAction;
use App\Actions\GetEmployeesAction;
use App\Actions\Template\Contract\GetContractTemplatesAction;
use App\Actions\Template\GetServiceTemplatesAction;
use App\Actions\Template\GetTaskTemplatesAction;
use App\Http\Requests\StoreContractRequest;
use App\Http\Requests\UpdateContractRequest;
use App\Http\Resources\ContractResource;
use App\Models\Contract;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetContractAction $action): Response
    {
        return Inertia::render('Contract/List', [
			'contracts' => ContractResource::collection($action->execute()),
		]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(
		GetContractTemplatesAction $action,
		GetClientsAction $getClientsAction,
		GetEmployeesAction $employeesAction,
		GetServiceTemplatesAction $getServiceTemplatesAction,
        GetTaskTemplatesAction $getTaskTemplatesAction): Response
    {
        return Inertia::render('Contract/Create', [
            'contractTemplates' => $action->execute(),
            'clients' => $getClientsAction->getClients(),
	        'leaders' => $employeesAction->leader(),
	        'employees' => $employeesAction->get(),
	        'serviceTemplates' => $getServiceTemplatesAction->execute(),
	        'taskTemplates' => $getTaskTemplatesAction->execute(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContractRequest $request)
    {
        $contract = Contract::create($request->validated());

        $services = $request->serviceData;
        $totalServices = count($services);
        $currentIndex = 1;

        foreach ($services as $service) {
            $service['contract_id'] = $contract->id;
            $service['type'] = 'contract';
            $service['service_address'] = $request->service_address;
            $service['billing_address'] = $request->billing_address;
            $service['status'] = 'pending';
            $service['technician_count'] = $service['technicianCount'];
            $service['service_no_of_time'] = "{$currentIndex} of {$totalServices}";
            $service['service_date'] = Carbon::parse($service['date'])->format('Y-m-d');
            $service['service_time'] = '10:00 AM';
            $service['service_at'] = Carbon::parse($service['service_date'] . ' ' . $service['service_time']);
            $service['client_id'] = $request->client_id;
            $service['subClient_id'] = $request->input('subClient_id');

            $s = Service::create($service);

            $s->users()->attach($service['teamLeaderIds'], [
                'assigned_as' => 'team_leader'
            ]);
            $s->users()->attach($service['technicianIds'], [
                'assigned_as' => 'technician'
            ]);

            foreach ($service['tasks'] as $task) {
                $t = [
                    'name' => $task['name'],
                    'duration_hours' => $task['durationHr'],
                    'duration_minutes' => $task['durationMin'],
                    'cost' => $task['cost'],
                    'service_id' => $s->id
                ];

                $s->tasks()->create($t);
            }

            $currentIndex++;
        }

		return redirect()->route('contracts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contract $contract)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contract $contract)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContractRequest $request, Contract $contract)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contract $contract)
    {
        //
    }
}
