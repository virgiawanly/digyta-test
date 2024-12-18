import { ThemeToggle } from '@/components/shared/toggles/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from './_components/app-sidebar';

const ApplicationLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center justify-between gap-2 py-3 pr-4 border-b">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4 mr-2" />
              <div className="flex flex-col">
                <h2 className="max-w-full text-sm font-bold uppercase line-clamp-1">Task Management System</h2>
                <p className="text-xs text-gray-600 dark:text-gray-300">Halo, User Name!</p>
              </div>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-col flex-1 gap-4 p-4 md:p-5">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default ApplicationLayout;
