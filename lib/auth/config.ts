import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { db } from '@/lib/db';

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.error('[NextAuth] signIn callback: No email provided', {
          userId: user.id,
          accountProvider: account?.provider,
        });
        return false;
      }

      try {
        console.log('[NextAuth] signIn callback: Processing sign-in', {
          email: user.email,
          provider: account?.provider,
          hasProfile: !!profile,
        });

        // Check if user exists
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          console.log('[NextAuth] signIn callback: Updating existing user', {
            userId: existingUser.id,
            email: user.email,
          });
          // Update existing user's name and image if changed
          await db.user.update({
            where: { email: user.email },
            data: {
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
            },
          });
        } else {
          console.log('[NextAuth] signIn callback: Creating new user', {
            email: user.email,
            name: user.name,
          });
          // Create new user with initial credits
          await db.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              credits: 50, // Initial credit grant
              tier: 'FREE',
            },
          });
          console.log('[NextAuth] signIn callback: New user created successfully', {
            email: user.email,
          });
        }

        return true;
      } catch (error) {
        console.error('[NextAuth] Error in signIn callback:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          email: user.email,
          provider: account?.provider,
        });
        return false;
      }
    },
    async jwt({ token, user }) {
      // Add user ID to token on sign in
      if (user) {
        const dbUser = await db.user.findUnique({
          where: { email: user.email! },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            credits: true,
            tier: true,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.credits = dbUser.credits;
          token.tier = dbUser.tier;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add custom fields to session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.credits = token.credits as number;
        session.user.tier = token.tier as string;
      }

      return session;
    },
  },
};
