<?php

namespace App\Http\Controllers;

use App\Actions\GetServicesAction;
use App\Exports\ServicesExport;
use App\Http\Resources\ServiceResource;
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
            'services' => ServiceResource::collection($action->execute()),
        ]);
    }

    public function export(): BinaryFileResponse
    {
         return Excel::download(new ServicesExport, 'services.xlsx');
    }

    public function show($service)
    {
        // return response()->json([
        //            [
        //                'client_name' => 'John Doe',
        //                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
        //                'service_time' => '10:00 AM',
        //                'type' => 'contract',
        //                'status' => 'completed',
        //            ],
        //            [
        //                'client_name' => 'Client 2',
        //                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
        //                'service_time' => '10:00 AM',
        //                'type' => 'adhoc',
        //                'status' => 'requires-follow-up',
        //            ],
        //            [
        //                'client_name' => 'Client 3',
        //                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
        //                'service_time' => '10:00 AM',
        //                'type' => 'contract',
        //                'status' => 'scheduled',
        //            ],
        //            [
        //                'client_name' => 'John Doe',
        //                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
        //                'service_time' => '10:00 AM',
        //                'type' => 'contract',
        //                'status' => 'scheduled',
        //            ],
        //            [
        //                'client_name' => 'John Doe',
        //                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
        //                'service_time' => '10:00 AM',
        //                'type' => 'contract',
        //                'status' => 'scheduled',
        //            ]
        //        ]);
        return response()->json([
            'client_name' => 'John Doe',
            'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
            'service_time' => '10:00 AM',
            'type' => 'contract',
            'status' => 'completed',
            'technicians' => [
                [
                    'name' => 'John Doe',
                    'status' => 'completed',
                    'remarks' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl.',
                ],
                [
                    'name' => 'John Doe',
                    'status' => 'completed',
                    'remarks' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl.',
                ],
                [
                    'name' => 'John Doe',
                    'status' => 'completed',
                    'remarks' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl.',
                ],
                [
                    'name' => 'John Doe',
                    'status' => 'completed',
                    'remarks' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl n',
                ],
                [
                    'name' => 'John Doe',
                    'status' => 'completed',
                    'remarks' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet urna, vitae aliquam nisl nunc vitae nisl.',
                ],
            ],
        ]);
    }
}
