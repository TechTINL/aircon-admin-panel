<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceTemplateRequest;
use App\Models\ServiceTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Template/Service/List', [
            'serviceTemplates' => ServiceTemplate::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceTemplateRequest $request)
    {
        ServiceTemplate::create($request->validated());

        return redirect()->route('service-templates.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceTemplate $serviceTemplate)
    {
        $serviceTemplate->update($request->validated());
        return redirect()->route('service-templates.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceTemplate $serviceTemplate)
    {
        $serviceTemplate->delete();
        return redirect()->route('service-templates.index');
    }
}
