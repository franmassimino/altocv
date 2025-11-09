# Frontend Architecture

## Component Organization

```
components/
├── ui/                          # shadcn/ui components
├── cv-editor/                   # CV editing
├── cv-templates/                # Template rendering
├── design-panel/                # Design controls
├── chat/                        # AI chat
├── ats/                         # ATS analysis
├── jobs/                        # Job matching
├── payments/                    # Stripe UI
├── export/                      # Export UI
└── auth/                        # Auth UI
```

## State Management

- **Server State (TanStack Query)**: User data, CV list, job postings
- **Client State (Zustand)**: CV editor, design panel, UI flags
- **URL State**: Pagination, filters, modals
- **AI State (Vercel AI SDK)**: Chat messages, streaming

## Routing

```
app/
├── (marketing)/                 # Public routes
│   ├── page.tsx                 # Landing
│   └── pricing/
├── (authenticated)/             # Protected routes
│   ├── dashboard/
│   ├── editor/[cvId]/
│   └── settings/
├── api/                         # API routes
│   └── webhooks/stripe/
└── auth/                        # Auth pages
```

---
