<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Models\Address;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AddressController extends Controller
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
    public function store(StoreAddressRequest $request): RedirectResponse
    {
        Address::create($request->validated());
        return back()->with('success', 'Address created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddressRequest $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        $address->delete();
		return back()->with('success', 'Address deleted.');
    }

    // Search if address is used
    public function isUsed(Request $request)
    {
        $address = Address::where('address', $request->address)->first();
        if ($address) {
            return response()->json([
                'used' => true,
                'client_name' => $address->client->name ?? '',
            ]);
        }
        return response()->json(['used' => false]);
    }
}
