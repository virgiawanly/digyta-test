import React from 'react';
import { Toaster } from 'sonner';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  );
};

export default AuthLayout;
