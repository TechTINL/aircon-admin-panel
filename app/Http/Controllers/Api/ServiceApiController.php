<?php

namespace App\Http\Controllers\Api;

use App\Actions\GetServicesAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\API\ServiceApiResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceApiController extends Controller
{
    public function index(Request $request, GetServicesAction $action): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Services fetched successfully',
            'data' => ServiceApiResource::collection($action->get($request->date)),
        ]);
    }
}
