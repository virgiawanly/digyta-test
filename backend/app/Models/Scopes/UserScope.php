<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class UserScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $tableName = $model->getTable();

        if (Auth::check()) {
            $userId = Auth::user()->id;
        } else {
            $userId = $model->user_id;
        }

        $builder->where($tableName . '.' . ($model->userIdColumn ?? 'user_id'), $userId);
    }
}
