<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $user = User::create($validated);
    }
}
