# Epic 1: Foundation & Core Infrastructure

**Goal**: Establish the technical foundation for AltocV2 by setting up Next.js 15 project with authentication, database, CI/CD pipeline, and core data models. This epic delivers a deployed application with user registration, a basic dashboard, and verified infrastructure that supports future feature development.

## Story 1.1: Initialize Next.js 15 Project with TypeScript

As a **developer**,
I want **a properly configured Next.js 15 project with TypeScript, Tailwind CSS, and shadcn/ui**,
so that **I have a solid foundation for building the application with modern tooling**.

**Acceptance Criteria**:
1. Next.js 15 initialized with App Router and TypeScript strict mode enabled
2. Tailwind CSS configured with shadcn/ui installed and functioning
3. Project structure created with folders: `/app`, `/components`, `/lib`, `/server`, `/prisma`
4. ESLint and Prettier configured for code quality
5. Basic layout component renders successfully at root route
6. Development server runs without errors on `npm run dev`

## Story 1.2: Setup PostgreSQL Database with Prisma

As a **developer**,
I want **a PostgreSQL database configured with Prisma ORM and initial schema**,
so that **I can store user data, CVs, and credit information with type safety**.

**Acceptance Criteria**:
1. Neon PostgreSQL database created and connection string configured
2. Prisma installed and `prisma/schema.prisma` initialized
3. Initial schema defined with `User`, `CV`, and `CreditTransaction` models
4. Prisma Client generated and accessible from `/lib/db.ts`
5. First migration created and applied successfully
6. Can perform basic CRUD operations in development (verified with test script)

## Story 1.3: Implement Authentication with NextAuth v5

As a **user**,
I want **to register and login using Google OAuth or email magic links**,
so that **I can securely access my account and CVs**.

**Acceptance Criteria**:
1. NextAuth v5 configured with Google OAuth provider
2. Email provider configured with Resend for magic link authentication
3. Session management working with JWT strategy
4. Protected routes redirect unauthenticated users to login page
5. User creation flow persists user data to database
6. Logout functionality clears session and redirects to home
7. Auth middleware protects `/dashboard` and `/editor` routes

## Story 1.4: Create User Dashboard with Basic Layout

As a **user**,
I want **a dashboard showing my profile and placeholder for my CVs**,
so that **I can verify authentication works and see where my CVs will appear**.

**Acceptance Criteria**:
1. Dashboard route (`/dashboard`) renders with user's name and email
2. Responsive layout with navigation header (logo, user menu, logout button)
3. Empty state message: "No CVs yet. Create your first CV!"
4. "Create New CV" button present (non-functional placeholder for now)
5. Dashboard only accessible to authenticated users
6. Displays loading state while checking authentication

## Story 1.5: Deploy to Vercel with Environment Configuration

As a **developer**,
I want **the application deployed to Vercel with proper environment variables**,
so that **I can demonstrate a working deployed app and test production infrastructure**.

**Acceptance Criteria**:
1. GitHub repository connected to Vercel project
2. Environment variables configured in Vercel (database URL, NextAuth secret, OAuth credentials)
3. Automatic deployments trigger on push to `main` branch
4. Production URL accessible and shows working login flow
5. Database migrations run automatically on deployment
6. Health check route (`/api/health`) returns 200 OK with database connection status

## Story 1.6: Setup Monitoring and Error Tracking

As a **developer**,
I want **Sentry error tracking and PostHog analytics integrated**,
so that **I can monitor application health and user behavior in production**.

**Acceptance Criteria**:
1. Sentry installed and configured with Next.js integration
2. Test error captured and visible in Sentry dashboard
3. PostHog initialized with basic page view tracking
4. Environment-specific configuration (disable in development, enable in production)
5. User identification integrated with auth system (privacy-safe)
6. Source maps configured for readable error stack traces

---
