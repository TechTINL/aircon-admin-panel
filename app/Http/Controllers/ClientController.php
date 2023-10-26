<?php

namespace App\Http\Controllers;

use App\Actions\CreateClientAction;
use App\Actions\GetClientsAction;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(GetClientsAction $action): Response
    {
        return Inertia::render('Clients/List', [
            'clients' => ClientResource::collection($action->execute()),
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
        return redirect()->route('clients.index');
    }

    /**
     * Display Client Profile
     */
    public function profile(Client $client): Response
    {
        return Inertia::render('Clients/Profile', [
            'client' => new ClientResource($client),
            'contacts' => $client->contacts,
        ]);
    }

}
