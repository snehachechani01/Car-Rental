<?php

namespace App\Http\Middleware;

use Closure;

class AuthCheck
{
    public function handle($request, Closure $next)
    {
        if (session()->has('user_id')) {
            return $next($request);
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }
        else{
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

    }
}
