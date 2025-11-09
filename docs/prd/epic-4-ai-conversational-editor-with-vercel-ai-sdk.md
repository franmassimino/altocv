# Epic 4: AI Conversational Editor with Vercel AI SDK

**Goal**: Integrate Vercel AI SDK to enable conversational CV editing with streaming responses, tool calling for structured actions, and credit-based usage tracking. Users can chat with AI to modify CV content, get suggestions, and perform complex edits through natural language. This epic delivers the AI pillar of the three-pillar architecture.

## Story 4.1: Setup Vercel AI SDK with Multi-Provider Configuration

As a **developer**,
I want **Vercel AI SDK configured with OpenAI and Anthropic providers**,
so that **I can route different AI tasks to appropriate models based on cost and capability**.

**Acceptance Criteria**:
1. `ai` package installed and configured in Next.js project
2. OpenAI provider configured with GPT-4o and GPT-4o-mini models
3. Anthropic provider configured with Claude 3.5 Haiku and Sonnet models
4. Environment variables set for API keys (OpenAI, Anthropic)
5. Model router utility created to select model based on task type (simple/complex)
6. AI SDK core functions tested: `generateText`, `streamText`, `generateObject`
7. Error handling for API failures with fallback to alternative provider

## Story 4.2: Build Chat UI with useChat Hook

As a **user**,
I want **a chat interface in the editor to converse with an AI assistant**,
so that **I can ask for help improving my CV through natural conversation**.

**Acceptance Criteria**:
1. Chat panel component created as collapsible left sidebar (400px width)
2. `useChat` hook from AI SDK integrated with streaming response display
3. Message list shows user messages and AI responses with timestamps
4. Input field with send button and keyboard shortcut (Cmd/Ctrl + Enter)
5. Streaming indicator shows AI is "thinking" and words appear progressively
6. Chat history persisted to database (last 50 messages per CV)
7. "Clear chat" button with confirmation dialog

## Story 4.3: Implement Credit System with Database Schema

As a **developer**,
I want **a credit system that tracks usage and prevents operations when balance is insufficient**,
so that **I can control AI costs and enable future monetization**.

**Acceptance Criteria**:
1. User model extended with `credits` (integer) and `tier` (enum: FREE, PRO) fields
2. `CreditTransaction` model tracks all credit changes with type, amount, description, timestamp
3. Credit costs defined as constants: Chat message (1), Create CV (5), Adapt CV (3), ATS analysis (10), Import (5), Export PDF (2)
4. Server Action for deducting credits with transaction-safe atomic decrement
5. Middleware checks credit balance before AI operations and returns error if insufficient
6. Credit balance displayed prominently in UI header with color coding (red if low)
7. New users receive 50 credits on signup

## Story 4.4: Add Tool Calling for CV Modifications

As a **developer**,
I want **AI to call predefined tools for CV operations**,
so that **AI responses translate to reliable, structured CV updates instead of parsing text**.

**Acceptance Criteria**:
1. Tool definitions created using AI SDK's tool calling API: `updateSection`, `addExperience`, `addEducation`, `addSkill`, `deleteItem`, `reorderSections`
2. Each tool has Zod schema for parameters (sectionId, content, position, etc.)
3. Server Action handles tool execution with CV state updates
4. AI receives CV current state in system prompt for context-aware suggestions
5. Tool execution deducts appropriate credits from user balance
6. Tool results returned to AI for confirmation message to user
7. Failed tool calls return error message that AI can explain to user

## Story 4.5: Create Context-Aware System Prompt

As a **developer**,
I want **a comprehensive system prompt that gives AI context about the CV and capabilities**,
so that **AI provides relevant, actionable suggestions tailored to the user's CV**.

**Acceptance Criteria**:
1. System prompt includes: AI role (CV improvement assistant), available tools, credit costs
2. Current CV content injected into system prompt (personal info, summary, sections)
3. Prompt instructs AI to be concise, action-oriented, and use tools when appropriate
4. Context window limited to last 10 messages to control token usage and costs
5. User's industry/role (if provided) included for tailored advice
6. Prompt includes ATS best practices (keywords, formatting, achievement quantification)
7. System prompt dynamically updates when CV content changes

## Story 4.6: Implement Streaming Responses with Optimistic UI

As a **user**,
I want **AI responses to appear word-by-word as they're generated**,
so that **I get immediate feedback and the experience feels conversational**.

**Acceptance Criteria**:
1. `useChat` hook configured for streaming with `streamText` API
2. AI response words appear progressively in chat bubble
3. When AI calls tool, optimistic update immediately shows change in CV preview
4. Loading skeleton shown in CV section being modified
5. If tool execution fails, change reverted with error toast
6. Credit deduction happens optimistically, refunded if operation fails
7. Stream can be cancelled mid-response with stop button

---
