import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware runs on the server. It cannot access `localStorage` or React hooks.
// Check for an authentication cookie (e.g. `auth`) and redirect to `/login`
// when missing. If your app currently stores auth in `localStorage`, update
// your login flow to set a cookie (or use a server-side session) so middleware
// can perform redirects.

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const url = nextUrl.clone();

  // Read the `auth` cookie. Adjust the cookie name if you use a different key.
  const auth = cookies.get('auth')?.value ?? null;

  // Debug logging (appears in the server console)
  // eslint-disable-next-line no-console
  console.log('Middleware executed for:', request.url);
  // eslint-disable-next-line no-console
  console.log('Auth cookie value:', auth);

  // if (!auth) {
  //   // Redirect unauthenticated users to /login
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  // Protect the dashboard and any nested routes under it
  matcher: ['/dashboard', '/dashboard/:path*'],
};
