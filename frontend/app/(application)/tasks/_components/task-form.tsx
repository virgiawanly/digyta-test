import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Task, TaskStatus } from '@/types/tasks';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const taskStatuses: [string, ...string[]] = Object.values(TaskStatus) as [string, ...string[]];

export const taskFormSchema = z.object({
  title: z.string().min(1, { message: 'Judul harus diisi' }).max(100, { message: 'Judul tidak boleh lebih dari 100 karakter' }),
  description: z.string(),
  deadline: z.any().nullable(),
  status: z.enum(taskStatuses, { required_error: 'Status harus diisi' }),
});

export const useTaskForm = () => {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      deadline: null,
      status: TaskStatus.Pending,
    },
  });

  return form;
};

export interface TaskFormProps {
  form: UseFormReturn<any>;
  task?: Task | null;
}

const TaskForm = (props: TaskFormProps) => {
  const { form } = props;

  return (
    <div className="grid gap-5">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Judul Task</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan judul task" {...field} disabled={form.formState.isSubmitting} onKeyDown={(e) => e.key === 'Enter'} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Masukkan deskripsi" {...field} disabled={form.formState.isSubmitting} onKeyDown={(e) => e.key === 'Enter'} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="deadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block">Deadline</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                    {field.value ? format(field.value, 'PPP') : <span>Pilih tanggal</span>}
                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => field.onChange(date)} // Ensure date is passed
                  disabled={(date) => date < new Date('1900-01-01')}
                  initialFocus
                />
                <div className="flex items-center justify-end p-4 pt-0">
                  <Button type="button" variant="outline" size="sm" onClick={() => field.onChange(null)}>
                    Clear
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={TaskStatus.Pending}>Pending</SelectItem>
                <SelectItem value={TaskStatus.InProgress}>In Progress</SelectItem>
                <SelectItem value={TaskStatus.Completed}>Completed</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TaskForm;
