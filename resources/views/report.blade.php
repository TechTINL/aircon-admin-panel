<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            @page {
                size: A4;
            }
        }
    </style>
</head>
<body class="bg-white p-8">
<div class="max-w-4xl mx-auto p-6 mb-4">
    <img src="/report_banner.jpeg" alt="Service Image" class="rounded my-8">
    <div class="flex justify-between items-center mb-2">
        <div class="flex gap-2">
            <div class="text-xs uppercase text-gray-600">Service Report</div>
            <div class="text-xs font-bold">{{ $service->service_date }} | {{ $service->service_time }}</div>
        </div>
        <div class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">AdHoc</div>
    </div>
    <div class="mb-6">
        <div class="text-lg font-semibold mb-2">{{ $service->client->name }}</div>
        <div class="text-gray-600">{{ $service->address }}</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Team In-Charge</div>
        <div class="flex gap-4 mt-2 mb-4">
            @foreach($service->leaders as $leader)
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                    {{ $leader->name }}
                </span>
            @endforeach
        </div>

        <div class="font-semibold">Technician</div>
        <div class="flex gap-4 mt-2 mb-4">
            @foreach($service->technicians as $technician)
                <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                    {{ $technician->name }}
                </span>
            @endforeach
        </div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Service Name</div>
        <div class="text-gray-600">{{ $service->name }}</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Tasks</div>
        @foreach($service->tasks as $task)
            <div class="text-gray-600">{{ $task->name }}</div>
        @endforeach
    </div>
    <div class="mb-12 grid grid-cols-4 gap-1">
        @foreach($service->photos as $photo)
            <img src="/storage/{{ $photo->url }}" alt="Signature">
        @endforeach
    </div>
    <div class="mb-6">
        <div class="font-semibold">Technician Service Report</div>
        <div class="text-gray-600">{{ $service->technician_report }}</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Task Visitation Notes</div>
        <div class="text-gray-600">{{ $service->task_visitation_note }}</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Address</div>
        <div class="text-gray-600">{{ $service->service_address }}</div>
    </div>
    <div class="flex justify-between items-center">
        <div>
            <div class="font-semibold">Client's Signature</div>
            <!-- Signature Image -->
            <img src="{{ $service->client_signature }}" alt="Signature" class="h-12">
        </div>
    </div>
</div>
</body>
</html>
