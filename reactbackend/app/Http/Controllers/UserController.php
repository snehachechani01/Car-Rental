<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

use App\Models\User;
use Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:15',
            'email' => 'required|string|email|unique:users|max:20',
            'password' => 'required|string|min:6|max:25',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));

        if ($user->save()) {
            return response()->json(['success' => true, 'user' => $user], 201);
        } else {
            return response()->json(['success' => false, 'message' => 'User registration failed'], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = $request->user();

            return response()->json([
                'message' => 'Login successful',
                'user_id' => $user->id,
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }



}
