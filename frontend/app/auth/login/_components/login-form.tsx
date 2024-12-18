'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import apiConfig from '@/config/api';
import publicHttpClient from '@/lib/http-public';
import { cn } from '@/lib/utils';
import { FormattedApiError } from '@/types/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email harus diisi' }).email({ message: 'Email tidak valid' }),
  password: z.string().min(1, { message: 'Password harus diisi' }),
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = (formData: any) => {
    setIsLoading(true);

    publicHttpClient
      .post('/auth/login', formData)
      .then((res) => {
        const { user, token } = res.data.data;

        // Save token as cookie, so it will be sent in every request
        setCookie(apiConfig.apiTokenIdentifier, token);

        // Save user to local storage, for future use
        localStorage.setItem('user', JSON.stringify(user));

        toast.success('Login berhasil');
        router.push('/');
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message ?? 'An unexpected error occurred');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Silahkan masukan username dan password Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-2">
                  <Button disabled={isLoading} color="primary" type="submit" className="w-full">
                    {isLoading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
                    Login
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <p className="text-sm text-gray-700 dark:text-gray-100">
                  Belum punya akun?{' '}
                  <Link href="/auth/register" className="font-medium underline">
                    Daftar
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
