<?php

namespace App\Repositories;

use App\Models\Task;
use App\Repositories\Interfaces\TaskRepositoryInterface;

class TaskRepository extends BaseResourceRepository implements TaskRepositoryInterface
{
    /**
     * Create a new repository instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->model = new Task();
    }

    /**
     * Batch update status tasks by ids.
     *
     * @param  array $ids
     * @param  string $status
     * @return bool
     */
    public function batchUpdateStatusByIds(array $ids, string $status): bool
    {
        return $this->model
            ->whereIn('id', $ids)
            ->update(['status' => $status,]);
    }
}
