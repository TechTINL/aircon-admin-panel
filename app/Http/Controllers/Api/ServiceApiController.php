<?php

namespace App\Http\Controllers\Api;

use App\Actions\GetServicesAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\API\ServiceApiResource;
use App\Models\Service;
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

    public function update(Request $request, Service $service): JsonResponse
    {
        $request->validate([
            'report_status' => 'nullable|in:private,public',
            'status' => 'nullable|in:requires-follow-up,completed,follow-up-completed,complete',
            'technician_report' => 'nullable|string'
        ]);

        $service->update([
            'report_status' => $request->report_status,
            'status' => $request->status,
            'technician_report' => $request->technician_report,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Service updated successfully',
            'data' => new ServiceApiResource($service),
        ]);
    }

    public function uploadPhoto(Request $request, Service $service): JsonResponse
    {
        $request->validate([
            'photo' => 'required|image',
        ]);

        $service->photos()->create([
            'url' => $request->file('photo')->store('services', 'public'),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Photo uploaded successfully',
            'data' => new ServiceApiResource($service),
        ]);
    }

    public function sign(Request $request, Service $service): JsonResponse
    {
        $request->validate([
            'signature' => 'required|image',
        ]);

        $service->update([
            'client_signature' => $request->file('signature')->store('services', 'public'),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Signature uploaded successfully',
            'data' => new ServiceApiResource($service),
        ]);
    }
}
