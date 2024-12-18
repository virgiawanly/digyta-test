export interface Task {
  id: number;
  title: string;
  description: string | null;
  deadline: string | null;
  status: TaskStatus | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}
