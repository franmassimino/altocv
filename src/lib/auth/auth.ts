import { auth } from './index'
import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';

/**
 * Get the current session in Server Components and Server Actions
 * Returns the session if authenticated, null otherwise
 */
export async function getServerSession() {
  return await auth();
}

/**
 * Require authentication in Server Components and Server Actions
 * Throws an error if the user is not authenticated
 * @throws Error if user is not authenticated
 */
export async function requireAuth() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('Unauthorized: Authentication required');
  }

  return session;
}

/**
 * Require authentication and redirect to sign-in page if not authenticated
 * Use this in page components to protect routes
 */
export async function requireAuthOrRedirect() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  return session;
}

/**
 * Get the authenticated user's ID
 * Throws an error if not authenticated
 */
export async function getAuthenticatedUserId(): Promise<string> {
  const session = await requireAuth();
  return session.user.id;
}

/**
 * Type guard to check if a session exists and is valid
 */
export function isAuthenticated(
  session: Session | null
): session is Session {
  return !!session && !!session.user;
}
