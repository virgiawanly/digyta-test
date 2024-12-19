import { LoginForm } from './_components/login-form';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10 bg-gray-50 dark:bg-sidebar">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
