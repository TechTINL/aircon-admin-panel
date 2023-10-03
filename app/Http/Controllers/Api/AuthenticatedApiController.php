<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthenticatedApiController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $token = $request->user()->createToken('api-token');

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token->plainTextToken
        ]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $phone = $request->input('phone');

        $user = User::where('phone', $phone)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        // $user->sendPasswordResetNotification($user->createToken('password-reset')->plainTextToken);

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully'
        ]);
    }

    public function otpVerify(Request $request): JsonResponse
    {
        $otp = $request->input('otp');
        $phone = $request->input('phone');

        $user = User::where([
            'phone' => $phone,
            'otp' => $otp
        ])->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'OTP verified successfully'
        ]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $phone = $request->input('phone');
        $otp = $request->input('otp');
        $password = $request->input('password');

        $user = User::where([
            'phone' => $phone,
            'otp' => $otp
        ])->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP'
            ]);
        }

        $user->password = Hash::make($password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully'
        ]);
    }
}
