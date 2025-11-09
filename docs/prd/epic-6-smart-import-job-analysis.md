# Epic 6: Smart Import & Job Analysis

**Goal**: Enable users to quickly populate CVs by importing from existing sources (PDF CVs, LinkedIn exports) and analyze job postings to extract requirements and calculate compatibility scores. This epic eliminates manual data entry and provides intelligent job matching using AI parsing and vector embeddings.

## Story 6.1: Build PDF CV Parser with GPT-4 Vision

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

## Story 6.2: Implement LinkedIn Profile Import

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

## Story 6.3: Create Job Posting URL Scraper

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

## Story 6.4: Build Vector Embedding System for Job Matching

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

## Story 6.5: Implement Job Compatibility Score Calculator

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

## Story 6.6: Create Job Analysis Dashboard

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
