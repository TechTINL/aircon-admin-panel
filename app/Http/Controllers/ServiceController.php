<?php

namespace App\Http\Controllers;

use App\Actions\GetServicesAction;
use App\Exports\ServicesExport;
use App\Helpers\BreadcrumbHelper;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ServiceController extends Controller
{
    public function index(GetServicesAction $action): Response
    {
        return Inertia::render('Services/List', [
            'breadcrumb' => BreadcrumbHelper::services(),
            'services' => ServiceResource::collection($action->execute()),
        ]);
    }

    public function export(): BinaryFileResponse
    {
         return Excel::download(new ServicesExport, 'services.xlsx');
    }

    public function show(Service $service): Response
    {
        return Inertia::render('Services/Details', [
            'service' => new ServiceResource($service),
        ]);
    }
}
