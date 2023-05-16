<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all();

        return response()->json($cars);

    }

    public function create()
    {

    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',

            'price' => 'required|numeric',
            'fuelType' => 'required|max:255',
            'gearbox' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048' ,// add validation rules for the photo
             'availability'=>'required',

        ]);

        if ($request->hasFile('photo')) {
            $filename = $request->file('photo')->getClientOriginalName();
            $request->file('photo')->storeAs('public/images', $filename);
            $validatedData['photo'] = $filename;
        }

        $car = Car::create($validatedData);
        return response()->json([
            'message' => 'Car created successfully',
            'car' => $car
        ]);

        // return a response
    }
    public function show(Car $car)
    {
        return response()->json($car);
    }

    public function edit(int $id)
    {
        $car = Car::findOrFail($id);
        return response()->json($car);
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'price' => 'required|numeric',
            'fuelType' => 'required|max:255',
            'gearbox' => 'required|string|max:255',


        ]);

        $car = Car::find($id);
//
//        if ($request->hasFile('photo')) {
//            if ($car->photo) {
//                File::delete(public_path('storage/images'.$car->image));
//            }
//            $imageName = time() . '.' . $request->photo->getClientOriginalExtension();
//            $request->photo->storeAs('public/images', $imageName);
//            $car->photo = 'images/cars/'.$imageName
//            ;
//        }

        $car->save();

        $car->update($validatedData);

        return response()->json($car);
    }



    public function destroy($id)
    {
        $car = Car::findOrFail($id);
        $car->delete();
        return response()->json(['message' => 'Car deleted successfully']);
    }

}
