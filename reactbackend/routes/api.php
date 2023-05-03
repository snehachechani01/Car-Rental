<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\RentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [UserController::class ,'register']);
Route::post('/login', [UserController::class ,'login']);
Route::get('/cars', [CarController::class,'index']);
Route::post('/cars', [CarController::class,'store']);
Route::get('/cars/{id}', [CarController::class,'edit']);
Route::any('/cars/{id}/edit', [CarController::class,'update']);
Route::delete('/cars/{id}', [CarController::class,'destroy']);
Route::post('/rentals', [RentController::class, 'store']);


