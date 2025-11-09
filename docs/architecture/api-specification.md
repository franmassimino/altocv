# API Specification

AltoCV uses a **hybrid API approach**: **95% Server Actions** (type-safe RPC) for internal frontend-backend communication, and **5% REST API routes** for external webhooks (Stripe).

## Server Actions Specification

Server Actions are defined in `server/actions/` and imported directly in components. Key actions include:

**CV Management:**
- `getUserCVs()` - Get all CVs for current user
- `getCVById(cvId)` - Get single CV
- `createCV(data)` - Create new CV (deducts 5 credits)
- `updateCVContent(cvId, content)` - Update CV content
- `updateCVDesignSettings(cvId, settings)` - Update design
- `duplicateCV(cvId)` - Duplicate CV
- `deleteCV(cvId)` - Delete CV

**AI Chat:**
- `getChatMessages(cvId, limit?)` - Get chat history
- `sendChatMessage(cvId, message)` - Send message (streaming, deducts 1 credit)
- `clearChatHistory(cvId)` - Clear chat

**ATS Analysis:**
- `runATSAnalysis(cvId, jobPostingId?)` - Run analysis (deducts 10 credits)
- `applyATSFix(cvId, fixId)` - Apply fix (deducts 1 credit)

**Job Matching:**
- `importJobPosting(data)` - Import job from URL/text
- `calculateJobMatch(cvId, jobPostingId)` - Calculate compatibility
- `getCVJobMatches(cvId)` - Get all matches

**Export:**
- `exportCVToPDF(cvId)` - Export PDF (background job, deducts 2 credits)
- `getExportStatus(jobId)` - Check job status
- `getExportHistory()` - Get export history

**Credits & Subscription:**
- `getCreditBalance()` - Get current balance
- `getCreditHistory(limit?)` - Get transaction history
- `createProCheckoutSession()` - Create Stripe checkout
- `createCustomerPortalSession()` - Create portal session

## REST API Routes

**Stripe Webhook:**
```
POST /api/webhooks/stripe
Headers: stripe-signature
Body: Stripe Event object
Responses: 200 { received: true } | 400 | 500
```

**Health Check:**
```
GET /api/health
Response: { status: "ok", database: "connected", timestamp, version }
```

---
