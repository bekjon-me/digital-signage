<?php
namespace App\Services;

use App\DTO\UserDTO;
use App\Models\User;

class UserService
{
    public function createUser(UserDTO $userDTO): User
    {
        return User::create([
            "name" => $userDTO->name,
            "company_name" => $userDTO->company_name,
            "email" => $userDTO->email,
            "password" => $userDTO->password,
        ]);
    }
}
