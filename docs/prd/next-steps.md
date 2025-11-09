# Next Steps

## UX Expert Prompt

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

## Architect Prompt

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
