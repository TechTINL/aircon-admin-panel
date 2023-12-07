<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskTemplateRequest;
use App\Http\Requests\UpdateTaskTemplateRequest;
use App\Models\TaskTemplate;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TaskTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Template/Task/List', [
            'taskTemplates' => TaskTemplate::latest()->get(),
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
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskTemplateRequest $request, TaskTemplate $taskTemplate)
    {
        $taskTemplate->update($request->validated());
        return redirect()->route('task-templates.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskTemplate $taskTemplate): RedirectResponse
    {
        $taskTemplate->delete();
        return redirect()->route('task-templates.index');
    }
}
