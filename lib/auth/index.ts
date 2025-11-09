import NextAuth from 'next-auth';
import { authConfig } from './config';

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Re-export auth utilities
export {
  getServerSession,
  requireAuth,
  requireAuthOrRedirect,
  getAuthenticatedUserId,
  isAuthenticated,
} from './auth';
