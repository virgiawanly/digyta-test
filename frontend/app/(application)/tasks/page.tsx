import PageBreadcrumb, { PageBreadcrumbItem } from '@/components/shared/breadcrumbs/page-breadcrumb';
import TaskListTable from './_components/task-list-table';

const breadcrumbItems: PageBreadcrumbItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Task Management', url: '/tasks' },
  { name: 'Task List', url: '/tasks', isActive: true },
];

export default function TasksPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-between w-full pb-4 md:items-center md:flex-row">
        <div className="flex-1">
          <h3 className="font-medium">Task List</h3>
        </div>
        <div className="w-fit">
          <PageBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="w-full">
        <div className="grid gap-5">
          {/* Table */}
          <TaskListTable />
        </div>
      </div>
    </div>
  );
}
