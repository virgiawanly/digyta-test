<?php

namespace App\Http\Controllers\WebApp\Task;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\BaseResourceController;
use App\Http\Requests\WebApp\Task\BatchDeleteTaskRequest;
use App\Http\Requests\WebApp\Task\BatchUpdateTaskStatusRequest;
use App\Http\Requests\WebApp\Task\CreateTaskRequest;
use App\Http\Requests\WebApp\Task\UpdateTaskRequest;
use App\Services\Task\TaskService;

class TaskController extends BaseResourceController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(protected TaskService $taskService)
    {
        parent::__construct($taskService->repository);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\WebApp\Task\CreateTaskRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateTaskRequest $request)
    {
        return parent::save($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\WebApp\Task\UpdateTaskRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateTaskRequest $request, int $id)
    {
        return parent::patch($request, $id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\WebApp\Task\BatchDeleteTaskRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function batchDelete(BatchDeleteTaskRequest $request)
    {
        $this->taskService->batchDelete($request->validated());

        return ResponseHelper::success(trans('messages.successfully_deleted'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\WebApp\Task\BatchUpdateTaskStatusRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function batchUpdateStatus(BatchUpdateTaskStatusRequest $request)
    {
        $this->taskService->batchUpdateStatus($request->validated());

        return ResponseHelper::success(trans('messages.successfully_updated'));
    }
}
