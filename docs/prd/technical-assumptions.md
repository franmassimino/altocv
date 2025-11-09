# Technical Assumptions

## Repository Structure: Monorepo

**Structure**: Single Next.js monorepo with clear separation of concerns
```
altocv2/
├── app/              # Next.js 15 App Router pages
├── components/       # React components (ui, cv-editor, chat, design-panel)
├── lib/              # Utilities, DB client, AI helpers
├── server/           # Server-only code (actions, API)
├── prisma/           # DB schema, migrations
└── public/           # Static assets
```

**Rationale**: For a 3-month solo project, monorepo eliminates coordination overhead of multiple repositories while maintaining clear module boundaries. All code in one place simplifies deployment and dependency management.

## Service Architecture

**Architecture**: Edge-first serverless monolith within Next.js App Router

**Key Services**:
- **Edge Middleware**: Auth verification (NextAuth), rate limiting, credit checks
- **Server Components**: Initial page loads with data fetching
- **Server Actions**: Mutations (CV updates, credit deductions, AI operations)
- **API Routes**: Webhooks (Stripe), external integrations (job scraping)
- **Background Jobs**: Heavy operations (PDF generation, ATS fine-tuning) via Trigger.dev or Inngest

**Design Panel Rendering**: Client-side React with CSS custom properties for real-time preview updates - no server round-trip for design variable changes

**Rationale**: Serverless monolith is simplest architecture for MVP while supporting 1000+ users. Edge middleware ensures fast auth/rate-limiting globally. Separating heavy operations (PDF gen, fine-tuning) to background jobs prevents timeout issues on Vercel's 10s function limit.

## Testing Requirements

**Testing Strategy**: Pragmatic testing focused on critical paths, not full pyramid

**Must Have**:
- **Type Safety**: TypeScript strict mode + Zod schemas catch many bugs at compile time
- **Manual Testing**: You + 5-10 beta testers for real-world validation
- **Stripe Webhook Testing**: Use Stripe CLI for local webhook testing to ensure payment reliability

**Should Have** (if time permits):
- **Integration Tests**: Critical flows (auth, credit deduction, AI chat) using Playwright or Vitest
- **E2E Smoke Tests**: Can user sign up → create CV → export PDF?

**Won't Have** (out of scope for MVP):
- Unit tests for every component (time vs value trade-off)
- Full testing pyramid with 80%+ coverage
- Performance testing or load testing

**Rationale**: For a 3-month portfolio project, investing heavily in automated tests would consume 20-30% of timeline. TypeScript + manual testing + webhook validation cover the highest-risk areas. Can add tests post-MVP if project continues.

## Additional Technical Assumptions and Requests

**Frontend Stack**:
- **Framework**: Next.js 15 (App Router, React Server Components)
- **Styling**: Tailwind CSS + shadcn/ui + CSS Custom Properties for design variables
- **State Management**: Zustand for CV editor state, TanStack Query for server state
- **Design Panel**: Custom React components inspired by Figma UI with smooth animations (Framer Motion)
- **Type Safety**: TypeScript strict mode + Zod for runtime validation

**AI SDK Integration (CRITICAL FOCUS)**:
- **Core SDK**: Vercel AI SDK (ai package) as primary AI interaction layer
- **Streaming UI**: Use `useChat` hook for conversational interface with streaming responses
- **AI SDK UI Components**: Leverage `ai/rsc` (React Server Components integration) for server-side AI operations
- **Generative UI Features** (High Priority):
  - **AI-Generated CV Sections**: Use AI SDK's `streamUI` to generate entire CV sections as React components
  - **Smart Suggestions Widget**: Render interactive suggestion cards directly from AI responses (not just text)
  - **Dynamic Form Generation**: AI analyzes job posting and generates custom input fields for relevant experience
  - **Template Recommendations**: AI returns visual template previews as components based on user's industry/role
  - **ATS Fix UI**: Instead of text suggestions, AI generates interactive "Apply Fix" components inline
- **useChat Hook**: Primary hook for chat interface with automatic message handling, streaming, and state management
- **useCompletion Hook**: For single-shot AI completions (e.g., "rewrite this bullet point")
- **useAssistant Hook**: For persistent assistant conversations with tool calling capabilities
- **Tool Calling**: AI SDK's function calling for structured actions (update CV section, change template, run ATS analysis)
- **Message Annotations**: Use AI SDK's annotation system to attach metadata (credit cost, processing time) to messages

**Specific AI SDK Features to Explore**:
1. **Generative UI with RSC**: Most exciting feature - AI returns React components, not just text
   - Example: "Analyze this job posting" → AI returns interactive comparison table component
   - Example: "Suggest improvements" → AI returns accordion of actionable fixes with Apply buttons
2. **Multi-step Tool Calling**: Chain multiple AI operations (analyze → suggest → apply)
3. **Streaming Object Generation**: Use `streamObject` for structured CV section generation with real-time updates
4. **AI SDK Core Functions**: `generateText`, `generateObject`, `streamText`, `streamObject` for different use cases

**Backend & Data**:
- **API Layer**: Next.js Server Actions (primary) + API Routes (webhooks)
- **Auth**: NextAuth.js v5 with Google OAuth + Email magic links
- **Database**: PostgreSQL via Neon (serverless), Prisma ORM
- **Caching**: Upstash Redis for session storage, AI response caching
- **Vector Storage**: Supabase pgvector for embeddings (job matching)
- **File Storage**: Vercel Blob for exported PDFs

**AI/ML Stack**:
- **AI SDK Providers**:
  - OpenAI provider (GPT-4o, GPT-4o-mini) via AI SDK
  - Anthropic provider (Claude 3.5 Haiku, Sonnet) via AI SDK
  - Auto-switching between providers based on task type and cost
- **Embeddings**: OpenAI text-embedding-3-small for job matching (via AI SDK)
- **Fine-tuning**: GPT-4o-mini fine-tuning for ATS analysis (if budget allows)
- **SDK Features**: Streaming, tool calling, structured outputs, generative UI

**Infrastructure & Services**:
- **Hosting**: Vercel (Edge + Serverless Functions)
- **Background Jobs**: Trigger.dev or Inngest for PDF generation, ATS analysis
- **Email**: Resend for transactional emails (magic links, receipts)
- **Payments**: Stripe Checkout + Customer Portal + Webhooks
- **Monitoring**: Sentry (errors), PostHog (analytics, feature flags)

**Design System & CV Rendering**:
- **Component Library**: shadcn/ui for 90% of UI components
- **Design Panel Controls**: Custom Figma-inspired components (color picker, sliders, font selector)
- **CV Preview**: React components with CSS custom properties for live design updates
- **PDF Export**: @react-pdf/renderer on backend (serverless function) for ATS-compatible PDFs
- **Template Variables**: JSON schema defining customizable properties per template (colors, fonts, spacing, layout)

**Development & Deployment**:
- **Version Control**: Git + GitHub
- **CI/CD**: Vercel automatic deployments on push to main
- **Environment Management**: Vercel environment variables for secrets
- **Database Migrations**: Prisma Migrate for schema versioning

**Performance Optimizations**:
- **AI Cost Control**: Context window limiting (last 10 messages), response caching (Redis), model routing (cheap models for simple tasks)
- **Design Panel Performance**: Debounced updates (300ms) on slider changes, CSS custom properties for instant preview without re-render
- **Auto-save**: Debounced saves every 3 seconds to minimize DB writes
- **Image Optimization**: Next.js Image component for any user uploads or template previews
- **AI SDK Streaming**: Reduce perceived latency with streaming responses and progressive rendering

**Security & Compliance**:
- **Auth Security**: Middleware-protected routes, CSRF tokens on Server Actions
- **Credit System**: Transactional DB operations to prevent race conditions
- **Rate Limiting**: Edge middleware with Upstash Rate Limit
- **Data Privacy**: User data scoped by auth, no cross-user data leakage
- **Payment Security**: Stripe handles all payment data (PCI compliant), webhook signature verification
- **AI SDK Security**: Server-side API key management, no client exposure

**Assumptions**:
- Vercel free tier sufficient for development, Pro plan ($20/month) acceptable for production
- OpenAI API costs stay under $40/month with proper caching and model routing
- Serverless cold starts acceptable for portfolio project (no dedicated instances needed)
- Design panel variables use CSS custom properties (not full CSS-in-JS) to keep rendering performant
- Templates are React components with prop-based customization (not user-uploaded HTML/CSS)
- **AI SDK's generative UI features work well with Next.js 15 App Router and RSC**
- **Streaming UI provides better UX than traditional request/response for AI interactions**

---
