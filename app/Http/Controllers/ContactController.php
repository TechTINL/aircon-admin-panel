<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Store Contact of client
    public function store(StoreContactRequest $request)
    {
        // Store Contact
        $request->client()->contacts()->create($request->validated());

        // Redirect to Client Profile
        return redirect()->route('clients.profile', $request->client());

    }
}
