<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\ClientApiResource;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientApiController extends Controller
{
    public function show(Client $client): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Client fetched successfully',
            'data' => new ClientApiResource($client),
        ]);
    }
}
