<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseResourceRepository implements UserRepositoryInterface
{
    /**
     * Create a new repository instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->model = new User();
    }

    /**
     * Find user by username.
     *
     * @param  string $username
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function findByUsername(string $username): ?Model
    {
        return $this->model->where('username', $username)->first();
    }
}
