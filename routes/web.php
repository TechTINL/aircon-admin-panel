<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GeneralNoteController;
use App\Http\Controllers\ProfileController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('clients', ClientController::class)->only(['index', 'create', 'store']);
    Route::get('clients/{client}/profile', [ClientController::class, 'profile'])->name('clients.profile');
    Route::post('contacts', [ContactController::class, 'store'])->name('contacts.store');
    
    // Delete Contact
    Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

	Route::resource('general-notes', GeneralNoteController::class);

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

    Route::get('contract', function () {
        return Inertia::render('Contract/List');
    });

    Route::post('contract', function () {
        return Inertia::render('Contract/Create');
    });

    Route::get('employee', function () {
        return Inertia::render('Employee/List');
    });
    Route::get('admin', function () {
        return Inertia::render('Admin/List');
    });

    Route::get('template-task', function () {
        return Inertia::render('Template/Task/List');
    });

    Route::get('manage-gst', function () {
        return Inertia::render('ManageGST');
    });
    Route::get('/postal-code/{code}', [ClientController::class, 'getAddress']);
});

require __DIR__.'/auth.php';
