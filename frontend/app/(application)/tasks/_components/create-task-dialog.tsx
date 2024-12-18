import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import httpClient from '@/lib/http';
import { FormattedApiError } from '@/types/errors';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import TaskForm, { useTaskForm } from './task-form';

export interface CreateTaskDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateTaskDialog = (props: CreateTaskDialogProps) => {
  const { isOpen, setIsOpen } = props;
  const createTaskForm = useTaskForm();

  const handleSubmit = async (formData: any) => {
    const payload = { ...formData, deadline: formData.deadline ? format(formData.deadline, 'yyyy-MM-dd') : null };
    await httpClient
      .post('/tasks', payload)
      .then((res) => {
        toast.success(res.data.message);
        createTaskForm.reset();
        window.dispatchEvent(new CustomEvent('task-created'));
        setIsOpen(false);
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[576px]">
        <Form {...createTaskForm}>
          <form onSubmit={createTaskForm.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Tambah Task</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="pt-4 pb-8">
              <TaskForm form={createTaskForm} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Batal</Button>
              </DialogClose>
              <Button type="submit" onClick={createTaskForm.handleSubmit(handleSubmit)} disabled={createTaskForm.formState.isSubmitting}>
                {createTaskForm.formState.isSubmitting && <Loader2 className="animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
