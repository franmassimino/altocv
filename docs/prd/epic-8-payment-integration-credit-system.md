# Epic 8: Payment Integration & Credit System

**Goal**: Integrate Stripe for subscription management and credit purchases. Implement complete payment workflows including checkout, webhooks, subscription upgrades/downgrades, and credit refill. This epic delivers the monetization infrastructure enabling future revenue generation.

## Story 8.1: Setup Stripe Account and Products

As a **developer**,
I want **Stripe configured with product definitions and pricing tiers**,
so that **I can process payments and manage subscriptions programmatically**.

**Acceptance Criteria**:
1. Stripe account created with test and production API keys
2. Products created in Stripe Dashboard: Free (metadata only), Pro ($9.99/month), Credit Pack ($4.99 for 100 credits)
3. Webhook endpoint configured in Stripe Dashboard pointing to `/api/webhooks/stripe`
4. Stripe SDK installed and initialized in Next.js project
5. Environment variables set for publishable and secret keys (test and production)
6. Test mode verified with Stripe test cards (4242 4242 4242 4242)
7. Product/price IDs stored in environment variables

## Story 8.2: Build Subscription Checkout Flow

As a **user**,
I want **to upgrade to Pro subscription through a seamless checkout**,
so that **I can access unlimited CVs and more credits without friction**.

**Acceptance Criteria**:
1. "Upgrade to Pro" button in UI opens Stripe Checkout modal/redirect
2. Server Action creates Stripe Checkout Session with Pro subscription price
3. Success URL redirects to dashboard with success message
4. Cancel URL returns to pricing page
5. Customer metadata includes user ID for webhook mapping
6. Trial period configured (7 days free trial for Pro)
7. Checkout supports multiple payment methods (card, Google Pay, Apple Pay)

## Story 8.3: Implement Stripe Webhook Handler

As a **developer**,
I want **webhook events from Stripe processed reliably**,
so that **user subscriptions and credits update automatically when payments succeed or fail**.

**Acceptance Criteria**:
1. API route `/api/webhooks/stripe` receives and verifies Stripe webhook signatures
2. Event handlers created for: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
3. Idempotency handling prevents duplicate processing (use event ID as idempotency key)
4. User tier updated to PRO on successful subscription
5. Credits allocated on subscription renewal (500 credits/month for Pro)
6. Failed payments trigger email notification and grace period (3 days)
7. Webhook logs stored in database for debugging

## Story 8.4: Create Stripe Customer Portal Integration

As a **user**,
I want **to manage my subscription (update payment, cancel, view invoices) from my account**,
so that **I have full control without contacting support**.

**Acceptance Criteria**:
1. "Manage Subscription" button in settings creates Stripe Customer Portal session
2. Portal allows: update payment method, cancel subscription, view billing history, download invoices
3. Portal return URL points to user settings page
4. Subscription cancellation triggers immediate downgrade at period end (no prorated refund)
5. Portal customized with brand colors and logo
6. User without subscription sees "No active subscription" message
7. Portal session expires after 1 hour for security

## Story 8.5: Implement One-Time Credit Purchase

As a **user**,
I want **to buy additional credits without subscribing to Pro**,
so that **I can top up my balance when needed without monthly commitment**.

**Acceptance Criteria**:
1. "Buy Credits" button opens modal with credit pack options (100 credits for $4.99)
2. Checkout Session created for one-time payment (mode: 'payment')
3. Successful purchase adds credits to user balance via webhook
4. Credit purchase recorded in `CreditTransaction` table with type: PURCHASE
5. Email receipt sent automatically by Stripe
6. User can purchase multiple packs (no limit)
7. Credits from purchases never expire (unlike monthly subscription credits)

## Story 8.6: Build Pricing Page and Tier Comparison

As a **user**,
I want **a clear pricing page showing Free vs Pro tiers with feature comparison**,
so that **I can decide if Pro subscription is worth the investment**.

**Acceptance Criteria**:
1. Pricing page route `/pricing` with two-column comparison: Free vs Pro
2. Features listed with checkmarks: CV limit (3 vs unlimited), Credits (50 initial + 10/month vs 500/month), Templates (1 vs 3), Priority support (No vs Yes)
3. "Current Plan" badge shown on user's active tier
4. CTA buttons: "Get Started" (Free), "Upgrade to Pro" (Pro)
5. FAQ section answers common questions (refunds, cancellation, credit rollover)
6. Pricing displayed with annual option (save 20%): $9.99/month or $95.88/year
7. Social proof: "Join 500+ professionals using AltoCV" (update number dynamically)

## Story 8.7: Add Credit Usage Analytics Dashboard

As a **user**,
I want **to see my credit usage history and remaining balance**,
so that **I can track spending and know when to buy more credits**.

**Acceptance Criteria**:
1. Settings page shows current credit balance prominently with progress bar
2. Transaction history table: Date, Type (Chat, Export, ATS Analysis), Amount, Balance After
3. Filter transactions by date range and type
4. Monthly usage chart shows credit spending over time (last 6 months)
5. "Low Balance" warning appears when credits drop below 20
6. Pro users see monthly credit refresh date: "Next refill: Feb 1, 2025 (500 credits)"
7. Export transaction history to CSV for personal records

---
