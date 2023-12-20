<?php

use App\Http\Controllers\Api\AuthenticatedApiController;
use App\Http\Controllers\Api\ClientApiController;
use App\Http\Controllers\Api\ServiceApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthenticatedApiController::class, 'profile']);
    Route::post('/profile', [AuthenticatedApiController::class, 'updateProfile']);
    Route::post('/logout', [AuthenticatedApiController::class, 'logout']);
    Route::get('/services', [ServiceApiController::class, 'index']);
    Route::post('/services/{service}', [ServiceApiController::class, 'update']);
    Route::post('/services/{service}/photo', [ServiceApiController::class, 'uploadPhoto']);
    Route::post('/services/{service}/sign', [ServiceApiController::class, 'sign']);
    Route::get('/clients/{client}', [ClientApiController::class, 'show']);
});

Route::post('/login', [AuthenticatedApiController::class, 'login']);
Route::post('/forgot-password', [AuthenticatedApiController::class, 'forgotPassword']);
Route::post('/otp-verify', [AuthenticatedApiController::class, 'otpVerify']);
Route::post('/reset-password', [AuthenticatedApiController::class, 'resetPassword']);
