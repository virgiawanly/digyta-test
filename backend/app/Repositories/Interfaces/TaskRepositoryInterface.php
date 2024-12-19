<?php

namespace App\Repositories\Interfaces;

interface TaskRepositoryInterface extends BaseResourceRepositoryInterface
{
    /**
     * Batch update status tasks by ids.
     *
     * @param  array $ids
     * @param  string $status
     * @return bool
     */
    public function batchUpdateStatusByIds(array $ids, string $status): bool;
}
