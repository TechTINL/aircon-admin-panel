<?php

use App\Actions\ActivityAction\GetActivitiesAction;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GeneralNoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::post('contacts', [ContactController::class, 'store'])->name('contacts.store');

    // Delete Contact
    Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

	Route::resource('general-notes', GeneralNoteController::class);

    // Store Address
    Route::post('addresses', [AddressController::class, 'store'])->name('addresses.store');

    Route::get('/client-details', function () {
        return Inertia::render('Clients/ClientDetails');
    });

    Route::get('/services-time-line', function () {
        return Inertia::render('Services/Timeline');
    });
    Route::get('/services-report-detail', function () {
        return Inertia::render('Services/ServiceDetails');
    });
    Route::get('/service-report', function () {
        return Inertia::render('Services/ServiceReport');
    });

    Route::get('/postal-code/{code}', [ClientController::class, 'getAddress']);
    Route::get('contract', function () {
        return Inertia::render('Contract/List');
    });

    Route::post('contract', function () {
        return Inertia::render('Contract/Create');
    });

    Route::get('employee', [EmployeeController::class, 'index'])->name('employee.index');
	Route::get('employee/create', [EmployeeController::class, 'create'])->name('employee.create');
	Route::post('employee', [EmployeeController::class, 'store'])->name('employee.store');


    Route::get('admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('admin/create', [AdminController::class, 'create'])->name('admin.create');
	Route::get('admin/{user}/edit', [AdminController::class, 'edit'])->name('admin.edit');
	Route::patch('admin/{user}', [AdminController::class, 'update'])->name('admin.update');
    Route::post('admin', [AdminController::class, 'store'])->name('admin.store');

	Route::post('apply-leave', [AdminController::class, 'storeLeave'])->name('leave.store');

    Route::get('template-task', function () {
        return Inertia::render('Template/Task/List');
    });
    Route::get('template-contract', function () {
        return Inertia::render('Template/Contract/List');
    });
    Route::get('template-service', function () {
        return Inertia::render('Template/Service/List');
    });

    Route::get('manage-gst', function () {
        return Inertia::render('ManageGST');
    });
    Route::get('/postal-code/{code}', [ClientController::class, 'getAddress']);

    Route::get('activity', [ActivityController::class, 'index'])->name('activity.index');
});

require __DIR__.'/auth.php';
