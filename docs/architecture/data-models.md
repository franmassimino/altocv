# Data Models

Los modelos de datos core son compartidos entre frontend y backend vía TypeScript interfaces. Estos se mapearán a Prisma schema en la sección Database Schema.

## User

**Purpose:** Representa un usuario autenticado que crea y gestiona CVs. Contiene información de cuenta, créditos, y tier de suscripción.

**Key Attributes:**
- `id`: string (UUID) - Identificador único del usuario
- `email`: string - Email de Google OAuth (único)
- `name`: string | null - Nombre del usuario de Google profile
- `image`: string | null - Avatar URL de Google
- `credits`: number - Balance actual de créditos (default: 50)
- `tier`: enum ('FREE' | 'PRO') - Nivel de suscripción (default: FREE)
- `stripeCustomerId`: string | null - ID de cliente en Stripe
- `stripeSubscriptionId`: string | null - ID de suscripción activa
- `subscriptionStatus`: enum | null - Estado de suscripción Stripe
- `createdAt`: DateTime - Fecha de registro
- `updatedAt`: DateTime - Última actualización

**Relationships:**
- Has many `CV` (1:N)
- Has many `CreditTransaction` (1:N)
- Has many `JobPosting` (1:N)

**TypeScript Interface:**

```typescript
interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  credits: number;
  tier: 'FREE' | 'PRO';
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' | null;
  createdAt: Date;
  updatedAt: Date;
}
```

## CV

**Purpose:** Representa un CV completo con todo su contenido (secciones, diseño, configuración). Es el modelo central de la aplicación.

**Key Attributes:**
- `id`: string (UUID) - Identificador único del CV
- `userId`: string - FK a User (owner)
- `title`: string - Nombre del CV
- `templateId`: string - ID de template seleccionado
- `content`: JSON - Contenido estructurado del CV
- `designSettings`: JSON - Variables de diseño
- `atsScore`: number | null - Último score ATS (0-100)
- `lastAnalyzedAt`: DateTime | null
- `version`: number - Versión del CV
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Relationships:**
- Belongs to `User` (N:1)
- Has many `ChatMessage` (1:N)
- Has many `CVVersion` (1:N)
- Has many `JobMatch` (1:N)

**TypeScript Interface:**

```typescript
interface CV {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  content: CVContent;
  designSettings: DesignSettings;
  atsScore: number | null;
  lastAnalyzedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CVContent {
  personalInfo: PersonalInfo;
  summary?: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
}

interface DesignSettings {
  colors: {
    primary: string;
    accent: string;
    text: string;
    background: string;
  };
  typography: {
    fontPairing: string;
    headingSize: number;
    bodySize: number;
    lineHeight: number;
  };
  spacing: {
    density: number;
    sectionMargin: number;
    contentPadding: number;
  };
  layout: {
    sectionOrder: string[];
  };
}
```

## Other Models

See full Prisma schema below for complete definitions of:
- `CreditTransaction`
- `ChatMessage`
- `JobPosting`
- `JobMatch`
- `CVVersion`
- `ExportedPDF`

---
