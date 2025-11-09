# Introduction

This document outlines the complete fullstack architecture for AltocV2, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

## Starter Template or Existing Project

**Greenfield Project** - This is a new project from scratch, not based on an existing starter template.

**Initial Setup**: The project will be initialized with `create-next-app` using Next.js 15 with the following configuration:
- TypeScript strict mode enabled
- App Router (not Pages Router)
- Tailwind CSS pre-configured
- ESLint included

**Recommended Approach**: While no specific starter template is mandated, I recommend using **Next.js 15 + shadcn/ui initialization** as it provides:
- Clean Next.js 15 App Router setup
- Pre-configured shadcn/ui component system
- TypeScript with strict mode
- Tailwind CSS ready to go

This aligns with your tech preferences from the PRD (shadcn/ui for 90% of UI components, Next.js 15 App Router).

**Constraints**: None from a starter template. We have full flexibility in architectural decisions.

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-09 | 1.0 | Initial fullstack architecture document created from PRD and UX spec | Winston (Architect) |

---
