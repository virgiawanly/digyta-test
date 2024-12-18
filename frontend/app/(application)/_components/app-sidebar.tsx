'use client';

import { File, Github, LayoutList, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/app/(application)/_components/nav-main';
import { NavSecondary } from '@/app/(application)/_components/nav-secondary';
import { NavUser } from '@/app/(application)/_components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import apiConfig from '@/config/api';
import { User } from '@/types/users';
import { useEffect, useState } from 'react';

const data = {
  navMain: [
    {
      title: 'Tasks',
      url: '#',
      icon: SquareTerminal,
      items: [
        {
          title: 'Task List',
          url: '/tasks',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Github',
      url: 'https://github.com/virgiawanly/digyta-test',
      icon: Github,
    },
    {
      title: 'Documentation',
      url: '#',
      icon: File,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutList className="size-4" />
                </div>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-semibold truncate">DIGYTA</span>
                  <span className="text-xs truncate">Task Management</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{!!user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
