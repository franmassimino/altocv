<div align="center">

# AltoCV

**Your AI-Powered Career Coach for CV Creation**

Build, customize, and optimize your CV with conversational AI, live preview, and intelligent ATS analysis.

[Demo](#) • [Documentation](docs/) • [Contributing](#contributing)

---

</div>

## What is AltoCV?

AltoCV is a modern CV builder that combines **three powerful pillars** to revolutionize how you create and adapt your resume:

1. **Conversational AI Editor** - Chat naturally with an AI assistant that edits your CV in real-time
2. **Live Visual Preview** - See changes instantly with professional, customizable templates
3. **Design Panel** - Fine-tune colors, fonts, and spacing with Figma-inspired controls

Unlike traditional CV builders, AltoCV understands what Applicant Tracking Systems (ATS) look for and helps you create CVs that pass automated screening while maintaining professional design.

## Features

### Core Capabilities

- **AI-Powered Editing** - Conversational interface using Vercel AI SDK with streaming responses
- **Smart Templates** - Industry-optimized templates (Tech, Corporate, Creative) with full customization
- **ATS Analysis** - Fine-tuned AI engine that identifies compatibility issues and suggests fixes
- **Intelligent Import** - Parse existing CVs from PDF or LinkedIn exports
- **Job Matching** - Vector-based compatibility scoring between your CV and job postings
- **Real-time Design** - Instant visual updates as you customize colors, fonts, and spacing
- **Auto-save** - Never lose your work with continuous cloud synchronization
- **Multi-format Export** - ATS-friendly PDF, DOCX, and plain text formats

### Tech Highlights

- Built with **Next.js 15** (App Router, React Server Components)
- **Generative UI** with Vercel AI SDK for interactive AI components
- **Credit-based system** with Stripe integration for monetization
- **Vector embeddings** using pgvector for semantic job matching
- **Type-safe** with TypeScript strict mode and Zod validation
- **Responsive design** with Tailwind CSS and shadcn/ui components

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Zustand + TanStack Query
- Framer Motion

**Backend & Data**
- PostgreSQL (Neon Serverless)
- Prisma ORM
- NextAuth.js v5
- Upstash Redis
- Vercel Blob Storage

**AI/ML**
- Vercel AI SDK
- OpenAI (GPT-4o, embeddings)
- Anthropic (Claude 3.5)
- Supabase pgvector

**Infrastructure**
- Vercel (hosting)
- Stripe (payments)
- Sentry (monitoring)
- PostHog (analytics)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- PostgreSQL database (we recommend [Neon](https://neon.tech) for serverless)
- API keys for OpenAI and/or Anthropic
- Stripe account (for payment features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/altocv.git
   cd altocv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables in `.env.local`:
   ```bash
   # Database - Use your own database name
   DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name

   # Auth - Generate your own secret
   NEXTAUTH_SECRET=your-unique-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # OAuth providers (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # AI APIs (choose at least one)
   OPENAI_API_KEY=sk-...
   ANTHROPIC_API_KEY=sk-ant-...

   # Payment (optional for MVP)
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Storage (optional)
   BLOB_READ_WRITE_TOKEN=vercel_blob_...

   # Monitoring (optional)
   SENTRY_DSN=https://...
   NEXT_PUBLIC_POSTHOG_KEY=phc_...
   ```

   **Important**:
   - Replace `your_database_name` with your own unique database name
   - Generate a secure random string for `NEXTAUTH_SECRET`
   - Never commit `.env.local` to version control

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx dotenv -e .env.local -- prisma migrate dev

   # Test database connection (optional)
   npm run test:db
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npx prisma generate     # Generate Prisma Client
npx prisma studio       # Open database GUI
npx prisma migrate dev  # Create and apply migration

# Testing
npm test                # Run unit tests
npm run test:ui         # Run tests with UI
npm run test:e2e        # Run E2E tests

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
```

## Project Structure

```
altocv/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── cv-editor/   # CV editing components
│   ├── chat/        # AI chat interface
│   └── design-panel/# Design customization controls
├── lib/             # Utilities and helpers
│   ├── db.ts        # Prisma client
│   ├── ai/          # AI SDK integration
│   └── utils.ts     # Shared utilities
├── server/          # Server-only code
│   ├── actions/     # Server Actions
│   └── api/         # API route handlers
├── prisma/          # Database schema and migrations
└── public/          # Static assets
```

## Documentation

- [Project Brief](docs/brief.md) - Overview and vision
- [PRD](docs/prd.md) - Detailed product requirements
- [Architecture](docs/architecture.md) - Technical architecture
- [Stories](docs/stories/) - User stories and epics

## Contributing

We welcome contributions! This project is open source to help others learn and build similar applications.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm test && npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- AI integration powered by [Vercel AI SDK](https://sdk.vercel.ai)
- Database hosted on [Neon](https://neon.tech)

---

<div align="center">

**Built with passion to help professionals create better CVs**

[Report Bug](https://github.com/yourusername/altocv/issues) • [Request Feature](https://github.com/yourusername/altocv/issues)

</div>
