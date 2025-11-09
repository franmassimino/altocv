# Epic 2: Visual CV Editor with Live Preview

**Goal**: Build the core WYSIWYG CV editor with template system, live preview, and persistent storage. Users can create a new CV, edit content inline with auto-save, view real-time preview, and manage multiple CV versions. This epic delivers the foundational editing experience before AI and design customization features.

## Story 2.1: Create CV Data Model and State Management

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

## Story 2.2: Build Basic CV Template Component

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

## Story 2.3: Implement Inline Editing with Click-to-Edit

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

## Story 2.4: Add CV Section Management (Add/Remove/Reorder)

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

## Story 2.5: Implement Auto-Save with Optimistic Updates

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

## Story 2.6: Create CV List Dashboard with CRUD Operations

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
