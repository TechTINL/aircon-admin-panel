<?php

namespace App\Http\Controllers;

use App\Models\GstAmount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GstAmountController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(GstAmount $gst)
    {
        return Inertia::render('ManageGST', [
            'gst' => $gst,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GstAmount $gst)
    {
        $gst->update([
            'value' => $request->value,
        ]);

        return redirect()
            ->route('gst.show', $gst->id)
            ->with('success','GST Amount updated successfully.');
    }
}
