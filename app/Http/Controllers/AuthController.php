<?php

namespace App\Http\Controllers;

use App\DTO\LoginDTO;
use App\DTO\UserDTO;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    private UserService $userService;
    private AuthService $authService;

    public function __construct(UserService $userService, AuthService $authService)
    {
        $this->userService = $userService;
        $this->authService = $authService;
    }
    public function register(StoreUserRequest $request)
    {
        $userDTO = new UserDTO(
            $request->input('name'),
            $request->input('company_name'),
            $request->input('email'),
            $request->input('password')
        );

        $user = $this->userService->createUser($userDTO);

        return response()->json([
            "message" => "User created successfully",
            "user" => $user
        ], 201);
    }

    public function login(LoginUserRequest $request)
    {
        $loginDTO = new LoginDTO(
            $request->input('email'),
            $request->input('password')
        );

        $access_token = $this->authService->loginUser($loginDTO);

        return response()->json([
            "message" => "Logged in successfully",
            "access_token" => $access_token
        ]);
    }
}
