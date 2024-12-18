import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from './_components/app-sidebar';
import AppTopbar from './_components/app-topbar';

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
          <AppTopbar />
          <div className="flex flex-col flex-1 gap-4 p-4 md:p-5">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default ApplicationLayout;
