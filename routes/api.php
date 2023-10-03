<?php

use App\Http\Controllers\Api\AuthenticatedApiController;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthenticatedApiController::class, 'login']);
Route::post('/forgot-password', [AuthenticatedApiController::class, 'forgotPassword']);
Route::post('/otp-verify', [AuthenticatedApiController::class, 'otpVerify']);
Route::post('/reset-password', [AuthenticatedApiController::class, 'resetPassword']);
