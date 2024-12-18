<?php

namespace App\Services\Auth;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Create a new service instance.
     *
     * @param  \App\Repositories\Interfaces\UserRepositoryInterface  $userRepository
     * @return void
     */
    public function __construct(protected UserRepositoryInterface $userRepository) {}

    /**
     * Login user by creating a new access token.
     *
     * @param  array $data
     * @return array
     */
    public function login(array $data)
    {
        $user = $this->userRepository->findByUsername($data['username']);

        if (empty($user) || !Hash::check($data['password'], $user->password)) {
            throw new AuthenticationException(trans("messages.invalid_username_or_password"));
        }

        return [
            'user' => $user,
            'token' => $user->createToken('webAppToken')->plainTextToken
        ];
    }

    /**
     * Register a new user and create an access token.
     *
     * @param  array $data
     * @return array
     */
    public function register(array $data)
    {
        // Create a new user data
        $user = $this->userRepository->save([
            'name' => $data['name'],
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
        ]);

        return [
            'user' => $user,
            'token' => $user->createToken('webAppToken')->plainTextToken
        ];
    }

    /**
     * Get the authenticated user profile.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function getProfile()
    {
        return [
            'user' => Auth::user()
        ];
    }
}
