<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Rent;
use App\Models\Car;

use Illuminate\Support\Facades\DB;

class RentController extends Controller
{
    public function index()
    {
        // Get all available cars
        $cars = Car::where('available', true)->get();

        return response()->json($cars);
    }

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
        $cars = Car::join('rents', 'cars.id', '=', 'rents.car_id')
            ->join('users', 'rents.user_id', '=', 'users.id')
            ->where('cars.availability', 0)
            ->select('cars.*',
                DB::raw('DATEDIFF(rents.return_date, rents.rental_date) AS rents_duration'),
                'users.name as user_name', 'rents.return_date')
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
        $car = Car::findOrFail($validatedData['car_id']);
        $car->availability = false;
        $car->save();

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

        $data = DB::table('rents')
            ->join('cars', 'rents.car_id', '=', 'cars.id')
            ->select('rents.*', 'cars.brand', 'cars.model')
            ->where('rents.user_id', 2  )
            ->where('cars.availability', false)
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
    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['success' => false, 'message' => 'Car not found.']);
        }

        // Set available to true
        $car->availability = true;
        $car->save();

        // Delete entries from the "rent" table with the same car_id
        Rent::where('car_id', $car->id)->delete();

        return response()->json(['success' => true, 'message' => 'Rent entries deleted successfully.']);
    }



    private function calculateTotalPrice($rentalDate, $returnDate, $pricePerDay)
    {
        $days = Carbon::parse($rentalDate)->diffInDays(Carbon::parse($returnDate));
        return $days * $pricePerDay;
    }

}
