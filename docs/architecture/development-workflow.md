# Development Workflow

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm prisma generate
pnpm prisma migrate dev
```

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm lint             # Run linting
pnpm test             # Run tests
pnpm prisma studio    # Open Prisma Studio
```

## Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...

# Auth
AUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# AI
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# Stripe
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Redis
UPSTASH_REDIS_URL=...

# Supabase
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# Vercel Blob
BLOB_READ_WRITE_TOKEN=...

# Trigger.dev
TRIGGER_API_KEY=...

# Monitoring
SENTRY_DSN=...
NEXT_PUBLIC_POSTHOG_KEY=...
```

---
