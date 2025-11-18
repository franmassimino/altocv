import { auth } from '@/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Define protected routes
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/editor');

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !isLoggedIn) {
    const newUrl = new URL('/login', req.nextUrl.origin);
    newUrl.searchParams.set('callbackUrl', pathname);
    return Response.redirect(newUrl);
  }

  return undefined;
});

export const config = {
  runtime: 'nodejs', // Use Node.js runtime instead of Edge to avoid 1MB bundle limit
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
  ],
};
