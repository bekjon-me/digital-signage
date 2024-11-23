<?php
namespace App\Services;

use App\DTO\LoginDTO;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * @throws Exception
     */
    public function loginUser(LoginDTO $loginDTO): ?string
    {
        $user = User::where('email', $loginDTO->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        if (!Auth::attempt(['email' => $loginDTO->email, 'password' => $loginDTO->password])) {
            throw ValidationException::withMessages([
                'password' => [__('auth.password')],
            ]);
        }

        $user = Auth::user();

        return $user->createToken('access_token')->plainTextToken;
    }

    public function logoutUser(): void
    {
        Auth::user()->tokens()->delete();
    }
}
