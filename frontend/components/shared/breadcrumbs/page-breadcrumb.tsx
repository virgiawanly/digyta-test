import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import React from 'react';

export interface PageBreadcrumbItem {
  name: string;
  url?: string;
  isActive?: boolean;
}

export interface PageBreadcrumbProps {
  items: PageBreadcrumbItem[];
}

const PageBreadcrumb = (props: PageBreadcrumbProps) => {
  const { items } = props;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          if (item.isActive) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                </BreadcrumbItem>
                {index < items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.url ?? '#'}>{item.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
