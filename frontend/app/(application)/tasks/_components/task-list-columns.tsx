'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Task, TaskStatus } from '@/types/tasks';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { useMemo } from 'react';

export interface TaskColumnsProps {
  onRowChangeStatus: (row: Task, status: TaskStatus) => any;
  onRowDelete: (row: Task) => any;
  onRowEdit: (row: Task) => any;
  disabled?: boolean; 
}

const useTaskColumns = ({ onRowDelete, onRowEdit, onRowChangeStatus, disabled }: TaskColumnsProps): ColumnDef<Task>[] => {
  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        id: 'select',
        size: 10,
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'title',
        size: 200,
        header: ({ column }) => (
          <Button
            variant="ghost" disabled={disabled}
            className="flex items-center justify-between w-full"
            onClick={() => {
              const isSorted = column.getIsSorted();
              if (isSorted === 'asc') {
                column.toggleSorting(true);
              } else if (isSorted === 'desc') {
                column.clearSorting();
              } else {
                column.toggleSorting(false);
              }
            }}
          >
            Task
            {column.getIsSorted() === 'asc' && <ArrowUp className="w-4 h-4 ml-2" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="w-4 h-4 ml-2" />}
            {!column.getIsSorted() && <ChevronsUpDown className="w-4 h-4 ml-2 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => <div className="flex items-center pl-4 size-full">{row.getValue('title')}</div>,
      },
      {
        accessorKey: 'description',
        size: 350,
        header: ({ column }) => (
          <Button
            variant="ghost" disabled={disabled}
            className="flex items-center justify-between w-full"
            onClick={() => {
              const isSorted = column.getIsSorted();
              if (isSorted === 'asc') {
                column.toggleSorting(true);
              } else if (isSorted === 'desc') {
                column.clearSorting();
              } else {
                column.toggleSorting(false);
              }
            }}
          >
            Deskripsi
            {column.getIsSorted() === 'asc' && <ArrowUp className="w-4 h-4 ml-2" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="w-4 h-4 ml-2" />}
            {!column.getIsSorted() && <ChevronsUpDown className="w-4 h-4 ml-2 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => <div className="flex items-center pl-4 size-full">{row.getValue('description')}</div>,
      },
      {
        accessorKey: 'deadline',
        size: 100,
        header: ({ column }) => (
          <Button
            variant="ghost" disabled={disabled}
            className="flex items-center justify-between w-full"
            onClick={() => {
              const isSorted = column.getIsSorted();
              if (isSorted === 'asc') {
                column.toggleSorting(true);
              } else if (isSorted === 'desc') {
                column.clearSorting();
              } else {
                column.toggleSorting(false);
              }
            }}
          >
            Deadline
            {column.getIsSorted() === 'asc' && <ArrowUp className="w-4 h-4 ml-2" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="w-4 h-4 ml-2" />}
            {!column.getIsSorted() && <ChevronsUpDown className="w-4 h-4 ml-2 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => <div className="flex items-center pl-4 size-full">{row.getValue('deadline')}</div>,
      },
      {
        accessorKey: 'status',
        size: 100,
        header: ({ column }) => (
          <Button
            variant="ghost" disabled={disabled}
            className="flex items-center justify-between w-full"
            onClick={() => {
              const isSorted = column.getIsSorted();
              if (isSorted === 'asc') {
                column.toggleSorting(true);
              } else if (isSorted === 'desc') {
                column.clearSorting();
              } else {
                column.toggleSorting(false);
              }
            }}
          >
            Status
            {column.getIsSorted() === 'asc' && <ArrowUp className="w-4 h-4 ml-2" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="w-4 h-4 ml-2" />}
            {!column.getIsSorted() && <ChevronsUpDown className="w-4 h-4 ml-2 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center pl-4 size-full">
            {row.getValue('status') === TaskStatus.Pending && (
              <Badge variant="secondary" className="text-yellow-900 bg-yellow-500 bg-opacity-10 dark:text-yellow-50">
                Pending
              </Badge>
            )}
            {row.getValue('status') === TaskStatus.InProgress && (
              <Badge variant="secondary" className="text-sky-900 bg-sky-500 bg-opacity-10 dark:text-sky-50">
                In Progress
              </Badge>
            )}
            {row.getValue('status') === TaskStatus.Completed && (
              <Badge variant="secondary" className="text-green-900 bg-green-500 bg-opacity-10 dark:text-green-50">
                Completed
              </Badge>
            )}
          </div>
        ),
      },
      {
        id: 'actions',
        size: 30,
        cell: ({ row }) => (
          <div className="flex items-center justify-center w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onRowChangeStatus(row.original, TaskStatus.Pending)} className="cursor-pointer">
                  <span>Ubah ke &lsquo;Pending&lsquo;</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRowChangeStatus(row.original, TaskStatus.InProgress)} className="cursor-pointer">
                  <span>Ubah ke &lsquo;In Progress&lsquo;</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRowChangeStatus(row.original, TaskStatus.Completed)} className="cursor-pointer">
                  <span>Ubah ke &lsquo;Completed&lsquo;</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRowEdit(row.original)} className="cursor-pointer">
                  <span>Edit Task</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onRowDelete(row.original)} className="cursor-pointer">
                  <span>Hapus Task</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [onRowDelete, onRowChangeStatus, onRowEdit, disabled]
  );

  return columns;
};

export default useTaskColumns;
