<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Rent;

class RentController extends Controller
{

    public function create(Request $request)
    {
        $rental = new Rent([
            'rental_date' => $request->input('rental_date'),
            'return_date' => $request->input('return_date'),
            'price' => $request->input('price'),
            'user_id' => $request->input('user_id'),
            'car_id' => $request->input('car_id'),
        ]);
        $rental->save();
        return response()->json($rental, 201);
    }

    public function Booked()
    {
        $cars = Car::join('rent', 'cars.id', '=', 'rent.car_id')
            ->join('users', 'rent.user_id', '=', 'users.id')
            ->where('cars.available', 0)
            ->select('cars.*',
                DB::raw('DATEDIFF(rent.return_date, rent.rent_date) AS rent_duration'),
                'users.name as user_name', 'rent.return_date')
            ->get();

        return response()->json($cars);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rental_date' => 'required|date',
            'return_date' => 'required|date',
            'price' => 'required|numeric',
            'user_id' => 'required',
            'car_id' => 'required',
        ]);

        $rental = new Rent([
            'rental_date' => $validatedData['rental_date'],
            'return_date' => $validatedData['return_date'],
            'price' => $validatedData['price'],
            'user_id' => $validatedData['user_id'],
            'car_id' => $validatedData['car_id'],
        ]);
        $rental->save();

        return response()->json($rental);
    }
    public function getDataByUserId(Request $request)
    {
        $userId = $request->query('userid');

        $data = DB::table('rent')
            ->join('cars', 'rent.car_id', '=', 'cars.id')
            ->select('rent.*', 'cars.brand', 'cars.model', 'cars.image')
            ->where('rent.user_id', $userId  )
            ->where('cars.available', false)
            ->get();

        return response()->json($data);
    }



    public function update(Request $request, $id)
    {
        $rental = Rent::find($id);
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
        $rental = Rent::find($id);
        $rental->delete();
        return response()->json(null, 204);
    }
    public function endRental($id)
    {
        $rental = Rental::findOrFail($id);

        $rental->return_date = now();
        $rental->total_price = $this->calculateTotalPrice($rental->rental_date, $rental->return_date, $rental->car->price_per_day);
        $rental->save();

        return response()->json(['message' => 'Rental has been ended.']);
    }

    private function calculateTotalPrice($rentalDate, $returnDate, $pricePerDay)
    {
        $days = Carbon::parse($rentalDate)->diffInDays(Carbon::parse($returnDate));
        return $days * $pricePerDay;
    }

}
