<?php

namespace App\Http\Controllers\WebApp\Auth;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\WebApp\Auth\LoginRequest;
use App\Services\Auth\AuthService;

class LoginController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(protected AuthService $authService) {}

    /**
     * Login user by creating a new access token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(LoginRequest $request)
    {
        $results = $this->authService->login($request->validated());

        return ResponseHelper::success(trans('messages.successfully_logged_in'), $results, 200);
    }
}
