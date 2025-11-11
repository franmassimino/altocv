<div align="center">

# 🚀 AltoCV

**Your AI-Powered Career Coach for CV Creation**

Build, customize, and optimize your CV with conversational AI, live preview, and intelligent ATS analysis.

[Demo](#) • [Documentation](docs/) • [Contributing](#contributing)

---

</div>

<!-- FEATURE_TIMELINE_START -->
## 📊 Feature Timeline

### ✅ Latest Feature Published

**Implement Authentication with NextAuth v5**

to register and login using Google OAuth or email magic links

### 🚀 Coming Next

🔜 **Create User Dashboard with Basic Layout** _(In Review)_

---

<!-- FEATURE_TIMELINE_END -->

## 💡 What is AltoCV?

AltoCV is a modern CV builder that combines **three powerful pillars** to revolutionize how you create and adapt your resume:

1.  **✍️ Conversational AI Editor** - Chat naturally with an AI assistant that edits your CV in real-time
2.  **👀 Live Visual Preview** - See changes instantly with professional, customizable templates
3.  **🎨 Design Panel** - Fine-tune colors, fonts, and spacing with Figma-inspired controls

Unlike traditional CV builders, AltocV2 understands what Applicant Tracking Systems (ATS) look for and helps you create CVs that pass automated screening while maintaining professional design.

## ✨ Core Features

### 🛠️ Core Capabilities

* **AI-Powered Editing** - Conversational interface using Vercel AI SDK with streaming responses
* **Smart Templates** - Industry-optimized templates (Tech, Corporate, Creative) with full customization
* **ATS Analysis** - Fine-tuned AI engine that identifies compatibility issues and suggests fixes
* **Intelligent Import** - Parse existing CVs from PDF or LinkedIn exports
* **Job Matching** - Vector-based compatibility scoring between your CV and job postings
* **Real-time Design** - Instant visual updates as you customize colors, fonts, and spacing
* **Auto-save** - Never lose your work with continuous cloud synchronization
* **Multi-format Export** - ATS-friendly PDF, DOCX, and plain text formats

### 💻 Tech Highlights

* Built with **Next.js 15** (App Router, React Server Components)
* **Generative UI** with Vercel AI SDK for interactive AI components
* **Credit-based system** with Stripe integration for monetization
* **Vector embeddings** using `pgvector` for semantic job matching
* **Type-safe** with TypeScript strict mode and Zod validation
* **Responsive design** with Tailwind CSS and `shadcn/ui` components

## ⚙️ Tech Stack

### Frontend
* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS + `shadcn/ui`
* Zustand + TanStack Query
* Framer Motion

### Backend & Data
* PostgreSQL (Neon Serverless)
* Prisma ORM
* NextAuth.js v5
* Upstash Redis
* Vercel Blob Storage

### AI/ML
* Vercel AI SDK
* OpenAI (GPT-4o, embeddings)
* Anthropic (Claude 3.5)
* Supabase `pgvector`

### Infrastructure
* Vercel (hosting)
* Stripe (payments)
* Sentry (monitoring)
* PostHog (analytics)

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+ and npm/pnpm/yarn
* PostgreSQL database (we recommend [Neon](https://neon.tech) for serverless)
* API keys for OpenAI and/or Anthropic
* Stripe account (for payment features)

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

   # OAuth providers (required for authentication)
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
   - Generate a secure random string for `NEXTAUTH_SECRET` (use `openssl rand -base64 32`)
   - Never commit `.env.local` to version control

4. **Set up Google OAuth (Required for Authentication)**

   AltoCV uses Google OAuth for user authentication. Follow these steps to set it up:

   a. Go to [Google Cloud Console](https://console.cloud.google.com/)

   b. Create a new project or select an existing one

   c. Enable the Google OAuth 2.0 API:
      - Navigate to "APIs & Services" > "Credentials"
      - Click "Create Credentials" > "OAuth 2.0 Client ID"
      - Configure OAuth consent screen if prompted (required first time)

   d. Configure OAuth 2.0 Client:
      - Application type: "Web application"
      - Authorized redirect URIs:
        - Development: `http://localhost:3000/api/auth/callback/google`
        - Production: `https://yourdomain.com/api/auth/callback/google`

   e. Copy the Client ID and Client Secret to your `.env.local` file

5. **Set up the database**
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

# Documentation
npm run update:timeline # Update feature timeline in README
```

---

## 🚢 Deployment

### Deploy to Vercel

AltoCV is optimized for deployment on Vercel with zero configuration.

#### Prerequisites for Production
- [Vercel account](https://vercel.com/signup)
- Production PostgreSQL database (Neon recommended)
- Google OAuth credentials configured for production domain

#### Quick Deploy

1. **Connect GitHub Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

2. **Configure Environment Variables**

   Add these environment variables in Vercel Project Settings → Environment Variables:

   ```bash
   # Database (Production)
   DATABASE_URL=postgresql://user:password@host/database?pgbouncer=true

   # Auth
   NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
   NEXTAUTH_URL=https://your-domain.vercel.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Analytics (Optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   **Important Notes:**
   - Generate a **new** `NEXTAUTH_SECRET` for production (don't reuse dev secret)
   - Use Neon's pooled connection URL (with `?pgbouncer=true`) for serverless
   - Set `NEXTAUTH_URL` to your actual production domain

3. **Update Google OAuth Redirect URIs**

   Add production callback URL to your Google Cloud Console OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Select your OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`
   - Add authorized JavaScript origin: `https://your-domain.vercel.app`
   - Save changes

4. **Deploy**
   - Push to `main` branch or click "Deploy" in Vercel dashboard
   - Vercel will automatically:
     - Run `npm install`
     - Execute `prisma generate` (via postinstall script)
     - Build the application
     - Deploy to edge network

5. **Verify Deployment**
   - Visit your production URL
   - Test health check: `https://your-domain.vercel.app/api/health`
   - Verify Google OAuth login works
   - Check dashboard loads with user data

#### Automatic Deployments

Once connected, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a unique preview URL

#### Health Check Endpoint

AltoCV includes a health check endpoint for monitoring:

**Endpoint:** `GET /api/health`

**Success Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

**Error Response (503 Service Unavailable):**
```json
{
  "status": "error",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "disconnected",
  "error": "Connection refused"
}
```

Use this endpoint for uptime monitoring, load balancer health checks, or CI/CD validation.

#### Troubleshooting Deployment

**Build fails with Prisma errors:**
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check that `postinstall` script exists in `package.json`
- Verify database is accessible from Vercel servers

**OAuth login fails in production:**
- Verify redirect URIs are added to Google Cloud Console
- Check `NEXTAUTH_URL` matches your actual domain
- Ensure `NEXTAUTH_SECRET` is set (different from development)

**Database connection errors:**
- Use Neon's pooled connection URL (ends with `?pgbouncer=true`)
- Verify database allows connections from Vercel IPs
- Check connection string format is correct

**Environment variables not loading:**
- Redeploy after adding/updating environment variables
- Verify variables are set for "Production" environment
- Check for typos in variable names

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

