<?php

namespace App\Http\Controllers;

use App\Actions\CreateClientAction;
use App\Actions\GetClientsAction;
use App\Actions\GetSubClientAction;
use App\Helpers\BreadcrumbHelper;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetClientsAction $action): Response
    {
        return Inertia::render('Clients/List', [
            'clients' => ClientResource::collection($action->execute($request->input('search'))),
            'search' => $request->input('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request, CreateClientAction $action): RedirectResponse
    {
        // Create Client Action
        $action->execute($request);

        // Redirect to Clients List
        return back()->with('success', 'Client created.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        // Update Client
        $client->update($request->validated());

        // Redirect to Clients List
        return redirect()->route('clients.index');
    }

    /**
     * Display Client Profile
     */
    public function profile(Client $client, GetSubClientAction $getSubClientAction): Response
    {
        return Inertia::render('Clients/Detail/Profile', [
			'breadcrumb' => BreadcrumbHelper::clientProfile($client->id),
            'client' => [
                'id' => $client->id,
                'name' => $client->name,
                'type' => $client->type,
                'parent_id' => $client->parent_id,
                'address' => $client->addresses->where('is_primary', true)->first()->address ?? '',
            ],
			'subClients' => ClientResource::collection($getSubClientAction->execute($client->id)),
            'addresses' => $client->addresses()->orderBy('created_at', 'desc')->get(),
            'contacts' => $client->contacts()->orderBy('created_at', 'desc')->get(),
	        'generalNotes' => $client->generalNotes()->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Get Postal Code Address
     */
    public function getAddress($code): array
    {
        $postalCodeService = app()->make('App\Services\PostalCodeService');
        $address = $postalCodeService->getAddress($code);

        return [
            'status' =>  is_string($address) && $address !== '' ? 'success' : 'not-found',
            'address' => $address
        ];
    }

    /**
     * Get Clients
     */
    public function clientsList(): JsonResponse
    {
        return response()->json([
            'clients' => Client::all()
        ]);
    }

    /**
     * Get Sub Clients
     */
    public function subClients(Client $client): JsonResponse
    {
        return response()->json([
            'subClients' => ClientResource::collection($client->subClients()->get()),
        ]);
    }



}
