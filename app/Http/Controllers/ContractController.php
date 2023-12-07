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
        Contract::create($request->validated());

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
