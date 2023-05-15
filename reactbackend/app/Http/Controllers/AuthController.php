<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('web')->attempt($credentials)) {
            $user = Auth::user();

            if ($user->is_admin) {
                return response()->json([
                    'success' => true,
                    'redirectTo' => '/admin/dashboard' // Redirect to admin dashboard
                ]);
            } else {
                return response()->json([
                    'success' => true,
                    'redirectTo' => '/' // Redirect to website home page
                ]);
            }
        } else {
            return response()->json([
                'success' => false,
                'error' => 'Invalid email or password.'
            ], 401);
        }
    }
}
