# Requirements

## Functional Requirements

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

## Non-Functional Requirements

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
