<?php

namespace App\Http\Controllers;

use App\Actions\GetClientsAction;
use App\Actions\GetEmployeesAction;
use App\Actions\GetGstAction;
use App\Actions\GetServicesAction;
use App\Actions\SaveServiceAction;
use App\Exports\ServicesExport;
use App\Helpers\BreadcrumbHelper;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
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

    public function store(StoreServiceRequest $request, SaveServiceAction $action): RedirectResponse
    {
        $date = Carbon::parse($request->service_date)->format('Y-m-d');
        $time = $request->service_time;
        $service_at = Carbon::parse($date . ' ' . $time);

        $service = Service::create([
            'name' => $request->name,
            'type' => 'adhoc',
            'technician_count' => $request->technician_count,
            'service_no_of_time' => '1 of 1',
            'service_date' => Carbon::parse($request->service_date)->format('Y-m-d'),
            'service_time' => $request->service_time,
            'service_at' => $service_at,
            'service_address' => $request->service_address,
            'billing_address' => $request->billing_address,
            'status' => 'scheduled',
            'client_id' => $request->client_id,
            'subClient_id' => $request->sub_client_id,
        ]);

        $action->assignLeaders($service, $request->leaders_id);
        $action->assignTechnicians($service, $request->employees_id);

        $service->tasks()->createMany($request->tasks);

        return redirect()->route('services.show', $service);
    }

    public function update(StoreServiceRequest $request, Service $service): RedirectResponse
    {
        $date = Carbon::parse($request->service_date)->format('Y-m-d');
        $time = $request->service_time;
        $service_at = Carbon::parse($date . ' ' . $time);

        $service->update([
            'name' => $request->name,
            'type' => 'adhoc',
            'technician_count' => $request->technician_count,
            'service_no_of_time' => '1 of 1',
            'service_date' => Carbon::parse($request->service_date)->format('Y-m-d'),
            'service_time' => $request->service_time,
            'service_at' => $service_at,
            'service_address' => $request->service_address,
            'billing_address' => $request->billing_address,
            'status' => $request->status ?? 'scheduled',
            'client_id' => $request->client_id,
            'subClient_id' => $request->sub_client_id,
        ]);

        $service->leaders()->sync($request->leaders_id);
        $service->technicians()->sync($request->employees_id);

        $service->tasks()->delete();
        $service->tasks()->createMany($request->tasks);

        return redirect()->route('services.show', $service);
    }

    public function export(): BinaryFileResponse
    {
         return Excel::download(new ServicesExport, 'services.xlsx');
    }

    public function show(Service $service, GetClientsAction $getClientsAction, GetEmployeesAction $employeesAction, GetGstAction $gstAction): Response
    {
        return Inertia::render('Services/Details', [
            'service' => new ServiceResource($service),
            'clients' => $getClientsAction->getClientsWithSubClients(),
            'leaders' => $employeesAction->leader(),
            'employees' => $employeesAction->get(),
            'gst' => $gstAction->execute(),
        ]);
    }

    public function timeline(Request $request, GetClientsAction $getClientsAction, GetEmployeesAction $employeesAction): Response
    {
        $date = $request->input('date', today()->format('Y-m-d'));

        return Inertia::render('Services/Timeline', [
            'breadcrumb' => [
                [
                    'text' => 'Services',
                    'href' => route('services.index'),
                ],
                [
                    'text' => 'Service Details',
                    'href' => route('services.show', 1),
                ],
                [
                    'text' => 'Timeline',
                ],
            ],
            'users' => $employeesAction->getWithServices($request->input('date', $date)),
            'clients' => $getClientsAction->getClientsWithSubClients(),
            'leaders' => $employeesAction->leader(),
            'employees' => $employeesAction->get(),
        ]);
    }
}
