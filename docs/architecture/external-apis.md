# External APIs

## OpenAI API
- **Purpose:** LLM inference + embeddings
- **Base URL:** `https://api.openai.com/v1`
- **Authentication:** Bearer token
- **Key Endpoints:** `/chat/completions`, `/embeddings`

## Anthropic API
- **Purpose:** Alternative LLM (Claude 3.5)
- **Base URL:** `https://api.anthropic.com/v1`
- **Authentication:** `x-api-key` header
- **Key Endpoints:** `/messages`

## Stripe API
- **Purpose:** Payments
- **Base URL:** `https://api.stripe.com/v1`
- **Authentication:** Bearer token
- **Key Endpoints:** `/checkout/sessions`, `/billing_portal/sessions`, `/webhooks`

## Supabase (pgvector)
- **Purpose:** Vector database for job matching
- **Base URL:** `https://{PROJECT_ID}.supabase.co/rest/v1`
- **Authentication:** `apikey` header
- **Key Endpoints:** `/rpc/match_embeddings`

---
