-- CreateEnum
CREATE TYPE "UserTier" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'canceled', 'past_due', 'trialing');

-- CreateEnum
CREATE TYPE "CreditTransactionType" AS ENUM ('INITIAL_GRANT', 'MONTHLY_REFILL', 'PURCHASE', 'CHAT_MESSAGE', 'CREATE_CV', 'ADAPT_CV', 'ATS_ANALYSIS', 'IMPORT_CV', 'EXPORT_PDF', 'REFUND', 'ADMIN_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('user', 'assistant', 'system');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "credits" INTEGER NOT NULL DEFAULT 50,
    "tier" "UserTier" NOT NULL DEFAULT 'FREE',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "subscriptionStatus" "SubscriptionStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CV" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "designSettings" JSONB NOT NULL,
    "atsScore" INTEGER,
    "lastAnalyzedAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "CreditTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "balanceAfter" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "toolCalls" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeSubscriptionId_key" ON "User"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "CV_userId_idx" ON "CV"("userId");

-- CreateIndex
CREATE INDEX "CreditTransaction_userId_createdAt_idx" ON "CreditTransaction"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ChatMessage_cvId_createdAt_idx" ON "ChatMessage"("cvId", "createdAt");

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE CASCADE ON UPDATE CASCADE;
