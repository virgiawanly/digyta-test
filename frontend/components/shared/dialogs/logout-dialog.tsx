'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import apiConfig from '@/config/api';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export interface LogoutDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const LogoutDialog = (props: LogoutDialogProps) => {
  const { isOpen, setIsOpen } = props;
  const router = useRouter();

  const logout = () => {
    // Remove access token cookie
    deleteCookie(apiConfig.apiTokenIdentifier);
    // Remove user profile from local storage
    localStorage.removeItem(apiConfig.userProfileIdentifier);
    // Redirect to login page
    router.push('/auth/login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Logout</DialogTitle>
          <DialogDescription className="py-3">Anda yakin ingin keluar dari aplikasi?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Batal
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" onClick={() => logout()}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
