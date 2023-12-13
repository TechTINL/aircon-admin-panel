<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::get('/clients-list', [ClientController::class, 'clientsList'])->name('clients.list');
Route::get('/clients/{client}/sub-clients', [ClientController::class, 'subClients'])
    ->name('clients.subClients');

// Check if address is used, search by address string
Route::post('/addresses-is-used', [AddressController::class, 'isUsed'])
    ->name('addresses.isUsed');
