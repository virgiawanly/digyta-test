<?php

namespace App\Traits;

use App\Models\Scopes\UserScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait ScopedByUser
{
    /**
     * Boot the scoped by user.
     */
    protected static function bootScopedByUser(): void
    {
        // Add global scope for query
        static::addGlobalScope(new UserScope);

        // Auto fill user id on create new model
        static::creating(function (Model $model) {
            if (Auth::check()) {
                $model->user_id = Auth::user()->id;
            }
        });
    }

    /**
     * Disable the user scope.
     */
    public static function withoutUserScope(): mixed
    {
        return (new static)->newQueryWithoutScope(new UserScope);
    }
}
