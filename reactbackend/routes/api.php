<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegistrationControllerler;
use \App\Http\Controllers\CarController;
use \App\Http\Controllers\RentController;
use App\Http\Middleware\AuthCheck;

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

use App\Models\User;

Route::get('/users', function () {
    $users = User::all();
    return response()->json($users);
});

Route::get('/cars', [CarController::class, 'index'])->name('car.index');
Route::POST('/cars/add', [CarController::class, 'store'])->name('car.store');
Route::delete('/cars/{id}', [CarController::class, 'destroy'])->name('car.destroy');
Route::get('/cars/{id}', [CarController::class, 'edit'])->name('car.edit');
Route::any('/cars/edit/{id}', [CarController::class, 'update'])->name('car.update');

Route::get('/rents', [RentController::class, 'index'])->name('rent.index');
Route::get('/live', [RentController::class, 'booked'])->name('rent.booked');
Route::POST('/rents/add', [RentController::class, 'store'])->name('rent.store');
Route::GET('/crondata', [RentController::class, 'getDataByUserId'])->name('rent.getDataByUserId');
Route::POST('/remove/{id}', [RentController::class, 'destroy'])->name('rent.destroy');

Route::POST('/register', [RegistrationControllerler::class, 'register']);
Route::POST('/login', [RegistrationControllerler::class, 'login']);
Route::POST('/logout', [RegistrationControllerler::class, 'logout']);







