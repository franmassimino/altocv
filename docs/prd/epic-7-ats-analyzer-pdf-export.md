# Epic 7: ATS Analyzer & PDF Export

**Goal**: Implement a fine-tuned ATS analysis engine that identifies compatibility issues with Applicant Tracking Systems and provides actionable feedback. Enable professional PDF export with ATS-optimized formatting. This epic delivers the critical differentiation feature that helps users ensure their CVs pass automated screening.

## Story 7.1: Create ATS Training Dataset

As a **developer**,
I want **a dataset of job postings, CVs, and ATS compatibility annotations**,
so that **I can fine-tune a model to identify real ATS issues accurately**.

**Acceptance Criteria**:
1. Scrape 200+ job postings from LinkedIn/Indeed (diverse industries and roles)
2. Collect 100+ example CVs (mix of ATS-friendly and problematic formatting)
3. Synthesize 200+ CV-job pairs with GPT-4 including compatibility scores and issue lists
4. Dataset format: `{ cv_text, job_description, compatibility_score, issues[], suggestions[] }`
5. Issues categorized: Formatting (headers, fonts), Keywords (missing, density), Structure (sections, ordering), Length (too long/short)
6. Dataset stored as JSONL file for fine-tuning
7. Train/validation split (80/20) for evaluation

## Story 7.2: Fine-Tune GPT-4o-mini for ATS Analysis

As a **developer**,
I want **a fine-tuned model specialized in ATS compatibility analysis**,
so that **ATS feedback is more accurate than generic LLM responses**.

**Acceptance Criteria**:
1. Fine-tuning job created using OpenAI API with prepared dataset
2. Model trained to identify specific issues and provide actionable suggestions
3. Validation set performance evaluated: accuracy >85% in issue detection
4. Fine-tuned model ID stored in environment variables
5. Cost analysis shows fine-tuning fits within budget (<$50 for training)
6. Fallback to GPT-4o with few-shot examples if fine-tuning is too expensive/slow
7. Model versioning system to track fine-tune iterations

## Story 7.3: Build ATS Analysis Pipeline

As a **user**,
I want **to run an ATS compatibility check on my CV and see a detailed report**,
so that **I know exactly what issues could cause my CV to be rejected by automated systems**.

**Acceptance Criteria**:
1. "Run ATS Analysis" button in editor toolbar triggers analysis (costs 10 credits)
2. Server Action extracts CV as plain text and structured JSON
3. Fine-tuned model analyzes CV with optional job posting context
4. Results include: overall score (0-100), critical issues, warnings, suggestions
5. Analysis stored in database linked to CV with timestamp
6. Loading state shows "Analyzing your CV..." with estimated time (15-30 seconds)
7. Error handling for API failures with retry option

## Story 7.4: Create ATS Report Dashboard

As a **user**,
I want **a visual report showing my ATS compatibility score and issues**,
so that **I can quickly understand what needs fixing and prioritize changes**.

**Acceptance Criteria**:
1. Report page displays circular gauge showing overall score with color coding
2. Issues grouped by severity: Critical (red, blocks ATS), Warnings (yellow, reduces score), Suggestions (blue, improvements)
3. Each issue shows: title, description, affected section, estimated impact on score
4. "Fix This" button for fixable issues (e.g., missing keywords → add skill)
5. Progress tracker shows: "3/7 critical issues resolved"
6. Report can be regenerated to reflect CV changes
7. Share report link (read-only) for feedback from others

## Story 7.5: Implement One-Click ATS Fixes

As a **user**,
I want **to apply ATS fixes with one click instead of manual editing**,
so that **I can quickly improve my score without tedious work**.

**Acceptance Criteria**:
1. Fixable issues have "Apply Fix" button that executes predefined tool call
2. Fix types: Add missing keyword to skills, reformat headers, adjust section order, reduce length
3. Fix preview shown before applying: "This will add 'Python, AWS, Docker' to Skills section"
4. Applying fix deducts credits (1 credit per fix) and updates CV immediately
5. Undo option available for last 5 applied fixes
6. Batch "Fix All" button applies all automated fixes with confirmation dialog
7. Non-automatable fixes show manual guidance (e.g., "Add quantified achievements to your experience bullets")

## Story 7.6: Build PDF Export with ATS Optimization

As a **user**,
I want **to export my CV as an ATS-friendly PDF**,
so that **I can submit it to job applications with confidence it will be parsed correctly**.

**Acceptance Criteria**:
1. "Export PDF" button in toolbar triggers export (costs 2 credits)
2. @react-pdf/renderer generates PDF on backend serverless function
3. PDF formatting optimized for ATS: clean fonts (no decorative), simple structure, no images/graphics in text areas, proper heading hierarchy
4. Export includes metadata: title, author, keywords for better parsing
5. Generated PDF uploaded to Vercel Blob Storage with signed URL (expires in 7 days)
6. Download link provided with option to generate new copy
7. PDF preview shown before final download with warning if ATS score is low (<70%)

## Story 7.7: Add Export Format Options

As a **user**,
I want **multiple export formats (PDF, DOCX, Plain Text) to match different application requirements**,
so that **I can submit my CV in whatever format the employer requests**.

**Acceptance Criteria**:
1. Export dropdown offers: PDF (ATS-optimized), DOCX (Word compatible), Plain Text (email/paste)
2. DOCX generation using docx library with simple formatting
3. Plain Text export removes all formatting, preserves structure with Markdown
4. Each export format costs credits: PDF (2), DOCX (2), Plain Text (1)
5. Export history saved in database with format, timestamp, download count
6. "Re-download" option for previous exports without re-generating (no credit cost)
7. Batch export: "Export as PDF + DOCX" with single click

---
