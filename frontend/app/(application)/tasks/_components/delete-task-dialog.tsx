import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import httpClient from '@/lib/http';
import { FormattedApiError } from '@/types/errors';
import { DialogClose } from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export interface DeleteTaskDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedIds: number[] | string[];
}

const DeleteTaskDialog = (props: DeleteTaskDialogProps) => {
  const { isOpen, setIsOpen, selectedIds } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = () => {
    if (!selectedIds.length) {
      return;
    }

    setIsSubmitting(true);
    httpClient
      .post('tasks/batch-delete', { ids: selectedIds }, { params: { _method: 'DELETE' } })
      .then((res) => {
        toast.success(res.data.message);
        window.dispatchEvent(new CustomEvent('task-deleted'));
        setIsOpen(false);
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[432px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription className="py-3">
            Anda yakin ingin menghapus data ini? Data yang telah dihapus tidak dapat dikembalikan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Batal
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" disabled={isSubmitting} onClick={handleDelete}>
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskDialog;
