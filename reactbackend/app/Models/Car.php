<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Rent;
class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'model',
        'price',
        'availability',
        'year',
        'image',
        'fuel',
        'gearbox',



    ];

    public $timestamps = false;

    public function rents()
    {
        return $this->hasMany(Rent::class);
    }

}
