<?php

namespace App\Services\Task;

use App\Repositories\Interfaces\TaskRepositoryInterface;
use App\Services\BaseResourceService;

class TaskService extends BaseResourceService
{
    /**
     * Create a new service instance.
     *
     * @param  \App\Repositories\Interfaces\TaskRepositoryInterface  $repository
     * @return void
     */
    public function __construct(TaskRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get repository instance.
     *
     * @return \App\Repositories\Interfaces\TaskRepositoryInterface
     */
    public function repository(): TaskRepositoryInterface
    {
        return $this->repository;
    }

    /**
     * Batch delete resources.
     *
     * @param  array $payload
     * @return void
     */
    public function batchDelete(array $payload)
    {
        $this->repository()->batchDeleteByIds($payload['ids']);
    }

    /**
     * Batch update status resources.
     *
     * @param  array $payload
     * @return void
     */
    public function batchUpdateStatus(array $payload)
    {
        $this->repository()->batchUpdateStatusByIds($payload['ids'], $payload['status']);
    }
}
