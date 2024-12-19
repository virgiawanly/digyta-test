import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import httpClient from '@/lib/http';
import { FormattedApiError } from '@/types/errors';
import { Task } from '@/types/tasks';
import { format, parse } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import TaskForm, { useTaskForm } from './task-form';

export interface EditTaskDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: Task | null;
}

const EditTaskDialog = (props: EditTaskDialogProps) => {
  const { isOpen, setIsOpen, task } = props;
  const editTaskForm = useTaskForm();

  const handleSubmit = async (formData: any) => {
    if (!task) {
      return;
    }

    const payload = { ...formData, deadline: formData.deadline ? format(formData.deadline, 'yyyy-MM-dd') : null };

    await httpClient
      .patch(`/tasks/${task.id}`, payload)
      .then((res) => {
        toast.success(res.data.message);
        editTaskForm.reset();
        window.dispatchEvent(new CustomEvent('task-updated'));
        setIsOpen(false);
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    editTaskForm.setValue('title', task?.title ?? '');
    editTaskForm.setValue('description', task?.description ?? '');
    editTaskForm.setValue('deadline', task?.deadline ? parse(task.deadline, 'yyyy-MM-dd', new Date()) : null);
    editTaskForm.setValue('status', task?.status ?? '');
  }, [task, editTaskForm]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[576px]">
        <Form {...editTaskForm}>
          <form onSubmit={editTaskForm.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="pt-4 pb-8">
              <TaskForm form={editTaskForm} task={task} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={editTaskForm.handleSubmit(handleSubmit)} disabled={editTaskForm.formState.isSubmitting}>
                {editTaskForm.formState.isSubmitting && <Loader2 className="animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
