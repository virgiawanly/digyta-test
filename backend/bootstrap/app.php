<?php

use App\Helpers\ResponseHelper;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Exception $e, Request $request) {
            if ($request->is('api/*')) {
                if ($e instanceof ValidationException) {
                    // Send default response
                } else if ($e instanceof UnauthorizedException) {
                    return ResponseHelper::forbidden($e->getMessage());
                } else if ($e instanceof AuthenticationException) {
                    return ResponseHelper::unauthenticated($e->getMessage());
                } else if ($e instanceof ModelNotFoundException || $e instanceof NotFoundHttpException) {
                    return ResponseHelper::notFound($e->getMessage());
                } else {
                    return ResponseHelper::internalServerError($e->getMessage());
                }
            }
        });
    })->create();
