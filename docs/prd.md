# AltocV2 Product Requirements Document (PRD)

**Version**: 1.0
**Date**: 2025-01-09
**Author**: Francisco
**Project Type**: Personal Portfolio Project

---

## Goals and Background Context

### Goals

Based on your Project Brief, here are the key desired outcomes for this PRD:

- **Deliver a functional CV creation and adaptation platform** that demonstrates modern full-stack capabilities (Next.js 15, AI integration, payments) within 12 weeks
- **Create a portfolio-worthy project** showcasing technical depth in AI/ML integration, conversational interfaces, and real-world problem solving
- **Build a tool you actually use** to create and adapt CVs, validated by 2-3 friends who can use it independently
- **Implement core differentiation features**: conversational AI editor, ATS analysis, and smart import from LinkedIn/PDF
- **Deploy to production** with clean code architecture, responsive design, and at least one functional template
- **Maintain operational simplicity** with <$50/month costs and low-touch maintenance post-launch

### Background Context

AltocV2 addresses a critical pain point in the modern job search: the fragmented, time-intensive process of creating and adapting CVs that pass Applicant Tracking Systems (ATS). Currently, 75% of CVs never reach human eyes due to automatic rejection, and professionals waste 15-20 hours per month manually adapting their CVs for different roles without knowing if they're using the right keywords or format.

Traditional CV builders offer pretty templates but no intelligence about content or ATS optimization. AI tools like ChatGPT require complex prompts and aren't integrated into the editing workflow. AltocV2 bridges this gap by combining conversational AI that edits in real-time, ATS analysis trained on real data, intelligent import from LinkedIn/PDFs, and industry-specialized templates. This is a 3-month portfolio project demonstrating competence in modern AI-powered SaaS development, with the dual benefit of creating a tool that solves a real problem you personally experience.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-09 | 1.0 | Initial PRD creation based on Project Brief | Francisco |

---

## Requirements

### Functional Requirements

**FR1:** The system shall provide Google OAuth and Email magic link authentication using NextAuth v5

**FR2:** The system shall implement a credit-based usage system with free tier (50 initial credits, 10/month refill) and Pro tier (500 credits/month with rollover)

**FR3:** The system shall deduct credits transactionally for operations: Create CV (5), Adapt CV (3), AI chat message (1), ATS analysis (10), Import (5), Export PDF (2)

**FR4:** The system shall provide an integrated chat interface with streaming AI responses that modify CVs in real-time

**FR5:** The system shall route AI requests to appropriate models: GPT-4o-mini for general conversation, GPT-4o for complex rewriting, Claude 3.5 Haiku for formatting

**FR6:** The system shall maintain conversational context with CV current state and last 10 messages for cost control

**FR7:** The system shall generate structured actions (JSON) from AI responses that apply optimistically to CV state with rollback capability

**FR8:** The system shall provide a fine-tuned ATS analyzer that identifies formatting issues, missing keywords, and structural problems with actionable feedback

**FR9:** The system shall parse PDF CVs using pdf-parse and GPT-4 Vision to extract structured data (contact info, experience, education, skills)

**FR10:** The system shall parse job postings (via URL or text) to extract required skills, keywords, job title, company, and responsibilities

**FR11:** The system shall provide a WYSIWYG CV editor with click-to-edit inline editing, drag-to-reorder sections, and auto-save every 3 seconds

**FR12:** The system shall support undo/redo functionality for all CV editing operations

**FR13:** The system shall provide at least three professional templates: Modern Tech (single column), Traditional Corporate (two column), and Creative (visual with color accents)

**FR14:** The system shall export CVs to ATS-friendly PDF format using @react-pdf/renderer on backend

**FR15:** The system shall integrate Stripe Checkout for subscriptions and Customer Portal for subscription management

**FR16:** The system shall offer three pricing tiers: Free ($0 - 50 credits, 10/month, 3 CVs max), Pro ($9.99/month - 500 credits, unlimited CVs), Credits Pack ($4.99 for 100 credits)

**FR17:** The system shall calculate job matching scores using vector embeddings (OpenAI text-embedding-3-small) with cosine similarity between CV sections and job descriptions

**FR18:** The system shall extract missing keywords from job descriptions and provide specific suggestions to improve match score

**FR19:** The system shall store all CVs with automatic versioning and timestamps

**FR20:** The system shall support creation of multiple CV versions with duplicate-and-adapt functionality

### Non-Functional Requirements

**NFR1:** The system shall maintain monthly operational costs under $50 for MVP phase with AI API costs between $20-40/month

**NFR2:** The system shall handle serverless cold starts with acceptable performance degradation (no hard SLA required for portfolio project)

**NFR3:** The system shall support modern browsers only (Chrome, Firefox, Safari, Edge - latest 2 versions)

**NFR4:** The system shall be responsive and functional on both desktop and mobile devices

**NFR5:** The system shall use TypeScript strict mode with Zod validation for type safety across the application

**NFR6:** The system shall implement idempotent webhook handling for all Stripe payment events

**NFR7:** The system shall prevent race conditions in credit deduction using transactional database operations

**NFR8:** The system shall implement edge middleware for authentication and rate limiting

**NFR9:** The system shall use Sentry for error monitoring and PostHog for analytics

**NFR10:** The system shall store exported PDFs in Vercel Blob Storage with signed URLs

**NFR11:** The system shall scale to support 1000+ users on Vercel serverless infrastructure

**NFR12:** The system shall target AI costs under $1 per active user per month

**NFR13:** The system shall limit conversational context window to last 10 messages to control costs

**NFR14:** The system shall implement auto-save with debouncing to minimize database writes

**NFR15:** The system shall maintain clean code architecture following Next.js 15 App Router best practices

---

## User Interface Design Goals

### Overall UX Vision

AltocV2 should feel like a **conversation with an expert career coach meets a professional design tool**, not a traditional form-filling experience. The interface combines three equal pillars: (1) conversational AI that modifies content in real-time, (2) elegant live preview that reflects changes instantly, and (3) visual design editor for fine-tuning aesthetics. Users should experience a "magic moment" when they see the AI modify their CV in real-time as they chat, then seamlessly switch to adjusting design variables like colors, fonts, and spacing with Figma-like elegance. The design prioritizes **speed, clarity, and creative control**: minimal clicks to value, instant feedback, and zero confusion about what's happening. The aesthetic is **modern, clean, and trustworthy** - this is a professional tool handling career-critical content.

### Key Interaction Paradigms

- **Three-panel workspace**: (1) AI chat sidebar, (2) live CV preview center canvas, (3) design panel for visual customization - toggleable to maximize space
- **Conversational-first with dual editing modes**: Primary workflow is chat for content, but users can click directly into CV for inline editing OR open design panel for visual variables
- **Real-time design feedback**: Changing a color variable instantly updates the live preview - no "apply" button needed
- **Optimistic updates with streaming**: CV changes appear instantly as AI responds or as design variables adjust
- **Auto-save as a feature, not a promise**: Visible "Saved 2s ago" indicator builds trust that work is never lost
- **Progressive disclosure**: Start simple (basic CV with chat), reveal complexity (design panel, ATS analysis, job matching) as user explores
- **One-click actions from AI suggestions**: "Add Python to Skills [Apply]" buttons for instant implementation
- **Template variables as design foundation**: Each template exposes customizable variables (primary color, accent color, font pairing, spacing density, section order)

### Core Screens and Views

**Landing/Marketing Page**: Hero explaining three-pillar value prop (AI + Live Preview + Design Control), demo video/GIF showing all three in action, pricing comparison, CTA to sign up

**Dashboard**: Gallery view of all user's CVs with thumbnails, match scores, last edited timestamp, quick actions (duplicate, export, delete)

**CV Editor (Main Screen - Three Pillars)**:
- Left: AI chat sidebar (collapsible)
- Center: Live CV preview canvas with zoom controls
- Right: Design panel with elegant controls for template variables (collapsible)
- Top toolbar: Template selector, export, settings, toggle panels

**Design Panel Components**:
- **Color Palette**: Visual color picker for primary, accent, text colors with presets
- **Typography**: Font pairing selector (headings + body), size scale adjustments
- **Spacing & Density**: Slider controls for margins, line-height, section gaps
- **Layout Options**: Section order drag-and-drop, column configuration
- **Template Presets**: One-click design presets ("Minimal", "Bold", "Corporate")

**Template Gallery**: Visual preview cards of available templates with "Use Template" action, each showing design customization potential

**ATS Analysis Results**: Score visualization (circular gauge), detailed issue list with severity indicators, one-click fix buttons

**Job Matching Screen**: Input for job posting URL/text, match score display, missing keywords highlighted, improvement suggestions

**Settings/Profile**: Credit balance prominently displayed, subscription management, account settings

**Payment/Upgrade Modal**: Clear tier comparison, Stripe Checkout embed for seamless payment

### Accessibility: WCAG AA

AltocV2 will target **WCAG 2.1 Level AA compliance** to ensure professional accessibility without over-engineering for a portfolio MVP. This includes: keyboard navigation for all interactive elements, sufficient color contrast ratios (4.5:1 for text), screen reader compatible labels and ARIA attributes, focus indicators on all focusable elements, responsive text sizing, and accessible color picker with contrast validation.

**Assumption**: Given the 3-month timeline and solo development, full AAA compliance or extensive testing with assistive technologies is out of scope. Design panel controls must be keyboard-accessible but may not have perfect screen reader experience initially.

### Branding

**Visual Style**: Modern SaaS aesthetic inspired by Linear, Vercel, Figma, and shadcn/ui - clean typography, generous whitespace, subtle shadows, and professional color palette. The design panel itself should feel as polished as Figma's properties panel - smooth sliders, elegant color pickers, professional control layouts. Primary brand color should convey **trust and competence** (deep blue or professional teal), with accent colors for success states (green) and warnings (amber).

**Tone**: Professional yet approachable - "your smart colleague who's great at CVs AND design" not "corporate HR department"

**No custom illustrations or brand assets** - rely on shadcn/ui components, Lucide icons, and Tailwind utilities to maintain consistency without design overhead.

**Assumption**: Using pre-built component library (shadcn/ui) for 90% of UI, with custom design panel controls inspired by Figma's UI patterns.

### Target Device and Platforms: Web Responsive

**Primary target**: Desktop browsers (1440px+) for full three-panel workflow - this is focused work that benefits from screen real estate for simultaneous AI chat, preview, and design control

**Secondary support**: Tablet (768px-1280px) with adapted layout (two-panel mode with toggleable chat/design, always-visible preview)

**Mobile (320px-768px)**: View-only or light editing capability - primarily for reviewing CVs on the go. Chat interface works well on mobile, but design panel and complex editing are desktop-only features.

**Platform priority**: Chrome/Edge (primary), Safari (important for Mac users), Firefox (nice to have). No IE11 or legacy browser support.

**Assumption**: Most serious CV creation and design work happens at a desk, so optimizing mobile editing is lower priority than nailing desktop three-panel experience.

---

## Technical Assumptions

### Repository Structure: Monorepo

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

### Service Architecture

**Architecture**: Edge-first serverless monolith within Next.js App Router

**Key Services**:
- **Edge Middleware**: Auth verification (NextAuth), rate limiting, credit checks
- **Server Components**: Initial page loads with data fetching
- **Server Actions**: Mutations (CV updates, credit deductions, AI operations)
- **API Routes**: Webhooks (Stripe), external integrations (job scraping)
- **Background Jobs**: Heavy operations (PDF generation, ATS fine-tuning) via Trigger.dev or Inngest

**Design Panel Rendering**: Client-side React with CSS custom properties for real-time preview updates - no server round-trip for design variable changes

**Rationale**: Serverless monolith is simplest architecture for MVP while supporting 1000+ users. Edge middleware ensures fast auth/rate-limiting globally. Separating heavy operations (PDF gen, fine-tuning) to background jobs prevents timeout issues on Vercel's 10s function limit.

### Testing Requirements

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

### Additional Technical Assumptions and Requests

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

## Epic List

**Epic 1: Foundation & Core Infrastructure**
Establish Next.js 15 project with authentication, database, deployment pipeline, and basic CV data model. Deliver a "Hello World" deployed app with user registration and a simple health check dashboard.

**Epic 2: Visual CV Editor with Live Preview**
Build the core WYSIWYG CV editor with template system, auto-save, and real-time preview. Users can create, edit, and view their CV with at least one professional template.

**Epic 3: Design Panel & Template Customization**
Implement Figma-inspired design panel with customizable variables (colors, fonts, spacing). Users can personalize their CV's visual appearance with instant live preview updates.

**Epic 4: AI Conversational Editor with Vercel AI SDK**
Integrate AI SDK with `useChat` for conversational CV editing. Implement streaming responses, tool calling for CV modifications, and credit-based usage system.

**Epic 5: Generative UI Features**
Leverage AI SDK's generative UI capabilities to render interactive components: smart suggestions, ATS fix widgets, template recommendations, and dynamic forms.

**Epic 6: Smart Import & Job Analysis**
Build PDF/LinkedIn import using AI parsing and job posting analysis with embedding-based matching. Users can import existing data and analyze job compatibility.

**Epic 7: ATS Analyzer & PDF Export**
Implement fine-tuned ATS analysis engine with actionable feedback and professional PDF export. Users get compatibility scores with one-click fixes and can export ATS-friendly PDFs.

**Epic 8: Payment Integration & Credit System**
Integrate Stripe for subscriptions and credit packs. Complete webhook handling, subscription management, and credit deduction flows.

**Epic 9: Polish, Testing & Deployment**
Final UX polish, responsive design refinement, beta testing with friends, bug fixes, and production deployment with monitoring.

---

## Epic 1: Foundation & Core Infrastructure

**Goal**: Establish the technical foundation for AltocV2 by setting up Next.js 15 project with authentication, database, CI/CD pipeline, and core data models. This epic delivers a deployed application with user registration, a basic dashboard, and verified infrastructure that supports future feature development.

### Story 1.1: Initialize Next.js 15 Project with TypeScript

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

### Story 1.2: Setup PostgreSQL Database with Prisma

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

### Story 1.3: Implement Authentication with NextAuth v5

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

### Story 1.4: Create User Dashboard with Basic Layout

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

### Story 1.5: Deploy to Vercel with Environment Configuration

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

### Story 1.6: Setup Monitoring and Error Tracking

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

## Epic 2: Visual CV Editor with Live Preview

**Goal**: Build the core WYSIWYG CV editor with template system, live preview, and persistent storage. Users can create a new CV, edit content inline with auto-save, view real-time preview, and manage multiple CV versions. This epic delivers the foundational editing experience before AI and design customization features.

### Story 2.1: Create CV Data Model and State Management

As a **developer**,
I want **a comprehensive CV data model with Zustand state management**,
so that **the editor can handle complex CV structures with performant updates**.

**Acceptance Criteria**:
1. Extended Prisma schema with CV sections: `PersonalInfo`, `Summary`, `Experience`, `Education`, `Skills`, `Projects`
2. Zustand store created with CV state and actions (updateSection, addItem, deleteItem, reorderItems)
3. Type definitions for all CV sections using TypeScript interfaces
4. Undo/redo stack implemented in Zustand store (max 50 actions)
5. State persists to localStorage for crash recovery
6. Initial CV structure populated with placeholder data

### Story 2.2: Build Basic CV Template Component

As a **developer**,
I want **a single professional CV template as a React component**,
so that **users can see their CV rendered with proper formatting**.

**Acceptance Criteria**:
1. "Modern Tech" template component created with clean, single-column layout
2. All CV sections rendered: header (name, contact), summary, experience, education, skills, projects
3. Responsive design works on desktop (1440px+) and tablet (768px+)
4. CSS custom properties used for colors, fonts, and spacing (enables design panel later)
5. Experience items show: company, role, dates, bullet points
6. Education items show: institution, degree, dates, achievements
7. Template receives CV data as props and renders without errors

### Story 2.3: Implement Inline Editing with Click-to-Edit

As a **user**,
I want **to click on any CV section to edit it directly**,
so that **I can quickly make changes without modal dialogs or separate forms**.

**Acceptance Criteria**:
1. Clicking on text fields (name, summary, job title) makes them editable
2. Contenteditable div or input field appears with current value
3. Pressing Enter or clicking outside saves changes to Zustand store
4. Escape key cancels editing and reverts to original value
5. Visual indication (border highlight, cursor change) shows editable areas on hover
6. Bullet points support add/delete/reorder with UI controls
7. Date fields use date picker for consistent formatting

### Story 2.4: Add CV Section Management (Add/Remove/Reorder)

As a **user**,
I want **to add, remove, and reorder CV sections**,
so that **I can customize my CV structure based on what's most relevant**.

**Acceptance Criteria**:
1. "Add Section" dropdown appears with options: Experience, Education, Project, Custom Section
2. Clicking "Add Experience" inserts new empty experience item in the section
3. Each section item has delete icon (trash) with confirmation dialog
4. Drag handles on each item enable drag-to-reorder using react-beautiful-dnd or similar
5. Section order persisted to database on reorder
6. Cannot delete last remaining section of required types (Personal Info, Summary)

### Story 2.5: Implement Auto-Save with Optimistic Updates

As a **user**,
I want **my changes to save automatically every 3 seconds**,
so that **I never lose my work if I close the browser or lose connection**.

**Acceptance Criteria**:
1. Debounced auto-save triggers 3 seconds after last edit
2. "Saving..." indicator appears during save operation
3. "Saved 2s ago" timestamp shows after successful save
4. Optimistic UI updates immediately on edit (no waiting for server)
5. Server Action handles CV updates with error handling
6. If save fails, error toast appears with "Retry" button
7. Unsaved changes warning appears if user tries to navigate away

### Story 2.6: Create CV List Dashboard with CRUD Operations

As a **user**,
I want **to see all my CVs in a dashboard and create/duplicate/delete them**,
so that **I can manage multiple CV versions for different job applications**.

**Acceptance Criteria**:
1. Dashboard displays CV cards in grid layout with thumbnail preview
2. Each card shows: CV title, last edited timestamp, template name
3. "Create New CV" button opens modal with title input and template selector
4. "Duplicate CV" action creates copy with "(Copy)" suffix
5. "Delete CV" action shows confirmation dialog before deletion
6. Clicking CV card navigates to editor view for that CV
7. Empty state message when user has no CVs with "Create First CV" CTA

---

## Epic 3: Design Panel & Template Customization

**Goal**: Implement a Figma-inspired design panel that allows users to customize CV visual appearance through variables (colors, fonts, spacing) with instant live preview. This epic delivers the visual design pillar of the three-pillar architecture (AI + Preview + Design).

### Story 3.1: Create Design Panel UI Component

As a **user**,
I want **a collapsible design panel on the right side of the editor**,
so that **I can access visual customization controls without cluttering the main workspace**.

**Acceptance Criteria**:
1. Design panel renders as sidebar on right side of editor (300px width)
2. Toggle button collapses/expands panel with smooth animation
3. Panel sections organized with accordions: Colors, Typography, Spacing, Layout
4. Panel is sticky and scrollable independently from CV preview
5. Responsive behavior: panel moves to bottom drawer on tablet/mobile
6. Visual style matches Figma's properties panel aesthetic (clean, minimal, professional)

### Story 3.2: Implement Color Customization Controls

As a **user**,
I want **to customize CV colors (primary, accent, text) with a color picker**,
so that **I can match my personal brand or industry conventions**.

**Acceptance Criteria**:
1. Color picker component for Primary Color, Accent Color, Text Color, Background Color
2. Color picker shows: hex input, saturation/brightness selector, recent colors
3. Contrast ratio validator warns if text/background combination fails WCAG AA (4.5:1)
4. Color presets available: "Professional Blue", "Creative Purple", "Corporate Gray", "Warm Orange"
5. Changing color updates CSS custom property immediately (live preview)
6. Color values persisted to CV settings in database
7. Reset to template defaults button available

### Story 3.3: Add Typography Customization

As a **user**,
I want **to select font pairings and adjust text sizes**,
so that **my CV typography reflects my professional style**.

**Acceptance Criteria**:
1. Font pairing selector with 5 curated pairings (e.g., "Inter + Inter", "Playfair + Source Sans", "Montserrat + Open Sans")
2. Headings font size slider (14px - 24px) with live preview
3. Body font size slider (10px - 14px) with live preview
4. Line height adjustment (1.2x - 1.8x) for readability control
5. Font weights selector for headings (Normal, Semi-Bold, Bold)
6. Google Fonts loaded dynamically when font pairing changes
7. Typography changes update CSS custom properties instantly

### Story 3.4: Create Spacing and Layout Controls

As a **user**,
I want **to adjust spacing density and section layout**,
so that **I can fit more content or create a more spacious, breathable design**.

**Acceptance Criteria**:
1. Spacing density slider: Compact (0.8x) → Normal (1x) → Spacious (1.5x)
2. Section margin control (top/bottom spacing between CV sections)
3. Content padding control (inner padding within sections)
4. Line spacing control for bullet points
5. Spacing presets: "Compact (1-page)", "Balanced", "Spacious (2-page)"
6. Layout toggle for future templates: Single column / Two column (disabled for templates that don't support it)
7. All spacing uses CSS custom properties for instant preview

### Story 3.5: Build Template Variable System

As a **developer**,
I want **a JSON schema system for defining customizable template variables**,
so that **each template can expose different customization options programmatically**.

**Acceptance Criteria**:
1. `TemplateConfig` TypeScript interface defines available variables per template
2. Each template exports config JSON with variable definitions (name, type, default, min/max)
3. Design panel dynamically generates controls based on template config
4. CV settings table stores template-specific variable overrides as JSONB
5. Template component reads variables from CSS custom properties
6. Switching templates preserves compatible variables, resets incompatible ones
7. Variable schema validated with Zod

### Story 3.6: Add Two Additional CV Templates

As a **user**,
I want **three distinct professional CV templates to choose from**,
so that **I can select one that matches my industry and personal style**.

**Acceptance Criteria**:
1. "Traditional Corporate" template created: Two-column layout, conservative styling, emphasis on progression
2. "Creative" template created: Visual design with color accents, portfolio links prominent, modern aesthetic
3. Template selector in editor toolbar shows visual previews of all templates
4. Switching templates re-renders CV immediately with content preserved
5. Each template has unique variable config (e.g., Creative has more color options)
6. All templates support same core sections (Personal, Summary, Experience, Education, Skills, Projects)
7. Templates are responsive and maintain structure on different screen sizes

---

## Epic 4: AI Conversational Editor with Vercel AI SDK

**Goal**: Integrate Vercel AI SDK to enable conversational CV editing with streaming responses, tool calling for structured actions, and credit-based usage tracking. Users can chat with AI to modify CV content, get suggestions, and perform complex edits through natural language. This epic delivers the AI pillar of the three-pillar architecture.

### Story 4.1: Setup Vercel AI SDK with Multi-Provider Configuration

As a **developer**,
I want **Vercel AI SDK configured with OpenAI and Anthropic providers**,
so that **I can route different AI tasks to appropriate models based on cost and capability**.

**Acceptance Criteria**:
1. `ai` package installed and configured in Next.js project
2. OpenAI provider configured with GPT-4o and GPT-4o-mini models
3. Anthropic provider configured with Claude 3.5 Haiku and Sonnet models
4. Environment variables set for API keys (OpenAI, Anthropic)
5. Model router utility created to select model based on task type (simple/complex)
6. AI SDK core functions tested: `generateText`, `streamText`, `generateObject`
7. Error handling for API failures with fallback to alternative provider

### Story 4.2: Build Chat UI with useChat Hook

As a **user**,
I want **a chat interface in the editor to converse with an AI assistant**,
so that **I can ask for help improving my CV through natural conversation**.

**Acceptance Criteria**:
1. Chat panel component created as collapsible left sidebar (400px width)
2. `useChat` hook from AI SDK integrated with streaming response display
3. Message list shows user messages and AI responses with timestamps
4. Input field with send button and keyboard shortcut (Cmd/Ctrl + Enter)
5. Streaming indicator shows AI is "thinking" and words appear progressively
6. Chat history persisted to database (last 50 messages per CV)
7. "Clear chat" button with confirmation dialog

### Story 4.3: Implement Credit System with Database Schema

As a **developer**,
I want **a credit system that tracks usage and prevents operations when balance is insufficient**,
so that **I can control AI costs and enable future monetization**.

**Acceptance Criteria**:
1. User model extended with `credits` (integer) and `tier` (enum: FREE, PRO) fields
2. `CreditTransaction` model tracks all credit changes with type, amount, description, timestamp
3. Credit costs defined as constants: Chat message (1), Create CV (5), Adapt CV (3), ATS analysis (10), Import (5), Export PDF (2)
4. Server Action for deducting credits with transaction-safe atomic decrement
5. Middleware checks credit balance before AI operations and returns error if insufficient
6. Credit balance displayed prominently in UI header with color coding (red if low)
7. New users receive 50 credits on signup

### Story 4.4: Add Tool Calling for CV Modifications

As a **developer**,
I want **AI to call predefined tools for CV operations**,
so that **AI responses translate to reliable, structured CV updates instead of parsing text**.

**Acceptance Criteria**:
1. Tool definitions created using AI SDK's tool calling API: `updateSection`, `addExperience`, `addEducation`, `addSkill`, `deleteItem`, `reorderSections`
2. Each tool has Zod schema for parameters (sectionId, content, position, etc.)
3. Server Action handles tool execution with CV state updates
4. AI receives CV current state in system prompt for context-aware suggestions
5. Tool execution deducts appropriate credits from user balance
6. Tool results returned to AI for confirmation message to user
7. Failed tool calls return error message that AI can explain to user

### Story 4.5: Create Context-Aware System Prompt

As a **developer**,
I want **a comprehensive system prompt that gives AI context about the CV and capabilities**,
so that **AI provides relevant, actionable suggestions tailored to the user's CV**.

**Acceptance Criteria**:
1. System prompt includes: AI role (CV improvement assistant), available tools, credit costs
2. Current CV content injected into system prompt (personal info, summary, sections)
3. Prompt instructs AI to be concise, action-oriented, and use tools when appropriate
4. Context window limited to last 10 messages to control token usage and costs
5. User's industry/role (if provided) included for tailored advice
6. Prompt includes ATS best practices (keywords, formatting, achievement quantification)
7. System prompt dynamically updates when CV content changes

### Story 4.6: Implement Streaming Responses with Optimistic UI

As a **user**,
I want **AI responses to appear word-by-word as they're generated**,
so that **I get immediate feedback and the experience feels conversational**.

**Acceptance Criteria**:
1. `useChat` hook configured for streaming with `streamText` API
2. AI response words appear progressively in chat bubble
3. When AI calls tool, optimistic update immediately shows change in CV preview
4. Loading skeleton shown in CV section being modified
5. If tool execution fails, change reverted with error toast
6. Credit deduction happens optimistically, refunded if operation fails
7. Stream can be cancelled mid-response with stop button

---

## Epic 5: Generative UI Features

**Goal**: Leverage Vercel AI SDK's generative UI capabilities (`streamUI`, RSC integration) to render interactive React components directly from AI responses. Instead of text-only suggestions, AI returns actionable widgets, smart cards, and dynamic forms that users can interact with. This epic delivers the "wow factor" portfolio differentiator.

### Story 5.1: Setup AI SDK RSC Integration

As a **developer**,
I want **AI SDK's React Server Components integration configured**,
so that **AI can return renderable React components instead of just text**.

**Acceptance Criteria**:
1. `ai/rsc` package imported and configured in Server Actions
2. `streamUI` function tested with simple component return (e.g., custom card)
3. Server Actions can serialize React components to client
4. Client receives and renders server-generated components in chat
5. Component props are type-safe with Zod validation
6. Error boundaries wrap AI-generated components to prevent crashes
7. Loading states handled during component streaming

### Story 5.2: Create Smart Suggestion Cards Component

As a **user**,
I want **AI suggestions to appear as interactive cards with "Apply" buttons**,
so that **I can quickly implement improvements without typing or copy-pasting**.

**Acceptance Criteria**:
1. `SuggestionCard` component created with title, description, preview, and "Apply" action
2. AI can generate suggestion cards using `streamUI` for improvements (e.g., "Add quantified achievements")
3. Clicking "Apply" executes tool call to update CV section
4. Card shows before/after preview of suggested change
5. Multiple suggestion cards can appear in single AI response
6. Dismiss button allows user to ignore suggestion
7. Applied suggestions marked with checkmark and disabled

### Story 5.3: Implement Template Recommendation Widget

As a **user**,
I want **AI to recommend templates based on my industry/role with visual previews**,
so that **I can see which template suits my needs without manually browsing**.

**Acceptance Criteria**:
1. `TemplateRecommendation` component shows template preview thumbnail, name, and "Use Template" button
2. AI analyzes user's CV content (industry, role, experience level) and generates template recommendation widget
3. Component displays 1-3 template cards with reasons for recommendation
4. Clicking "Use Template" switches CV to selected template with confirmation dialog
5. Recommendation includes industry-specific reasoning (e.g., "Creative template fits your design portfolio")
6. Widget appears in chat as interactive component, not text
7. Template switch preserves all CV content, only changes visual design

### Story 5.4: Build ATS Quick Fix Widget

As a **user**,
I want **ATS issues to appear as actionable fix cards**,
so that **I can resolve compatibility problems with one click instead of manual editing**.

**Acceptance Criteria**:
1. `ATSFixCard` component shows issue severity (high/medium/low), description, and "Fix" button
2. AI generates fix cards for common ATS issues: missing keywords, formatting problems, length issues
3. Each card shows impact estimate: "This fix will improve your ATS score by ~8%"
4. Clicking "Fix" applies change to CV and deducts appropriate credits
5. Multiple fix cards can be batched: "Apply All Fixes" button available
6. Fixed issues marked with green checkmark
7. Widget integrates with ATS analysis results (Epic 7 dependency acknowledged)

### Story 5.5: Create Dynamic Form Generation for Job-Specific Content

As a **user**,
I want **AI to generate custom input forms based on job posting requirements**,
so that **I can efficiently add relevant experience that matches the job description**.

**Acceptance Criteria**:
1. `DynamicForm` component generated by AI with fields specific to job requirements
2. User pastes job posting → AI analyzes → returns form with fields like "Python experience", "Team leadership examples", "AWS certifications"
3. Form fields pre-populated with suggestions from existing CV content
4. Submitting form adds/updates CV sections with validated data
5. Form includes helpful placeholders and examples for each field
6. Zod schema validates form inputs before submission
7. Form generation costs credits (5 credits) and shows preview before user fills it

### Story 5.6: Implement Interactive Comparison Table for Job Matching

As a **user**,
I want **job compatibility analysis displayed as an interactive table**,
so that **I can visualize how my CV aligns with job requirements at a glance**.

**Acceptance Criteria**:
1. `ComparisonTable` component shows: Required Skill | Your Experience | Match Status | Action
2. AI generates table by comparing job requirements with CV content
3. Match status shown as: ✓ Strong Match, ~ Partial Match, ✗ Missing
4. Action column has context-specific buttons: "Highlight Skill", "Add to CV", "Rewrite"
5. Table is sortable by match status and filterable by skill category
6. Overall compatibility score shown at top with progress bar
7. Clicking actions updates CV and reflects changes in real-time preview

---

## Epic 6: Smart Import & Job Analysis

**Goal**: Enable users to quickly populate CVs by importing from existing sources (PDF CVs, LinkedIn exports) and analyze job postings to extract requirements and calculate compatibility scores. This epic eliminates manual data entry and provides intelligent job matching using AI parsing and vector embeddings.

### Story 6.1: Build PDF CV Parser with GPT-4 Vision

As a **user**,
I want **to upload my existing PDF CV and have it automatically parsed into editable sections**,
so that **I don't have to manually retype all my experience from scratch**.

**Acceptance Criteria**:
1. File upload component accepts PDF files (max 5MB)
2. Server Action uploads PDF to Vercel Blob Storage
3. pdf-parse extracts plain text from simple single-column PDFs
4. GPT-4 Vision API called for complex/multi-column PDFs with visual structure
5. AI prompt extracts structured data: personal info, summary, experience (company, role, dates, bullets), education, skills
6. Parsed data returned as JSON matching CV schema (validated with Zod)
7. Import operation costs 5 credits and shows parsed preview before applying
8. User can review and edit parsed data before confirming import

### Story 6.2: Implement LinkedIn Profile Import

As a **user**,
I want **to import my LinkedIn profile data into my CV**,
so that **I can leverage information I've already compiled on LinkedIn**.

**Acceptance Criteria**:
1. User uploads LinkedIn-exported PDF (standard LinkedIn export format)
2. GPT-4 Vision parses LinkedIn PDF structure (different from standard CV format)
3. Extraction includes: headline, work experience, education, skills, certifications
4. Date normalization handles LinkedIn's various date formats (e.g., "Jan 2020 - Present")
5. Company names and titles cleaned and formatted consistently
6. Skills imported as structured list, not paragraph
7. User can select which sections to import (checkboxes for Experience, Education, Skills)
8. Import merges with existing CV data without overwriting (additive)

### Story 6.3: Create Job Posting URL Scraper

As a **user**,
I want **to paste a job posting URL and have key requirements extracted**,
so that **I can understand what the employer is looking for without manual analysis**.

**Acceptance Criteria**:
1. Input field accepts URLs from LinkedIn, Indeed, or plain text paste
2. Server Action fetches URL content (handles common job board structures)
3. AI extracts: job title, company name, required skills, preferred skills, responsibilities, qualifications
4. Keywords identified and ranked by importance (required vs nice-to-have)
5. Extracted data displayed in structured card with sections
6. Job posting saved to database linked to CV for later reference
7. Scraping costs 2 credits and handles errors gracefully (e.g., paywall, bot detection)

### Story 6.4: Build Vector Embedding System for Job Matching

As a **developer**,
I want **CV content and job descriptions embedded as vectors for similarity comparison**,
so that **I can calculate accurate compatibility scores between CVs and jobs**.

**Acceptance Criteria**:
1. Supabase pgvector extension enabled in Neon database
2. CV sections (experience, skills, summary) embedded separately using OpenAI text-embedding-3-small
3. Job posting content embedded with same model
4. Embeddings stored in database with efficient indexing
5. Cosine similarity calculation function created
6. Batch embedding support (embed all CV sections in single API call when possible)
7. Embedding cache prevents re-embedding unchanged content

### Story 6.5: Implement Job Compatibility Score Calculator

As a **user**,
I want **to see a compatibility percentage between my CV and a job posting**,
so that **I can prioritize which jobs to apply for and know where to improve my CV**.

**Acceptance Criteria**:
1. Compatibility score calculated using weighted vector similarity: Skills (40%), Experience (30%), Summary (20%), Other (10%)
2. Score displayed as percentage (0-100%) with color coding: <50% (red), 50-75% (yellow), >75% (green)
3. Breakdown shown for each component: "Skills: 82%, Experience: 68%, Summary: 75%"
4. Missing keywords extracted by comparing job requirements with CV content
5. "Top 5 Missing Keywords" list displayed with "Add to CV" quick actions
6. Score recalculates automatically when CV is edited
7. Analysis costs 10 credits and can be run multiple times for same job

### Story 6.6: Create Job Analysis Dashboard

As a **user**,
I want **a dashboard showing all jobs I've analyzed with compatibility scores**,
so that **I can track which opportunities are the best fit and manage my applications**.

**Acceptance Criteria**:
1. Job analysis history displayed as sortable table: Job Title, Company, Compatibility Score, Date Analyzed
2. Click job row to expand and see detailed breakdown and missing keywords
3. "Re-analyze" button recalculates score with updated CV content
4. "Optimize CV for this Job" button opens AI chat with job context pre-loaded
5. Export job list to CSV for external tracking
6. Filter jobs by score range and date
7. Delete job analysis with confirmation

---

## Epic 7: ATS Analyzer & PDF Export

**Goal**: Implement a fine-tuned ATS analysis engine that identifies compatibility issues with Applicant Tracking Systems and provides actionable feedback. Enable professional PDF export with ATS-optimized formatting. This epic delivers the critical differentiation feature that helps users ensure their CVs pass automated screening.

### Story 7.1: Create ATS Training Dataset

As a **developer**,
I want **a dataset of job postings, CVs, and ATS compatibility annotations**,
so that **I can fine-tune a model to identify real ATS issues accurately**.

**Acceptance Criteria**:
1. Scrape 200+ job postings from LinkedIn/Indeed (diverse industries and roles)
2. Collect 100+ example CVs (mix of ATS-friendly and problematic formatting)
3. Synthesize 200+ CV-job pairs with GPT-4 including compatibility scores and issue lists
4. Dataset format: `{ cv_text, job_description, compatibility_score, issues[], suggestions[] }`
5. Issues categorized: Formatting (headers, fonts), Keywords (missing, density), Structure (sections, ordering), Length (too long/short)
6. Dataset stored as JSONL file for fine-tuning
7. Train/validation split (80/20) for evaluation

### Story 7.2: Fine-Tune GPT-4o-mini for ATS Analysis

As a **developer**,
I want **a fine-tuned model specialized in ATS compatibility analysis**,
so that **ATS feedback is more accurate than generic LLM responses**.

**Acceptance Criteria**:
1. Fine-tuning job created using OpenAI API with prepared dataset
2. Model trained to identify specific issues and provide actionable suggestions
3. Validation set performance evaluated: accuracy >85% in issue detection
4. Fine-tuned model ID stored in environment variables
5. Cost analysis shows fine-tuning fits within budget (<$50 for training)
6. Fallback to GPT-4o with few-shot examples if fine-tuning is too expensive/slow
7. Model versioning system to track fine-tune iterations

### Story 7.3: Build ATS Analysis Pipeline

As a **user**,
I want **to run an ATS compatibility check on my CV and see a detailed report**,
so that **I know exactly what issues could cause my CV to be rejected by automated systems**.

**Acceptance Criteria**:
1. "Run ATS Analysis" button in editor toolbar triggers analysis (costs 10 credits)
2. Server Action extracts CV as plain text and structured JSON
3. Fine-tuned model analyzes CV with optional job posting context
4. Results include: overall score (0-100), critical issues, warnings, suggestions
5. Analysis stored in database linked to CV with timestamp
6. Loading state shows "Analyzing your CV..." with estimated time (15-30 seconds)
7. Error handling for API failures with retry option

### Story 7.4: Create ATS Report Dashboard

As a **user**,
I want **a visual report showing my ATS compatibility score and issues**,
so that **I can quickly understand what needs fixing and prioritize changes**.

**Acceptance Criteria**:
1. Report page displays circular gauge showing overall score with color coding
2. Issues grouped by severity: Critical (red, blocks ATS), Warnings (yellow, reduces score), Suggestions (blue, improvements)
3. Each issue shows: title, description, affected section, estimated impact on score
4. "Fix This" button for fixable issues (e.g., missing keywords → add skill)
5. Progress tracker shows: "3/7 critical issues resolved"
6. Report can be regenerated to reflect CV changes
7. Share report link (read-only) for feedback from others

### Story 7.5: Implement One-Click ATS Fixes

As a **user**,
I want **to apply ATS fixes with one click instead of manual editing**,
so that **I can quickly improve my score without tedious work**.

**Acceptance Criteria**:
1. Fixable issues have "Apply Fix" button that executes predefined tool call
2. Fix types: Add missing keyword to skills, reformat headers, adjust section order, reduce length
3. Fix preview shown before applying: "This will add 'Python, AWS, Docker' to Skills section"
4. Applying fix deducts credits (1 credit per fix) and updates CV immediately
5. Undo option available for last 5 applied fixes
6. Batch "Fix All" button applies all automated fixes with confirmation dialog
7. Non-automatable fixes show manual guidance (e.g., "Add quantified achievements to your experience bullets")

### Story 7.6: Build PDF Export with ATS Optimization

As a **user**,
I want **to export my CV as an ATS-friendly PDF**,
so that **I can submit it to job applications with confidence it will be parsed correctly**.

**Acceptance Criteria**:
1. "Export PDF" button in toolbar triggers export (costs 2 credits)
2. @react-pdf/renderer generates PDF on backend serverless function
3. PDF formatting optimized for ATS: clean fonts (no decorative), simple structure, no images/graphics in text areas, proper heading hierarchy
4. Export includes metadata: title, author, keywords for better parsing
5. Generated PDF uploaded to Vercel Blob Storage with signed URL (expires in 7 days)
6. Download link provided with option to generate new copy
7. PDF preview shown before final download with warning if ATS score is low (<70%)

### Story 7.7: Add Export Format Options

As a **user**,
I want **multiple export formats (PDF, DOCX, Plain Text) to match different application requirements**,
so that **I can submit my CV in whatever format the employer requests**.

**Acceptance Criteria**:
1. Export dropdown offers: PDF (ATS-optimized), DOCX (Word compatible), Plain Text (email/paste)
2. DOCX generation using docx library with simple formatting
3. Plain Text export removes all formatting, preserves structure with Markdown
4. Each export format costs credits: PDF (2), DOCX (2), Plain Text (1)
5. Export history saved in database with format, timestamp, download count
6. "Re-download" option for previous exports without re-generating (no credit cost)
7. Batch export: "Export as PDF + DOCX" with single click

---

## Epic 8: Payment Integration & Credit System

**Goal**: Integrate Stripe for subscription management and credit purchases. Implement complete payment workflows including checkout, webhooks, subscription upgrades/downgrades, and credit refill. This epic delivers the monetization infrastructure enabling future revenue generation.

### Story 8.1: Setup Stripe Account and Products

As a **developer**,
I want **Stripe configured with product definitions and pricing tiers**,
so that **I can process payments and manage subscriptions programmatically**.

**Acceptance Criteria**:
1. Stripe account created with test and production API keys
2. Products created in Stripe Dashboard: Free (metadata only), Pro ($9.99/month), Credit Pack ($4.99 for 100 credits)
3. Webhook endpoint configured in Stripe Dashboard pointing to `/api/webhooks/stripe`
4. Stripe SDK installed and initialized in Next.js project
5. Environment variables set for publishable and secret keys (test and production)
6. Test mode verified with Stripe test cards (4242 4242 4242 4242)
7. Product/price IDs stored in environment variables

### Story 8.2: Build Subscription Checkout Flow

As a **user**,
I want **to upgrade to Pro subscription through a seamless checkout**,
so that **I can access unlimited CVs and more credits without friction**.

**Acceptance Criteria**:
1. "Upgrade to Pro" button in UI opens Stripe Checkout modal/redirect
2. Server Action creates Stripe Checkout Session with Pro subscription price
3. Success URL redirects to dashboard with success message
4. Cancel URL returns to pricing page
5. Customer metadata includes user ID for webhook mapping
6. Trial period configured (7 days free trial for Pro)
7. Checkout supports multiple payment methods (card, Google Pay, Apple Pay)

### Story 8.3: Implement Stripe Webhook Handler

As a **developer**,
I want **webhook events from Stripe processed reliably**,
so that **user subscriptions and credits update automatically when payments succeed or fail**.

**Acceptance Criteria**:
1. API route `/api/webhooks/stripe` receives and verifies Stripe webhook signatures
2. Event handlers created for: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
3. Idempotency handling prevents duplicate processing (use event ID as idempotency key)
4. User tier updated to PRO on successful subscription
5. Credits allocated on subscription renewal (500 credits/month for Pro)
6. Failed payments trigger email notification and grace period (3 days)
7. Webhook logs stored in database for debugging

### Story 8.4: Create Stripe Customer Portal Integration

As a **user**,
I want **to manage my subscription (update payment, cancel, view invoices) from my account**,
so that **I have full control without contacting support**.

**Acceptance Criteria**:
1. "Manage Subscription" button in settings creates Stripe Customer Portal session
2. Portal allows: update payment method, cancel subscription, view billing history, download invoices
3. Portal return URL points to user settings page
4. Subscription cancellation triggers immediate downgrade at period end (no prorated refund)
5. Portal customized with brand colors and logo
6. User without subscription sees "No active subscription" message
7. Portal session expires after 1 hour for security

### Story 8.5: Implement One-Time Credit Purchase

As a **user**,
I want **to buy additional credits without subscribing to Pro**,
so that **I can top up my balance when needed without monthly commitment**.

**Acceptance Criteria**:
1. "Buy Credits" button opens modal with credit pack options (100 credits for $4.99)
2. Checkout Session created for one-time payment (mode: 'payment')
3. Successful purchase adds credits to user balance via webhook
4. Credit purchase recorded in `CreditTransaction` table with type: PURCHASE
5. Email receipt sent automatically by Stripe
6. User can purchase multiple packs (no limit)
7. Credits from purchases never expire (unlike monthly subscription credits)

### Story 8.6: Build Pricing Page and Tier Comparison

As a **user**,
I want **a clear pricing page showing Free vs Pro tiers with feature comparison**,
so that **I can decide if Pro subscription is worth the investment**.

**Acceptance Criteria**:
1. Pricing page route `/pricing` with two-column comparison: Free vs Pro
2. Features listed with checkmarks: CV limit (3 vs unlimited), Credits (50 initial + 10/month vs 500/month), Templates (1 vs 3), Priority support (No vs Yes)
3. "Current Plan" badge shown on user's active tier
4. CTA buttons: "Get Started" (Free), "Upgrade to Pro" (Pro)
5. FAQ section answers common questions (refunds, cancellation, credit rollover)
6. Pricing displayed with annual option (save 20%): $9.99/month or $95.88/year
7. Social proof: "Join 500+ professionals using AltocV2" (update number dynamically)

### Story 8.7: Add Credit Usage Analytics Dashboard

As a **user**,
I want **to see my credit usage history and remaining balance**,
so that **I can track spending and know when to buy more credits**.

**Acceptance Criteria**:
1. Settings page shows current credit balance prominently with progress bar
2. Transaction history table: Date, Type (Chat, Export, ATS Analysis), Amount, Balance After
3. Filter transactions by date range and type
4. Monthly usage chart shows credit spending over time (last 6 months)
5. "Low Balance" warning appears when credits drop below 20
6. Pro users see monthly credit refresh date: "Next refill: Feb 1, 2025 (500 credits)"
7. Export transaction history to CSV for personal records

---

## Epic 9: Polish, Testing & Deployment

**Goal**: Finalize the application with UX polish, responsive design refinement, comprehensive testing with beta users, bug fixes, performance optimization, and production deployment. This epic transforms a functional MVP into a portfolio-ready, publicly shareable product.

### Story 9.1: Responsive Design Refinement

As a **user**,
I want **the application to work seamlessly on desktop, tablet, and mobile devices**,
so that **I can access and edit my CV from any device**.

**Acceptance Criteria**:
1. Desktop (1440px+): Three-panel layout (chat, preview, design) all visible
2. Laptop (1024px-1440px): Two-panel layout with collapsible chat/design panels
3. Tablet (768px-1024px): Stacked layout with tabbed navigation between panels
4. Mobile (320px-768px): Single column, CV preview prioritized, chat in bottom drawer
5. Touch interactions optimized: larger buttons, swipe gestures for panel switching
6. All text readable without zooming on mobile devices
7. Tested on real devices: iPhone, Android, iPad, various desktop resolutions

### Story 9.2: Accessibility Audit and Improvements

As a **user with accessibility needs**,
I want **the application to be usable with keyboard navigation and screen readers**,
so that **I can create my CV independently regardless of ability**.

**Acceptance Criteria**:
1. All interactive elements focusable and navigable with Tab/Shift+Tab
2. Focus indicators visible on all focused elements (2px outline)
3. Skip navigation link allows jumping to main content
4. ARIA labels added to icon-only buttons and complex widgets
5. Color contrast meets WCAG AA standards (verified with automated tool)
6. Error messages announced to screen readers with ARIA live regions
7. Tested with VoiceOver (macOS) and NVDA (Windows)

### Story 9.3: Beta Testing with Target Users

As a **product manager**,
I want **5-10 beta testers to use the application and provide feedback**,
so that **I can identify usability issues and bugs before public launch**.

**Acceptance Criteria**:
1. Beta testing group recruited (mix of tech and non-tech professionals)
2. Onboarding guide created with test scenarios: Create CV, Use AI chat, Run ATS analysis, Export PDF
3. Feedback form shared (Google Form or Typeform) with questions on usability, bugs, feature requests
4. At least 5 complete test sessions conducted with observation notes
5. Critical bugs logged in GitHub Issues with priority labels
6. Usability issues categorized: Must Fix, Should Fix, Nice to Have
7. Positive testimonials collected for marketing use

### Story 9.4: Bug Fixes and Error Handling Improvements

As a **developer**,
I want **all critical and high-priority bugs fixed**,
so that **users have a stable, reliable experience**.

**Acceptance Criteria**:
1. All P0 (critical) bugs resolved: crashes, data loss, payment failures
2. All P1 (high) bugs resolved: broken features, major UX issues
3. Error boundaries added to prevent full app crashes
4. Graceful error messages replace generic errors: "Something went wrong" → "Failed to save CV. Check your connection and try again."
5. Retry mechanisms for transient failures (network, API timeouts)
6. Loading states added to all async operations (no blank screens)
7. Sentry error rate below 1% in production

### Story 9.5: Performance Optimization

As a **user**,
I want **the application to load quickly and respond instantly**,
so that **I don't waste time waiting for the interface**.

**Acceptance Criteria**:
1. Initial page load (dashboard) under 2 seconds on 4G connection
2. CV editor loads under 3 seconds with full CV content
3. AI chat response starts streaming within 1 second
4. Design panel updates apply instantly (<100ms perceived lag)
5. Lazy loading implemented for non-critical components (pricing page, analytics)
6. Images optimized with Next.js Image component and WebP format
7. Lighthouse score: Performance >85, Accessibility >90, Best Practices >90, SEO >90

### Story 9.6: Production Deployment and Monitoring Setup

As a **developer**,
I want **the application deployed to production with comprehensive monitoring**,
so that **I can detect and resolve issues proactively**.

**Acceptance Criteria**:
1. Production domain configured with custom domain (e.g., altocv2.com)
2. HTTPS enabled with automatic certificate renewal
3. Environment variables verified in Vercel production environment
4. Database migrations applied to production database
5. Sentry configured to capture production errors with source maps
6. PostHog analytics tracking real user behavior (page views, feature usage, conversion funnels)
7. Uptime monitoring configured (e.g., UptimeRobot) with email alerts

### Story 9.7: Create Marketing Landing Page

As a **potential user**,
I want **an attractive landing page that explains the product and encourages signup**,
so that **I understand the value proposition before committing**.

**Acceptance Criteria**:
1. Hero section with compelling headline: "Your AI Career Coach for CV Creation"
2. Feature highlights with icons: AI Editor, Design Customization, ATS Analysis, Smart Import
3. Demo video or animated GIF showing key workflow (create CV with AI in 2 minutes)
4. Social proof: testimonials from beta testers, user count
5. Clear CTA: "Start Free" button prominently displayed (above fold and at bottom)
6. Pricing section with Free vs Pro comparison
7. FAQ section addresses common objections (privacy, pricing, compatibility)

### Story 9.8: Documentation and README

As a **developer or stakeholder**,
I want **comprehensive documentation explaining the project**,
so that **others can understand the technical implementation and architecture**.

**Acceptance Criteria**:
1. README.md includes: project description, tech stack, setup instructions, environment variables
2. Architecture diagram showing: Next.js app, database, AI providers, external services
3. API documentation for key Server Actions and routes
4. Database schema diagram generated from Prisma
5. Deployment guide for Vercel with step-by-step instructions
6. Contributing guidelines (code style, pull request process)
7. License file (MIT or appropriate license)

---

## Checklist Results Report

### Executive Summary

**Overall PRD Completeness**: 95%

**MVP Scope Appropriateness**: Just Right - The 9 epics balance ambitious vision with 3-month timeline constraint. Epics 5-7 could be candidates for scope reduction if timeline pressure arises.

**Readiness for Architecture Phase**: Ready - The PRD provides comprehensive technical guidance, clear requirements, and well-structured epics. The architect has sufficient clarity to begin detailed design.

**Most Critical Concerns**:
1. Epic 7 (ATS fine-tuning) has high complexity and cost uncertainty - may need architecture validation before commitment
2. Generative UI (Epic 5) is experimental - success depends on Vercel AI SDK maturity
3. Timeline assumes consistent 15-20 hours/week solo development - aggressive for 9 epics

### Category Analysis Table

| Category                         | Status  | Critical Issues                                                                 |
| -------------------------------- | ------- | ------------------------------------------------------------------------------- |
| 1. Problem Definition & Context  | PASS    | None - Project Brief provides comprehensive foundation                         |
| 2. MVP Scope Definition          | PASS    | Epic 5 (Generative UI) could be stretch goal rather than core MVP              |
| 3. User Experience Requirements  | PASS    | Three-pillar UI vision well-defined, responsive strategy clear                  |
| 4. Functional Requirements       | PASS    | 20 FRs comprehensively cover features, testable and specific                    |
| 5. Non-Functional Requirements   | PASS    | 15 NFRs address cost, performance, scalability constraints                      |
| 6. Epic & Story Structure        | PASS    | 9 epics with 60+ stories, sequenced logically, vertically sliced               |
| 7. Technical Guidance            | PASS    | Comprehensive stack decisions, AI SDK integration strategy detailed             |
| 8. Cross-Functional Requirements | PARTIAL | Data migration strategy not explicitly addressed (acceptable for greenfield MVP) |
| 9. Clarity & Communication       | PASS    | Clear, structured, consistent terminology throughout                            |

### Top Issues by Priority

**BLOCKERS**: None

**HIGH PRIORITY**:
1. **ATS Fine-Tuning Cost Validation** (Epic 7, Story 7.2): Fine-tuning budget estimate needs validation. If >$50, consider few-shot prompting fallback strategy explicitly in acceptance criteria.
2. **Generative UI Maturity Risk** (Epic 5): Vercel AI SDK RSC integration is cutting-edge. Add contingency plan: if `streamUI` doesn't meet requirements, fallback to standard component rendering with AI-generated props.
3. **PDF Export Library Validation** (Epic 7, Story 7.6): @react-pdf/renderer may struggle with complex templates. Consider Puppeteer as backup mentioned in questionable decisions.

**MEDIUM PRIORITY**:
1. **First Epic Missing Value Delivery** (Epic 1): Story 1.4 creates dashboard but all features are placeholders. Consider adding "Create Sample CV" functionality so Epic 1 delivers actual value, not just infrastructure.
2. **Credit System in Two Epics** (Epic 4 & 8): Credit deduction implemented in Epic 4, but full payment integration in Epic 8. This creates partial monetization early. Clarify if Epic 4 includes manual credit grants for testing.
3. **Template Count Inconsistency**: Requirements specify 3 templates (FR13), but UI Goals mentions "at least 3", and Epic 3 (Story 3.6) adds 2 more to existing 1 = 3 total. Consistent but could be clearer that "Modern Tech" from Epic 2 counts as first template.

**LOW PRIORITY**:
1. **Local Testability Not Explicit**: Checklist item 4.3 asks for local testability (CLI) in backend story ACs. Most stories lack this, but acceptable for web app with UI-based testing.
2. **Monitoring Needs** (Epic 1, Story 1.6): Sentry and PostHog added early, but specific metrics/dashboards not defined until Epic 9. Consider deferring to Epic 9 for simplicity.
3. **Version Control Missing from First Epic**: No "Initialize Git repo" story in Epic 1, assumed already done. Add explicit story or call out assumption.

### MVP Scope Assessment

**Features That Could Be Cut for True MVP**:
- **Epic 5 (Generative UI)**: Entire epic is "wow factor" but not essential for core value. AI chat with text responses (Epic 4) delivers conversational editing. Generative UI could be post-MVP.
- **Story 6.2 (LinkedIn Import)**: PDF CV import (6.1) likely covers 80% of use cases. LinkedIn could be Phase 2.
- **Story 7.7 (Multiple Export Formats)**: PDF export (7.6) is sufficient for MVP. DOCX and Plain Text are nice-to-haves.
- **Epic 8 (Payments)**: For portfolio project, could launch with unlimited free tier and add monetization post-validation.

**Missing Features That Are Essential**: None - all core workflows covered.

**Complexity Concerns**:
1. **Epic 7 (ATS Analysis)**: Fine-tuning, dataset creation, and analysis pipeline is most complex epic. 7 stories may underestimate effort.
2. **Epic 5 (Generative UI)**: Experimental technology risk - 6 stories assume smooth integration, but could require significant debugging.
3. **Epic 3 (Design Panel)**: Figma-quality controls are ambitious. 6 stories may be optimistic for polished UX.

**Timeline Realism**:
- 9 epics × ~1.5 weeks = 13.5 weeks nominal
- Actual 12-week timeline leaves ~1.5 weeks contingency
- If any epic runs over (likely Epic 5 or 7), timeline at risk
- **Recommendation**: Designate Epic 5 as stretch goal, proceed with Epics 1-4, 6-9 as core MVP (8 epics = 12 weeks exactly)

### Technical Readiness

**Clarity of Technical Constraints**: ✅ Excellent
- Stack fully defined: Next.js 15, Prisma, Neon, Vercel AI SDK, OpenAI, Stripe
- Architecture decisions documented with rationale
- Cost constraints explicit ($50/month operational, $1/user AI cost)
- Performance targets defined (NFRs)

**Identified Technical Risks**:
1. **AI Cost Overruns**: $40/month AI budget could be exceeded if usage spikes. Mitigation: Rate limiting, aggressive caching, model routing strategy documented.
2. **Vercel Function Timeouts**: PDF generation and ATS analysis may exceed 10s limit. Mitigation: Background jobs via Trigger.dev (documented in Epic 7).
3. **Fine-Tuning ROI**: $50 training cost may not yield better results than few-shot GPT-4o. Mitigation: Acceptance criteria includes performance threshold (>85% accuracy).

**Areas Needing Architect Investigation**:
1. **Template Variable System** (Epic 3, Story 3.5): JSON schema + CSS custom properties pattern needs architectural validation. How are variables validated, persisted, and applied?
2. **AI Tool Calling Execution Flow** (Epic 4, Story 4.4): How do Server Actions handle optimistic UI updates, rollback on failure, and concurrent tool calls?
3. **Vector Embedding Strategy** (Epic 6, Story 6.4): When to embed (on save, on demand), cache strategy, cost optimization for bulk embeds.
4. **Design Panel Real-Time Updates** (Epic 3): Debouncing strategy, state management (Zustand vs React state), CSS custom property injection mechanism.

### Recommendations

**Before Architecture Phase**:
1. ✅ **Designate Epic 5 as Stretch Goal**: Move Generative UI to optional post-MVP enhancement. Keep Epics 1-4, 6-9 as core 12-week timeline.
2. ✅ **Validate ATS Fine-Tuning Budget**: Run cost estimate with OpenAI pricing. If >$50, switch Story 7.2 acceptance criteria to "few-shot prompting with GPT-4o" as primary approach.
3. ✅ **Add Epic 1 Value Story**: Include "Story 1.7: Create Sample CV Template" so first epic delivers usable artifact, not just infrastructure.

**During Architecture Phase**:
1. Architect should validate template variable system design (JSON schema + CSS custom properties)
2. Design Tool Calling execution flow with error handling, optimistic updates, rollback
3. Specify vector embedding cache strategy and cost optimization
4. Define observability strategy (what metrics matter for PostHog/Sentry)

**For PM Consideration**:
1. **Timeline Contingency**: If timeline pressure emerges, drop Epic 5 (Generative UI) and Epic 8 (Payments) - still delivers impressive portfolio project.
2. **Beta Testing Early**: Consider recruiting beta testers in Week 6-8 (during Epic 6-7 development) for earlier feedback loop.
3. **Technical Spike Stories**: Epic 5 (Generative UI) and Epic 7 (Fine-Tuning) could benefit from spike stories to validate approach before committing to full implementation.

### Final Decision

**✅ READY FOR ARCHITECT**

The PRD and epics are comprehensive, properly structured, and ready for architectural design. The problem statement is clear, MVP scope is well-defined (with recommended adjustments), requirements are testable and specific, and technical guidance provides strong foundation.

**Key Strengths**:
- Three-pillar UI vision (AI + Preview + Design) is differentiated and exciting
- Vercel AI SDK integration shows understanding of cutting-edge patterns
- Epic sequencing is logical with clear dependencies
- Requirements balance technical specificity with implementation flexibility
- Project Brief provides exceptional foundation

**Recommended Adjustments** (not blockers):
1. Designate Epic 5 as stretch goal (timeline risk mitigation)
2. Add value delivery to Epic 1 (sample CV creation)
3. Validate ATS fine-tuning budget before committing

**Next Step**: Proceed to Architecture phase with focus on Template Variable System, Tool Calling Flow, and Vector Embedding Strategy as priority design areas.

---

## Next Steps

### UX Expert Prompt

```
I have a comprehensive PRD for AltocV2, an AI-powered CV builder with a three-pillar architecture:
conversational AI editor, live preview, and Figma-inspired design panel. The product focuses on
helping professionals create ATS-optimized CVs through natural conversation, visual customization,
and smart import/export features.

Please review the attached PRD (docs/prd.md) and create a detailed UX/UI architecture document that:

1. Defines the complete information architecture and navigation structure
2. Specifies all screen layouts and responsive behaviors for the three-pillar interface
3. Details component library requirements (building on shadcn/ui)
4. Designs user flows for critical journeys: CV creation, AI conversation, design customization, ATS analysis
5. Creates interaction patterns for the design panel (color pickers, sliders, font selectors)
6. Defines the design system: typography scale, color palettes, spacing system, component states
7. Addresses accessibility requirements (WCAG AA compliance)
8. Provides guidance for generative UI components from Vercel AI SDK

Focus on creating a UX architecture that balances the complexity of three simultaneous panels
with the need for clarity and ease of use. The target is a 3-month MVP, so prioritize pragmatic
solutions over perfection.
```

### Architect Prompt

```
I have a comprehensive PRD for AltocV2, an AI-powered CV builder with advanced features including
conversational editing via Vercel AI SDK, fine-tuned ATS analysis, vector-based job matching,
and real-time design customization. This is a 3-month solo portfolio project with strict cost
constraints (<$50/month operational).

Please review the attached PRD (docs/prd.md) and create a detailed technical architecture document that:

1. Designs the complete system architecture (Next.js 15 app structure, data flow, API boundaries)
2. Defines the database schema (Prisma models for Users, CVs, Credits, Jobs, Embeddings, etc.)
3. Specifies the AI integration architecture (multi-provider routing, context management, tool calling flow)
4. Designs the template variable system (JSON schema, CSS custom properties, state management)
5. Architects the credit system (transactional guarantees, race condition prevention, audit trail)
6. Plans the vector embedding strategy (when to embed, caching, pgvector setup)
7. Defines the real-time preview update mechanism (design panel → CSS variables → live preview)
8. Specifies the background job architecture (PDF generation, ATS analysis via Trigger.dev)
9. Designs the Stripe webhook processing with idempotency
10. Plans observability (Sentry, PostHog, key metrics to track)

Key architectural challenges to address:
- Template variable system that's flexible but performant
- AI tool calling with optimistic UI and rollback
- Cost optimization for AI operations (caching, model routing)
- Generative UI component rendering (RSC integration)

Constraints:
- Solo developer, pragmatic over perfect
- Must stay within $50/month operational costs
- Support 1000+ users on Vercel serverless
- 3-month development timeline
```
