<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Rental;

class RentController extends Controller
{

    public function create(Request $request)
    {
        $rental = new Rental([
            'rental_date' => $request->input('rental_date'),
            'return_date' => $request->input('return_date'),
            'price' => $request->input('price'),
            'user_id' => $request->input('user_id'),
            'car_id' => $request->input('car_id'),
        ]);
        $rental->save();
        return response()->json($rental, 201);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rental_date' => 'required|date',
            'return_date' => 'required|date',
            'price' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
        ]);

        $rental = new Rental([
            'rental_date' => $validatedData['rental_date'],
            'return_date' => $validatedData['return_date'],
            'price' => $validatedData['price'],
            'user_id' => $validatedData['user_id'],
            'car_id' => $validatedData['car_id'],
        ]);
        $rental->save();

        return response()->json($rental, 201);
    }



    public function update(Request $request, $id)
    {
        $rental = Rental::find($id);
        $rental->rental_date = $request->input('rental_date');
        $rental->return_date = $request->input('return_date');
        $rental->price = $request->input('price');
        $rental->user_id = $request->input('user_id');
        $rental->car_id = $request->input('car_id');
        $rental->save();
        return response()->json($rental, 200);
    }

  function delete($id)
    {
        $rental = Rental::find($id);
        $rental->delete();
        return response()->json(null, 204);
    }
}
