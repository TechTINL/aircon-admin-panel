<?php

use App\Actions\ActivityAction\GetActivitiesAction;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ContractTemplateController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GeneralNoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceTemplateController;
use App\Http\Controllers\TaskTemplateController;
use App\Models\Service;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Browsershot\Browsershot;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // redirect to login page
    return redirect('/login');
});

Route::get('/report-preview', [ReportController::class, 'preview'])->name('report.preview');

Route::get('/report/download', [ReportController::class, 'download']);

Route::get('/otp', function () {
    return Inertia::render('Auth/Otp');
});

Route::get('/confirm-password', function () {
    return Inertia::render('Auth/ConfirmPassword');
});

Route::get('/dashboard', function (GetActivitiesAction $getActivitiesAction) {
    return Inertia::render('Dashboard', [
        'activities' => $getActivitiesAction->execute(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('clients', ClientController::class)->only(['index', 'create', 'store', 'update']);
    Route::get('clients/{client}/profile', [ClientController::class, 'profile'])->name('clients.profile');
    Route::get('clients/{client}/contracts', [ClientController::class, 'contracts'])->name('clients.contracts');
    Route::get('/clients/{client}/services', [ClientController::class, 'services'])->name('clients.services');

    Route::resource('contracts', ContractController::class);

	Route::resource('general-notes', GeneralNoteController::class);

    // Store Address
    Route::post('addresses', [AddressController::class, 'store'])->name('addresses.store');
	// Delete Address
	Route::delete('addresses/{address}', [AddressController::class, 'destroy'])->name('addresses.destroy');

    Route::get('/client-details', function () {
        return Inertia::render('Clients/ClientDetails');
    });

    Route::get('/services-time-line', function () {
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
            'services' => Service::with('client')->get(),
        ]);
    });

    Route::get('/services-report-detail', function () {
        return Inertia::render('Services/ServiceDetails');
    });
    Route::get('/service-report', function () {
        return Inertia::render('Services/ServiceReport');
    });

    Route::get('/postal-code/{code}', [ClientController::class, 'getAddress']);

    Route::resource('services', ServiceController::class)->only(['index', 'show']);
    Route::get('services/export', [ServiceController::class, 'export'])->name('services.export');

    Route::get('employee', [EmployeeController::class, 'index'])->name('employee.index');
	Route::get('employee/create', [EmployeeController::class, 'create'])->name('employee.create');
	Route::post('employee', [EmployeeController::class, 'store'])->name('employee.store');

    Route::get('admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('admin/create', [AdminController::class, 'create'])->name('admin.create');
	Route::get('admin/{user}/edit', [AdminController::class, 'edit'])->name('admin.edit');
	Route::patch('admin/{user}', [AdminController::class, 'update'])->name('admin.update');
    Route::post('admin', [AdminController::class, 'store'])->name('admin.store');
    Route::delete('admin/{user}', [AdminController::class, 'destroy'])->name('admin.destroy');

	Route::post('apply-leave', [AdminController::class, 'storeLeave'])->name('leave.store');

    Route::resource('task-templates', TaskTemplateController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('contract-templates', ContractTemplateController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('service-templates', ServiceTemplateController::class)
	    ->only(['index', 'store', 'update', 'destroy']);

    Route::get('manage-gst', function () {
        return Inertia::render('ManageGST');
    });
    Route::get('/postal-code/{code}', [ClientController::class, 'getAddress']);

    Route::get('activity', [ActivityController::class, 'index'])->name('activity.index');
});

require __DIR__.'/auth.php';
require __DIR__.'/json.php';
