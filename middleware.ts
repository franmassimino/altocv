import { auth } from '@/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/editor');

  if (isProtectedRoute && !isLoggedIn) {
    const newUrl = new URL('/login', req.nextUrl.origin);
    newUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return Response.redirect(newUrl);
  }

  return undefined;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
