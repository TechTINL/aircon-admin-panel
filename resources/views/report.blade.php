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
            <div class="text-xs font-bold">20 September 2023 | 10:00</div>
        </div>
        <div class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">AdHoc</div>
    </div>
    <div class="mb-6">
        <div class="text-lg font-semibold mb-2">{{ $service->client->name }}</div>
        <div class="text-gray-600">{{ $service->address }}</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Team In-Charge</div>
        <div class="text-gray-600">Team Leader Name</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Service Name</div>
        <div class="text-gray-600">Cleaning and Washing</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Tasks</div>
        <div class="text-gray-600">Supply labour, tools & materials to perform 2/3 aircon maintenance servicing for 7 Nos. of FCUs (6 WM + 1 Ducted), inclusive of test run system.</div>
    </div>
    <div class="mb-12 grid grid-cols-4 gap-1">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
        <img src="/aircon-sample.png" alt="Service Image" class="w-full rounded">
    </div>
    <div class="mb-6">
        <div class="font-semibold">Technician Service Report</div>
        <div class="text-gray-600">All 3 air cons are cleaned and washed successfully. Gas are also refilled without any issue. No need for any follow up.</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Task Visitation Notes</div>
        <div class="text-gray-600">Client said to reach 11 AM not 9 AM to look out for spoilt part</div>
    </div>
    <div class="mb-6">
        <div class="font-semibold">Address</div>
        <div class="text-gray-600">{{ $service->service_address }}</div>
    </div>
    <div class="flex justify-between items-center">
        <div>
            <div class="font-semibold">Client's Signature</div>
            <!-- Signature Image -->
            <img src="/signature.png" alt="Signature" class="h-12">
        </div>
        <div class="text-right">
            <div class="text-xs text-gray-600">Assigned by Admin Macy</div>
            <div class="text-xs text-gray-600">13 Sep 2023, 9:00 AM</div>
        </div>
    </div>
</div>
</body>
</html>
