# User Interface Design Goals

## Overall UX Vision

AltocV2 should feel like a **conversation with an expert career coach meets a professional design tool**, not a traditional form-filling experience. The interface combines three equal pillars: (1) conversational AI that modifies content in real-time, (2) elegant live preview that reflects changes instantly, and (3) visual design editor for fine-tuning aesthetics. Users should experience a "magic moment" when they see the AI modify their CV in real-time as they chat, then seamlessly switch to adjusting design variables like colors, fonts, and spacing with Figma-like elegance. The design prioritizes **speed, clarity, and creative control**: minimal clicks to value, instant feedback, and zero confusion about what's happening. The aesthetic is **modern, clean, and trustworthy** - this is a professional tool handling career-critical content.

## Key Interaction Paradigms

- **Three-panel workspace**: (1) AI chat sidebar, (2) live CV preview center canvas, (3) design panel for visual customization - toggleable to maximize space
- **Conversational-first with dual editing modes**: Primary workflow is chat for content, but users can click directly into CV for inline editing OR open design panel for visual variables
- **Real-time design feedback**: Changing a color variable instantly updates the live preview - no "apply" button needed
- **Optimistic updates with streaming**: CV changes appear instantly as AI responds or as design variables adjust
- **Auto-save as a feature, not a promise**: Visible "Saved 2s ago" indicator builds trust that work is never lost
- **Progressive disclosure**: Start simple (basic CV with chat), reveal complexity (design panel, ATS analysis, job matching) as user explores
- **One-click actions from AI suggestions**: "Add Python to Skills [Apply]" buttons for instant implementation
- **Template variables as design foundation**: Each template exposes customizable variables (primary color, accent color, font pairing, spacing density, section order)

## Core Screens and Views

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

## Accessibility: WCAG AA

AltocV2 will target **WCAG 2.1 Level AA compliance** to ensure professional accessibility without over-engineering for a portfolio MVP. This includes: keyboard navigation for all interactive elements, sufficient color contrast ratios (4.5:1 for text), screen reader compatible labels and ARIA attributes, focus indicators on all focusable elements, responsive text sizing, and accessible color picker with contrast validation.

**Assumption**: Given the 3-month timeline and solo development, full AAA compliance or extensive testing with assistive technologies is out of scope. Design panel controls must be keyboard-accessible but may not have perfect screen reader experience initially.

## Branding

**Visual Style**: Modern SaaS aesthetic inspired by Linear, Vercel, Figma, and shadcn/ui - clean typography, generous whitespace, subtle shadows, and professional color palette. The design panel itself should feel as polished as Figma's properties panel - smooth sliders, elegant color pickers, professional control layouts. Primary brand color should convey **trust and competence** (deep blue or professional teal), with accent colors for success states (green) and warnings (amber).

**Tone**: Professional yet approachable - "your smart colleague who's great at CVs AND design" not "corporate HR department"

**No custom illustrations or brand assets** - rely on shadcn/ui components, Lucide icons, and Tailwind utilities to maintain consistency without design overhead.

**Assumption**: Using pre-built component library (shadcn/ui) for 90% of UI, with custom design panel controls inspired by Figma's UI patterns.

## Target Device and Platforms: Web Responsive

**Primary target**: Desktop browsers (1440px+) for full three-panel workflow - this is focused work that benefits from screen real estate for simultaneous AI chat, preview, and design control

**Secondary support**: Tablet (768px-1280px) with adapted layout (two-panel mode with toggleable chat/design, always-visible preview)

**Mobile (320px-768px)**: View-only or light editing capability - primarily for reviewing CVs on the go. Chat interface works well on mobile, but design panel and complex editing are desktop-only features.

**Platform priority**: Chrome/Edge (primary), Safari (important for Mac users), Firefox (nice to have). No IE11 or legacy browser support.

**Assumption**: Most serious CV creation and design work happens at a desk, so optimizing mobile editing is lower priority than nailing desktop three-panel experience.

---
