<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContractTemplateRequest;
use App\Http\Requests\UpdateContractTemplateRequest;
use App\Models\ContractTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContractTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Template/Contract/List', [
            'filters' => request()->all('search'),
            'contractTemplates' => ContractTemplate::query()
                ->filterContractTemplate($request->only('search'))
                ->latest()
                ->paginate()
                ->withQueryString()
                ->through(fn ($contractTemplate) => [
                    'id' => $contractTemplate->id,
                    'name' => $contractTemplate->name,
                    'service_count' => $contractTemplate->service_count,
                    'created_at' => $contractTemplate->created_at->diffForHumans(),
                ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContractTemplateRequest $request)
    {
        ContractTemplate::create($request->validated());

        return redirect()->back()->with('success', 'Contract template created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ContractTemplate $contractTemplate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContractTemplate $contractTemplate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContractTemplateRequest $request, ContractTemplate $contractTemplate)
    {
        $contractTemplate->update($request->validated());

        return redirect()->back()->with('success', 'Contract template updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContractTemplate $contractTemplate)
    {
        //
    }
}
