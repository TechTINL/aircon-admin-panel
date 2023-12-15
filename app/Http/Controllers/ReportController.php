<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Spatie\Browsershot\Browsershot;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReportController extends Controller
{
    public function preview(Request $request): View|Application|Factory|\Illuminate\Contracts\Foundation\Application
    {
        $service_number = $request->input('service_number');
        $service = Service::where('service_number', $service_number)->firstOrFail();

        return view('report', [
            'service' => $service,
        ]);
    }

    public function download(Request $request): BinaryFileResponse
    {
        $service_number = $request->input('service_number');

        // Define the path where you want to save the PDF temporarily
        $pathToFile = storage_path('app/public/reports-' . $service_number . '.pdf');

        // Use Browsershot to capture the webpage and save it as a PDF
        Browsershot::url(route('report.preview', ['service_number' => $service_number]))
            ->showBackground()
            ->format('A4')
            ->save($pathToFile);

        // Return the PDF as a download response
        // The download will start automatically when this route is accessed
        return response()->download($pathToFile);
    }
}
