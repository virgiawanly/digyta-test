<?php

namespace App\Http\Controllers\WebApp\Auth;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\WebApp\Auth\RegisterRequest;
use App\Services\Auth\AuthService;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(protected AuthService $authService) {}

    /**
     * Register a new user.
     *
     * @param  \App\Http\Requests\WebApp\Auth\RegisterRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(RegisterRequest $request)
    {
        $results = DB::transaction(function () use ($request) {
            return $this->authService->register($request->validated());
        });

        return ResponseHelper::success(trans('messages.successfully_registered'), $results, 201);
    }
}
