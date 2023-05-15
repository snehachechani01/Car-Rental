<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Illuminate\Support\Facades\File;
use Validator;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|numeric|min:1900|max:'.date('Y'),
            'price' => 'required|numeric|min:0',
            'gearbox' => 'required|string',
            'fuel' => 'required|string',
            'available' => 'required',
            'image' => 'required|image|max:2048', // maximum file size is 1MB
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()], 422);
        }

        $imageName = time() . '.' . $request->image->getClientOriginalExtension();
        $request->image->storeAs('public/images/cars', $imageName);

        $cars = new Car([
            'brand' => $request->get('brand'),
            'model' => $request->get('model'),
            'year' => $request->get('year'),
            'price' => $request->get('price'),
            'gearbox' => $request->get('gearbox'),
            'fuel' => $request->get('fuel'),
            'available' => $request->get('available'),
            'image' => 'images/cars/'.$imageName,
        ]);
        $cars->save();

        return response()->json(['success' => true, 'message' => 'Car Added successfully.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        try {
            $cars = Car::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            abort(404);
        }
        return response()->json($cars);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $cars = Car::find($id);
        return response()->json($cars);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        $car = Car::find($id);
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|numeric|min:1900|max:' . date('Y'),
            'price' => 'required|numeric|min:0',
            'gearbox' => 'required|string',
            'fuel' => 'required|string',
            // maximum file size is 1MB
        ], [
            'brand.required' => 'The brand field is required.',
            'model.required' => 'The model field is required.',
            'year.required' => 'The year field is required.',
            'year.numeric' => 'The year must be a number.',
            'year.min' => 'The year must be at least 1900.',
            'year.max' => 'The year cannot be greater than ' . date('Y') . '.',
            'price.required' => 'The price field is required.',
            'price.numeric' => 'The price must be a number.',
            'price.min' => 'The price must be at least 0.',
            'gearbox.required' => 'The gearbox field is required.',
            'fuel.required' => 'The fuel field is required.',
            'image.image' => 'The image must be a valid image file.',
            'image.max' => 'The image size cannot exceed 2042 kilobytes.',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }



        $car->brand = $request->get('brand');
        $car->model = $request->get('model');
        $car->year = $request->get('year');
        $car->price = $request->get('price');
        $car->gearbox = $request->get('gearbox');
        $car->fuel = $request->get('fuel');
        $car->available = $request->get('available');

        if ($request->hasFile('image')) {
            if ($car->image) {
                File::delete(public_path('storage'.$car->image));
            }
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->storeAs('public/images/cars', $imageName);
            $car->image = 'images/cars/'.$imageName;
        }

        $car->save();

        return redirect()->back()->with('success', 'Car details updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cars = Car::find($id);
        $cars->delete();

        return response()->json(['success' => true, 'message' => 'Car Deleted successfully.']);
    }

}
