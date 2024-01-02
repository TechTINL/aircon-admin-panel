<?php

namespace App\Http\Controllers;

use App\Actions\Contract\GetContractAction;
use App\Actions\Contract\SaveContractAction;
use App\Actions\GetClientsAction;
use App\Actions\GetEmployeesAction;
use App\Actions\GetGstAction;
use App\Actions\Template\Contract\GetContractTemplatesAction;
use App\Actions\Template\GetServiceTemplatesAction;
use App\Actions\Template\GetTaskTemplatesAction;
use App\Helpers\BreadcrumbHelper;
use App\Http\Requests\StoreContractRequest;
use App\Http\Requests\UpdateContractRequest;
use App\Http\Resources\ContractResource;
use App\Models\Contract;
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
            'breadcrumb' => BreadcrumbHelper::contracts(),
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
        GetTaskTemplatesAction $getTaskTemplatesAction,
        GetGstAction $getGstAction,
        ): Response
    {
        return Inertia::render('Contract/CreateForm', [
            'contractTemplates' => $action->execute(),
            'clients' => $getClientsAction->getClientsWithSubClients(),
	        'leaders' => $employeesAction->leader(),
	        'technicians' => $employeesAction->get(),
	        'serviceTemplates' => $getServiceTemplatesAction->execute(),
	        'taskTemplates' => $getTaskTemplatesAction->execute(),
            'gst' => $getGstAction->execute(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContractRequest $request, SaveContractAction $action)
    {
        $action->execute(
            $request->validated(),
            $request->serviceData,
            $request->service_address,
            $request->billing_address,
            $request->client_id,
            $request->input('subClient_id')
        );

		return redirect()->route('contracts.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(
         Contract $contract,
         GetContractTemplatesAction $action,
         GetClientsAction $getClientsAction,
         GetEmployeesAction $employeesAction,
         GetServiceTemplatesAction $getServiceTemplatesAction,
         GetTaskTemplatesAction $getTaskTemplatesAction,
        GetGstAction $gstAction
    )
    {
        $contract->load(
            'client', 'subClient', 'services', 'services.tasks',
            'services.users', 'services.leaders', 'services.technicians');

        return Inertia::render('Contract/EditForm', [
            'contract' => $contract,
            'contractTemplates' => $action->execute(),
            'clients' => $getClientsAction->getClientsWithSubClients(),
            'leaders' => $employeesAction->leader(),
            'technicians' => $employeesAction->get(),
            'serviceTemplates' => $getServiceTemplatesAction->execute(),
            'taskTemplates' => $getTaskTemplatesAction->execute(),
            'gst' => $gstAction->execute(),
        ]);
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
