<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGeneralNoteRequest;
use App\Http\Requests\UpdateGeneralNoteRequest;
use App\Models\GeneralNote;

class GeneralNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGeneralNoteRequest $request)
    {
        GeneralNote::create([
			'note' => $request->note,
			'client_id' => $request->client_id,
			'created_by' => auth()->id(),
			'updated_by' => auth()->id(),
		]);

		return redirect()->back()->with('success', 'Note added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(GeneralNote $generalNote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeneralNote $generalNote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGeneralNoteRequest $request, GeneralNote $generalNote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeneralNote $generalNote)
    {
        $generalNote->delete();

		return redirect()->route('clients.profile', $generalNote->client_id)->with('success', 'Note deleted successfully.');
    }
}
