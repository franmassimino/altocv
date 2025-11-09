<div align="center">

# 🚀 AltoCV

**Tu Asistente Profesional Impulsado por IA para la Creación de CV**

Construye, personaliza y optimiza tu currículum vitae con IA conversacional, vista previa en vivo y análisis inteligente de ATS.

[Demo](#) • [Documentación](docs/) • [Contribuir](#contributing)

---

</div>

## 💡 ¿Qué es AltoCV?

AltoCV es un constructor de CV moderno que combina **tres pilares poderosos** para revolucionar la forma en que creas y adaptas tu currículum:

1.  **✍️ Editor de IA Conversacional** - Chatea de forma natural con un asistente de IA que edita tu CV en tiempo real
2.  **👀 Vista Previa Visual en Vivo** - Observa los cambios al instante con plantillas profesionales y personalizables
3.  **🎨 Panel de Diseño** - Ajusta colores, fuentes y espaciado con controles inspirados en Figma

A diferencia de los constructores de CV tradicionales, AltocV2 entiende lo que buscan los Applicant Tracking Systems (ATS) y te ayuda a crear CVs que pasan la detección automatizada mientras mantienen un diseño profesional.

## ✨ Características Principales

### 🛠️ Capacidades Centrales

* **Edición Impulsada por IA** - Interfaz conversacional que utiliza Vercel AI SDK con respuestas de streaming
* **Plantillas Inteligentes** - Plantillas optimizadas para la industria (Tech, Corporativo, Creativo) con personalización total
* **Análisis ATS** - Motor de IA ajustado que identifica problemas de compatibilidad y sugiere correcciones
* **Importación Inteligente** - Analiza CVs existentes desde PDF o exportaciones de LinkedIn
* **Emparejamiento de Empleos** - Puntuación de compatibilidad basada en vectores entre tu CV y las ofertas de trabajo
* **Diseño en Tiempo Real** - Actualizaciones visuales instantáneas al personalizar colores, fuentes y espaciado
* **Guardado Automático** - Nunca pierdas tu trabajo con la sincronización continua en la nube
* **Exportación Multi-formato** - Formatos PDF, DOCX y texto plano amigables con ATS

### 💻 Aspectos Técnicos Destacados

* Construido con **Next.js 15** (App Router, React Server Components)
* **Generative UI** con Vercel AI SDK para componentes de IA interactivos
* **Sistema basado en créditos** con integración de Stripe para la monetización
* **Embeddings vectoriales** utilizando `pgvector` para el emparejamiento semántico de trabajos
* **Type-safe** con TypeScript en modo estricto y validación Zod
* **Diseño Responsivo** con Tailwind CSS y componentes `shadcn/ui`

## ⚙️ Pila Tecnológica (Tech Stack)

### Frontend
* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS + `shadcn/ui`
* Zustand + TanStack Query
* Framer Motion

### Backend & Datos
* PostgreSQL (Neon Serverless)
* Prisma ORM
* NextAuth.js v5
* Upstash Redis
* Vercel Blob Storage

### AI/ML
* Vercel AI SDK
* OpenAI (GPT-4o, embeddings)
* Anthropic (Claude 3.5)
* Supabase `pgvector`

### Infraestructura
* Vercel (hosting)
* Stripe (pagos)
* Sentry (monitoreo)
* PostHog (analíticas)

---

## 🚀 Empezando

###  Voraussetzungen (Requisitos Previos)

* Node.js 18+ y npm/pnpm/yarn
* Base de datos PostgreSQL (recomendamos [Neon](https://neon.tech) para serverless)
* Claves API para OpenAI y/o Anthropic
* Cuenta de Stripe (para las funcionalidades de pago)

### Instalación

1.  **Clonar el repositorio**
    ```bash
    git clone [https://github.com/yourusername/altocv.git](https://github.com/yourusername/altocv.git)
    cd altocv
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**

    Copiar el archivo de entorno de ejemplo:
    ```bash
    cp .env.example .env.local
    ```

    Rellenar las variables de entorno en `.env.local`:
    ```bash
    # Database - Use your own database name
    DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name

    # Auth - Generate your own secret
    NEXTAUTH_SECRET=your-unique-secret-key-here
    NEXTAUTH_URL=http://localhost:3000

    # OAuth providers (optional)
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret

    # AI APIs (choose at least one)
    OPENAI_API_KEY=sk-...
    ANTHROPIC_API_KEY=sk-ant-...

    # Payment (optional for MVP)
    STRIPE_SECRET_KEY=sk_test_...
    STRIPE_WEBHOOK_SECRET=whsec_...

    # Storage (optional)
    BLOB_READ_WRITE_TOKEN=vercel_blob_...

    # Monitoring (optional)
    SENTRY_DSN=https://...
    NEXT_PUBLIC_POSTHOG_KEY=phc_...
    ```

    **⚠️ Importante**:
    - Reemplaza `your_database_name` con tu nombre de base de datos único
    - Genera una cadena aleatoria segura para `NEXTAUTH_SECRET`
    - **Nunca** subas `.env.local` al control de versiones

4.  **Configurar la base de datos**
    ```bash
    # Generar Prisma Client
    npx prisma generate

    # Ejecutar migraciones
    npx dotenv -e .env.local -- prisma migrate dev

    # Probar la conexión a la base de datos (opcional)
    npm run test:db
    ```

5.  **Iniciar el servidor de desarrollo**
    ```bash
    npm run dev
    ```

    Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

### ⌨️ Comandos de Desarrollo

```bash
# Desarrollo
npm run dev           # Iniciar servidor de desarrollo
npm run build         # Compilar para producción
npm run start         # Iniciar servidor de producción

# Base de Datos
npx prisma generate   # Generar Prisma Client
npx prisma studio     # Abrir GUI de la base de datos
npx prisma migrate dev# Crear y aplicar migración

# Pruebas
npm test              # Ejecutar pruebas unitarias
npm run test:ui       # Ejecutar pruebas con UI
npm run test:e2e      # Ejecutar pruebas E2E

# Calidad del Código
npm run lint          # Ejecutar ESLint
npm run format        # Formatear con Prettier
