<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RegistrationControllerler extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);


        if (!$data) {
            return response()->json(['success' => false, 'message' => $data->errors()], 422);
        }


        DB::table('users')->insert([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json(['success' => true, 'message' => 'User registered successfully.']);

    }

    public function login(Request $request)
    {
        // Validate the user input
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            // Authentication was successful
            $user = Auth::user();
            if ($user->is_admin) {
                session(['user_id' => $user->id]);
                return response()->json(['success' => true, 'message' => 'Login successfully.',  'user_id' => $user->id, 'role' => 'admin']);
            } else {
                session(['user_id' => $user->id]);
                return response()->json(['success' => true, 'message' => 'Login successfully.', 'user_id' => $user->id, 'role' => 'user']);
            }
        } else {
            // Authentication failed
            return response()->json(['success' => false, 'message' => 'Login Failed.']);
        }
    }


    public function logout()
    {
        session()->flush();
        Auth::logout();

        return response()->json(['success' => true, 'message' => 'Logout successfully.']);
    }


}
