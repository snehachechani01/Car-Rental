<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as AuthenticatableUser;

class User extends AuthenticatableUser implements Authenticatable
{
    use HasFactory;

    // your model properties and methods here

    /**
     * Get the name of the unique identifier for the user.
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return 'id';
    }

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->password;
    }

    /**
     * Get the remember token for the user.
     *
     * @return string|null
     */
//    public function getRememberToken()
//    {
//        return $this->remember_token;
//    }
//
//    /**
//     * Set the remember token for the user.
//     *
//     * @param  string  $value
//     * @return void
//     */
//    public function setRememberToken($value)
//    {
//        $this->remember_token = $value;
//    }
//
//    /**
//     * Get the column name for the "remember me" token.
//     *
//     * @return string
//     */
//    public function getRememberTokenName()
//    {
//        return 'remember_token';
//    }
}
