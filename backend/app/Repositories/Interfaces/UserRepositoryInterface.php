<?php

namespace App\Repositories\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface UserRepositoryInterface extends BaseResourceRepositoryInterface
{
    /**
     * Find user by username.
     *
     * @param  string $username
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function findByUsername(string $username): ?Model;
}
