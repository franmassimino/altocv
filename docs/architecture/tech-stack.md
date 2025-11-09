# Tech Stack

This is the **definitive technology selection** for the entire AltoCV project. All development must use these exact versions and tools.

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Frontend Language** | TypeScript | 5.3+ | Type-safe frontend development | Strict mode enforced, catches 70%+ bugs at compile-time, PRD requirement (NFR5) |
| **Frontend Framework** | Next.js | 15.0+ | React framework with App Router | Server Components + Server Actions eliminate API boilerplate, RSC for generative UI, PRD explicit requirement |
| **UI Component Library** | shadcn/ui | Latest | Pre-built accessible components | PRD specifies "90% of UI from shadcn/ui", headless components with Radix UI primitives, customizable with Tailwind |
| **State Management** | Zustand | 4.4+ | Client-side state (CV editor) | Lightweight (1KB), no boilerplate vs Redux, perfect for CV editor state + undo/redo stack, PRD requirement |
| **Server State** | TanStack Query | 5.0+ | Server state caching/sync | Auto-caching, background refetching, optimistic updates for non-Server-Action queries, PRD specifies for server state |
| **Backend Language** | TypeScript | 5.3+ | Type-safe backend development | Same language as frontend, shared types, strict mode enforced |
| **Backend Framework** | Next.js App Router | 15.0+ | Serverless functions + Server Actions | Collocated with frontend, Server Actions for mutations, API routes for webhooks, built-in on Vercel |
| **API Style** | Server Actions + REST (hybrid) | N/A | Type-safe mutations + webhook endpoints | Server Actions for internal ops (95%), REST for Stripe webhooks (5%), eliminates OpenAPI overhead for internal APIs |
| **Database** | PostgreSQL (Neon) | 15+ | Relational primary database | Serverless (scale-to-zero), $0-19/month, Prisma ORM support, ACID transactions for credit system, PRD requirement |
| **ORM** | Prisma | 5.7+ | Type-safe database access | Auto-generated types, migrations, ideal for serverless, PRD mentions Prisma explicitly |
| **Cache** | Upstash Redis | 7.0+ | Session storage + AI response cache | Serverless (pay-per-request), $0-10/month, sub-10ms latency, REST API for edge compatibility |
| **Vector Database** | Supabase (pgvector) | Latest | Job matching embeddings | Free pgvector extension on Postgres, cosine similarity for job matching (PRD requirement FR17) |
| **File Storage** | Vercel Blob | N/A | Exported PDFs + uploads | Integrated with Vercel, signed URLs, 7-day expiry for free tier, PRD specifies (NFR10) |
| **Authentication** | NextAuth.js | 5.0 (beta) | Google OAuth only | PRD requirement (FR1 modified - Google OAuth only, no email), v5 for Next.js 15 App Router |
| **Frontend Testing** | Vitest + Testing Library | Latest | Component + integration tests | Faster than Jest, native ESM support, React Testing Library for user-centric tests |
| **Backend Testing** | Vitest | Latest | Server Action + service tests | Same tooling as frontend, fast, TypeScript-first |
| **E2E Testing** | Playwright | 1.40+ | Critical user flows | Cross-browser, auto-wait, video recording, PRD mentions for smoke tests |
| **Build Tool** | Next.js CLI | 15.0+ | TypeScript compilation + bundling | Built into Next.js, zero config |
| **Bundler** | Turbopack (Next.js 15) | N/A | Fast dev server + production builds | Next.js 15 default, 700x faster than Webpack for large apps |
| **CSS Framework** | Tailwind CSS | 3.4+ | Utility-first styling | PRD requirement, rapid prototyping, purges unused styles, integrates with shadcn/ui |
| **IaC Tool** | None (Vercel platform) | N/A | Infrastructure managed by Vercel | Zero IaC for MVP, Vercel handles all infra, can add Terraform later if migrating off Vercel |
| **CI/CD** | Vercel Git Integration | N/A | Auto-deploy on git push | Built-in, preview deployments, zero config, PRD specifies automatic deployments (NFR11) |
| **Monitoring** | Sentry | Latest | Error tracking + performance | Source maps for readable traces, user context from NextAuth, PRD requirement (NFR9) |
| **Analytics** | PostHog | Latest | Product analytics + feature flags | Self-serve analytics, session recordings, A/B testing, PRD requirement (NFR9) |
| **Logging** | Vercel Logs | N/A | Serverless function logs | Built-in real-time logs, structured JSON, retention for debugging |
| **AI SDK** | Vercel AI SDK | 3.0+ | AI integration (OpenAI, Anthropic) | Streaming, tool calling, generative UI (streamUI), multi-provider routing, PRD critical requirement |
| **AI Providers** | OpenAI + Anthropic | Latest | LLM inference | GPT-4o (complex), GPT-4o-mini (simple), Claude 3.5 Haiku (formatting), model routing per PRD (FR5) |
| **Embeddings** | OpenAI text-embedding-3-small | Latest | Vector embeddings for job matching | 1536 dimensions, $0.02/1M tokens, PRD requirement (FR17) |
| **Payments** | Stripe | Latest | Subscriptions + credit purchases | Customer Portal, Checkout, Webhooks, PRD requirement (FR15-16) |
| **Email** | ~~Removed~~ | - | N/A | **Removed - Google OAuth only, no email needed** |
| **Background Jobs** | Trigger.dev | 3.0+ | PDF generation, ATS analysis | Serverless jobs, retries, observability, avoids Vercel 10s timeout, PRD architecture assumption |
| **PDF Generation** | @react-pdf/renderer | 3.1+ | ATS-friendly PDF export | React components to PDF, server-side rendering, PRD requirement (FR14) |
| **PDF Parsing** | pdf-parse + GPT-4 Vision | Latest | Import existing CVs | Extract text + OCR for complex layouts, PRD requirement (FR9) |
| **Validation** | Zod | 3.22+ | Runtime schema validation | Type inference, parse API inputs, PRD requirement (NFR5) |
| **Code Quality** | ESLint + Prettier | Latest | Linting + formatting | Next.js preset, auto-fix on save, consistent code style |
| **Animation** | Framer Motion | 11.0+ | Design panel animations | Spring physics, gesture support, PRD mentions for design panel |
| **Date Handling** | date-fns | 3.0+ | Date formatting + manipulation | Lightweight, tree-shakeable, no moment.js bloat |
| **HTTP Client** | Fetch API (native) | N/A | API calls (external integrations) | Built into Next.js, no Axios needed, Server Actions replace most HTTP |

---
