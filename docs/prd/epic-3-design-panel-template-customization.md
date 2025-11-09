# Epic 3: Design Panel & Template Customization

**Goal**: Implement a Figma-inspired design panel that allows users to customize CV visual appearance through variables (colors, fonts, spacing) with instant live preview. This epic delivers the visual design pillar of the three-pillar architecture (AI + Preview + Design).

## Story 3.1: Create Design Panel UI Component

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

## Story 3.2: Implement Color Customization Controls

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

## Story 3.3: Add Typography Customization

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

## Story 3.4: Create Spacing and Layout Controls

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

## Story 3.5: Build Template Variable System

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

## Story 3.6: Add Two Additional CV Templates

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
