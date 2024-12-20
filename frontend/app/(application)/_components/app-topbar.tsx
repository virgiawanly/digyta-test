'use client';

import LogoutDialog from '@/components/shared/dialogs/logout-dialog';
import { ThemeToggle } from '@/components/shared/toggles/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import apiConfig from '@/config/api';
import { User } from '@/types/users';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

const AppTopbar = () => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (window) {
      const user = window.localStorage.getItem(apiConfig.userProfileIdentifier);
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, []);

  return (
    <>
      <header className="flex items-center justify-between gap-2 py-3 pr-4 border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4 mr-2" />
          <div className="flex flex-col">
            <h2 className="max-w-full text-sm font-bold uppercase line-clamp-1">Task Management System</h2>
            {user && <p className="text-xs text-gray-600 dark:text-gray-300 max-sm:hidden line-clamp-1">Halo, {user.name}!</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggler */}
          <ThemeToggle />

          {/* Logout Button */}
          <Button variant="outline" onClick={() => setIsLogoutDialogOpen(true)}>
            <LogOut />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Logout Dialog */}
      <LogoutDialog isOpen={isLogoutDialogOpen} setIsOpen={setIsLogoutDialogOpen} />
    </>
  );
};

export default AppTopbar;
