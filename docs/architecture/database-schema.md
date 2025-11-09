# Database Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                   String    @id @default(cuid())
  email                String    @unique
  name                 String?
  image                String?
  credits              Int       @default(50)
  tier                 UserTier  @default(FREE)
  stripeCustomerId     String?   @unique
  stripeSubscriptionId String?   @unique
  subscriptionStatus   SubscriptionStatus?
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  cvs                  CV[]
  creditTransactions   CreditTransaction[]
  chatMessages         ChatMessage[]
  jobPostings          JobPosting[]
  exportedPDFs         ExportedPDF[]

  @@index([email])
}

enum UserTier {
  FREE
  PRO
}

enum SubscriptionStatus {
  active
  canceled
  past_due
  trialing
}

model CV {
  id              String    @id @default(cuid())
  userId          String
  title           String
  templateId      String
  content         Json
  designSettings  Json
  atsScore        Int?
  lastAnalyzedAt  DateTime?
  version         Int       @default(1)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  chatMessages    ChatMessage[]
  jobMatches      JobMatch[]
  versions        CVVersion[]
  exportedPDFs    ExportedPDF[]

  @@index([userId])
}

model CVVersion {
  id                String    @id @default(cuid())
  cvId              String
  version           Int
  content           Json
  designSettings    Json
  changeDescription String?
  createdAt         DateTime  @default(now())

  cv                CV        @relation(fields: [cvId], references: [id], onDelete: Cascade)

  @@unique([cvId, version])
}

model CreditTransaction {
  id           String                  @id @default(cuid())
  userId       String
  type         CreditTransactionType
  amount       Int
  description  String
  metadata     Json?
  balanceAfter Int
  createdAt    DateTime                @default(now())

  user         User                    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
}

enum CreditTransactionType {
  INITIAL_GRANT
  MONTHLY_REFILL
  PURCHASE
  CHAT_MESSAGE
  CREATE_CV
  ADAPT_CV
  ATS_ANALYSIS
  IMPORT_CV
  EXPORT_PDF
  REFUND
  ADMIN_ADJUSTMENT
}

model ChatMessage {
  id        String   @id @default(cuid())
  cvId      String
  userId    String
  role      MessageRole
  content   String   @db.Text
  toolCalls Json?
  metadata  Json?
  createdAt DateTime @default(now())

  cv        CV       @relation(fields: [cvId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([cvId, createdAt])
}

enum MessageRole {
  user
  assistant
  system
}

model JobPosting {
  id            String   @id @default(cuid())
  userId        String
  title         String
  company       String
  url           String?
  rawContent    String   @db.Text
  extractedData Json
  createdAt     DateTime @default(now())

  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  jobMatches    JobMatch[]

  @@index([userId, createdAt])
}

model JobMatch {
  id              String   @id @default(cuid())
  cvId            String
  jobPostingId    String
  overallScore    Int
  skillsScore     Int
  experienceScore Int
  summaryScore    Int
  missingKeywords String[]
  suggestions     String[]
  createdAt       DateTime @default(now())

  cv              CV       @relation(fields: [cvId], references: [id], onDelete: Cascade)
  jobPosting      JobPosting @relation(fields: [jobPostingId], references: [id], onDelete: Cascade)

  @@unique([cvId, jobPostingId])
}

model ExportedPDF {
  id            String       @id @default(cuid())
  cvId          String
  userId        String
  format        ExportFormat
  blobUrl       String
  expiresAt     DateTime
  downloadCount Int          @default(0)
  createdAt     DateTime     @default(now())

  cv            CV           @relation(fields: [cvId], references: [id], onDelete: Cascade)
  user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
}

enum ExportFormat {
  PDF
  DOCX
  TXT
}
```

---
