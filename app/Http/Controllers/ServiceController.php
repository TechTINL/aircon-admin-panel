<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'client_name' => 'John Doe',
                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
                'service_time' => '10:00 AM',
                'type' => 'contract',
                'status' => 'completed',
            ],
            [
                'client_name' => 'Client 2',
                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
                'service_time' => '10:00 AM',
                'type' => 'adhoc',
                'status' => 'requires-follow-up',
            ],
            [
                'client_name' => 'Client 3',
                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
                'service_time' => '10:00 AM',
                'type' => 'contract',
                'status' => 'scheduled',
            ],
            [
                'client_name' => 'John Doe',
                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
                'service_time' => '10:00 AM',
                'type' => 'contract',
                'status' => 'scheduled',
            ],
            [
                'client_name' => 'John Doe',
                'client_address' => '3 Temasek Boulevard, Sky Garden, #03-308/309 Suntec City, 038983',
                'service_time' => '10:00 AM',
                'type' => 'contract',
                'status' => 'scheduled',
            ]
        ]);
    }

    public function show($service)
    {
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
