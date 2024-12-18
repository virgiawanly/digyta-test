import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import apiConfig from './config/api';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(apiConfig.apiTokenIdentifier)?.value;

  const { pathname } = request.nextUrl;

  // Redirect to login if accessToken is missing and not already on the login page
  if (!accessToken && pathname !== '/auth/login' && pathname !== '/auth/register') {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from visiting the login or register page
  if (accessToken && (pathname === '/auth/login' || pathname === '/auth/register')) {
    const tasksUrl = new URL('/tasks', request.url);
    return NextResponse.redirect(tasksUrl);
  }

  // Redirect logged-in users visiting `/` to `/tasks`
  if (accessToken && pathname === '/') {
    const tasksUrl = new URL('/tasks', request.url);
    return NextResponse.redirect(tasksUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Define the paths to apply the middleware
export const config = {
  matcher: ['/', '/tasks/:path*', '/auth/login', '/auth/register', '/auth/:path*'],
};
