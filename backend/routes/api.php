<?php

use App\Http\Controllers\WebApp\Auth\LoginController;
use App\Http\Controllers\WebApp\Auth\RegisterController;
use App\Http\Controllers\WebApp\Task\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', LoginController::class);
    Route::post('register', RegisterController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});
