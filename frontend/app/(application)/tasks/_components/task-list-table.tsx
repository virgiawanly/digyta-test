'use client';

import DataPagination from '@/components/shared/pagination/data-pagination';
import { DataTable } from '@/components/shared/table/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useDebounce from '@/hooks/use-debounce';
import httpClient from '@/lib/http';
import { FormattedApiError } from '@/types/errors';
import { Pagination } from '@/types/pagination';
import { Task, TaskStatus } from '@/types/tasks';
import { getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { PlusCircle, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import CreateTaskDialog from './create-task-dialog';
import DeleteTaskDialog from './delete-task-dialog';
import EditTaskDialog from './edit-task-dialog';
import useTaskColumns from './task-list-columns';

const TaskListTable = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isBatchDeleteDialogOpen, setIsBatchDeleteDialogOpen] = useState(false);
  const [isSingleDeleteDialogOpen, setIsSingleDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksSearch, setTasksSearch] = useState<string>('');
  const [tasksStatus, setTasksStatus] = useState<TaskStatus | null>(null);
  const [tasksSorting, setTasksSorting] = useState<SortingState>([]);
  const [tasksPagination, setTasksPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  });

  const debouncedSearch = useDebounce(tasksSearch, 300);
  const columns = useTaskColumns({
    onRowChangeStatus: (task: Task, status: TaskStatus) => handleSingleUpdateStatus(task.id, status),
    onRowDelete: (task: Task) => handleSingleDelete(task),
    onRowEdit: (task: Task) => {
      setTaskToEdit(task);
      setIsEditDialogOpen(true);
    },
  });

  const table = useReactTable({
    data: tasks,
    columns,
    state: { sorting: tasksSorting },
    manualSorting: true,
    onSortingChange: setTasksSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchTasks = useCallback(() => {
    const controller = new AbortController();
    const sortBy = tasksSorting.length ? tasksSorting[0].id : '';
    const sortOrder = tasksSorting.length ? (tasksSorting[0].desc ? 'desc' : 'asc') : '';

    setIsLoadingTasks(true);
    httpClient
      .get('/tasks', {
        signal: controller.signal,
        params: {
          page: tasksPagination.currentPage,
          size: tasksPagination.pageSize,
          search: debouncedSearch,
          sort: sortBy,
          order: sortOrder,
          status: tasksStatus ?? null,
        },
      })
      .then((res) => {
        setTasks(res.data.data.data);
        setTasksPagination((current) => ({ ...current, totalItems: res.data.data.total }));
      })
      .catch((error: FormattedApiError) => {
        toast(error.message);
      })
      .finally(() => {
        setIsLoadingTasks(false);
      });

    return controller;
  }, [tasksPagination.currentPage, tasksPagination.pageSize, debouncedSearch, tasksSorting, tasksStatus]);

  const handlePageChange = (page: number) => {
    table.resetRowSelection();
    setTasksPagination((current) => ({ ...current, currentPage: page }));
  };

  const handleSingleDelete = (task: Task) => {
    setTaskToDelete(task);
    setIsSingleDeleteDialogOpen(!!task);
  };

  const handleBatchDelete = () => {
    const isOpen = table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected();
    setIsBatchDeleteDialogOpen(isOpen);
  };

  const handleSingleUpdateStatus = (taskId: number, status: TaskStatus) => {
    httpClient
      .put('/tasks/batch-update-status', { ids: [taskId], status })
      .then((res) => {
        const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status } : task));
        setTasks(updatedTasks);
        toast.success(res.data.message);
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message);
      });
  };

  const handleBatchUpdateStatus = (status: TaskStatus) => {
    const selectedIds = table.getSelectedRowModel().rows.map((row) => row.original.id);
    if (selectedIds.length) {
      httpClient
        .put('/tasks/batch-update-status', { ids: selectedIds, status })
        .then((res) => {
          const updatedTasks = tasks.map((task) => (selectedIds.includes(task.id) ? { ...task, status } : task));
          setTasks(updatedTasks);
          toast.success(res.data.message);
          table.resetRowSelection();
        })
        .catch((err: FormattedApiError) => {
          toast.error(err.message);
        });
    }
  };

  const refreshTasks = useCallback(() => {
    table.resetRowSelection();
    if (tasksPagination.currentPage > 1) {
      setTasksPagination((prev) => ({ ...prev, currentPage: 1 }));
    } else {
      fetchTasks();
    }
  }, [fetchTasks, tasksPagination.currentPage, table]);

  useEffect(() => {
    setTasksPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearch, tasksStatus]);

  useEffect(() => {
    const controller = fetchTasks();
    return () => controller.abort();
  }, [fetchTasks, tasksPagination.currentPage]);

  useEffect(() => {
    // Setup event listeners for refresh
    window.addEventListener('task-created', refreshTasks);
    window.addEventListener('task-updated', refreshTasks);
    window.addEventListener('task-deleted', refreshTasks);

    return () => {
      window.removeEventListener('task-created', refreshTasks);
      window.removeEventListener('task-updated', refreshTasks);
      window.removeEventListener('task-deleted', refreshTasks);
    };
  }, [refreshTasks]);

  return (
    <>
      {/* List Card */}
      <Card>
        <CardContent className="p-5">
          <div className="grid w-full gap-4">
            <div className="flex flex-col w-full gap-3 md:items-center md:flex-row">
              <div className="relative flex-1 max-md:w-full">
                <Search className="absolute -translate-y-1/2 left-3 top-1/2 size-3 text-muted-foreground" absoluteStrokeWidth />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8"
                  value={tasksSearch}
                  onChange={(e) => setTasksSearch(e.target.value)}
                />
              </div>
              <div className="md:w-fit">
                <Select value={tasksStatus as string | undefined} onValueChange={(value) => setTasksStatus(value as TaskStatus | null)}>
                  <SelectTrigger className="w-full max-w-full md:w-48">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null as any}>All Status</SelectItem>
                    <SelectItem value={TaskStatus.Pending}>Pending</SelectItem>
                    <SelectItem value={TaskStatus.InProgress}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.Completed}>Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:w-fit">
                <Button onClick={() => setIsCreateDialogOpen(true)} className="max-md:w-full">
                  <PlusCircle />
                  <span>Tambah</span>
                </Button>
              </div>
            </div>

            {(table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()) && (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <span>Action</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleBatchUpdateStatus(TaskStatus.Pending)} className="cursor-pointer">
                      <span>Ubah ke &lsquo;Pending&lsquo;</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBatchUpdateStatus(TaskStatus.InProgress)} className="cursor-pointer">
                      <span>Ubah ke &lsquo;In Progress&lsquo;</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBatchUpdateStatus(TaskStatus.Completed)} className="cursor-pointer">
                      <span>Ubah ke &lsquo;Completed&lsquo;</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBatchDelete()} className="cursor-pointer">
                      <span>Hapus Task</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-sm text-muted-foreground">{table.getSelectedRowModel().rows.length} row(s) selected</p>
              </div>
            )}

            {/* Main Table */}
            <div className="w-full overflow-x-auto">
              <DataTable table={table} isLoading={isLoadingTasks} />
            </div>

            <div className="flex justify-center w-full overflow-x-auto md:justify-end">
              <div className="w-fit">
                <DataPagination
                  pageSize={tasksPagination.pageSize}
                  totalItems={tasksPagination.totalItems}
                  currentPage={tasksPagination.currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Delete Dialog */}
      <DeleteTaskDialog
        isOpen={isBatchDeleteDialogOpen}
        setIsOpen={setIsBatchDeleteDialogOpen}
        selectedIds={table.getSelectedRowModel().rows.map((row) => row.original.id)}
      />

      {/* Single Delete Dialog */}
      <DeleteTaskDialog
        isOpen={isSingleDeleteDialogOpen}
        setIsOpen={setIsSingleDeleteDialogOpen}
        selectedIds={taskToDelete ? [taskToDelete.id] : []}
      />

      {/* Create Dialog */}
      <CreateTaskDialog isOpen={isCreateDialogOpen} setIsOpen={setIsCreateDialogOpen} />

      {/* Edit Dialog */}
      <EditTaskDialog isOpen={isEditDialogOpen} setIsOpen={setIsEditDialogOpen} task={taskToEdit} />
    </>
  );
};

export default TaskListTable;
