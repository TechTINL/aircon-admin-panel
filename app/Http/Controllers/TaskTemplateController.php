<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskTemplateRequest;
use App\Models\TaskTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Template/Task/List', [
            'taskTemplates' => TaskTemplate::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskTemplateRequest $request): RedirectResponse
    {
        TaskTemplate::create($request->validated());

        return redirect()->route('task-templates.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskTemplate $taskTemplate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TaskTemplate $taskTemplate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskTemplate $taskTemplate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskTemplate $taskTemplate)
    {
        //
    }
}
