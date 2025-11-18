# CV Analyzer Agent

Un agente inteligente especializado en analizar y mejorar CVs/Resumes usando Mastra AI.

## Descripción

El **CV Analyzer Agent** es un asistente experto que analiza CVs y proporciona retroalimentación detallada y accionable para mejorar la calidad de los currículums. Utiliza análisis estructurado para evaluar diferentes secciones del CV y ofrece sugerencias específicas basadas en las mejores prácticas de la industria.

## Características

- ✅ **Análisis Integral**: Evalúa todas las secciones del CV (información personal, resumen, experiencia, educación, habilidades, proyectos)
- 📊 **Puntuación Detallada**: Proporciona puntuaciones por sección (0-100) y puntuación general
- 💪 **Identificación de Fortalezas**: Destaca los puntos fuertes del CV
- 🎯 **Detección de Debilidades**: Identifica áreas de mejora
- 💡 **Sugerencias Accionables**: Ofrece recomendaciones específicas y priorizadas
- 🔑 **Optimización de Palabras Clave**: Sugiere keywords relevantes para ATS (Applicant Tracking Systems)
- 🎭 **Análisis por Rol**: Adapta el análisis según el puesto objetivo especificado

## Uso

### Importar el Agente

```typescript
import { mastra } from '@/mastra';

const cvAgent = mastra.getAgent('cvAnalyzerAgent');
```

### Análisis Básico

```typescript
import type { CVContent } from '@/types/cv-content';

const cv: CVContent = {
  personalInfo: {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    // ... más datos
  },
  // ... resto del CV
};

const response = await cvAgent.generate(
  `Por favor analiza este CV: ${JSON.stringify(cv)}`
);

console.log(response.text);
```

### Análisis Específico por Rol

```typescript
const response = await cvAgent.generate(
  `Por favor analiza este CV para un puesto de Frontend Developer: ${JSON.stringify(cv)}`
);
```

### Ver Ejemplo Completo

Revisa [cv-analyzer-example.ts](../examples/cv-analyzer-example.ts) para ver un ejemplo completo de uso.

## Herramienta de Análisis

El agente utiliza la herramienta `cvAnalysisTool` que proporciona:

### Input Schema
- `cvContent`: Objeto CVContent completo con toda la información del CV
- `targetRole` (opcional): Rol o industria objetivo para optimización específica

### Output Schema
```typescript
{
  overallScore: number;        // Puntuación general (0-100)
  strengths: string[];         // Lista de fortalezas identificadas
  weaknesses: string[];        // Lista de debilidades encontradas
  suggestions: string[];       // Recomendaciones priorizadas
  keywordOptimization: {
    missingKeywords: string[]; // Keywords relevantes que faltan
    presentKeywords: string[]; // Keywords ya presentes
  };
  sectionScores: {
    personalInfo: number;      // Puntuación sección info personal
    summary: number;           // Puntuación resumen profesional
    experience: number;        // Puntuación experiencia laboral
    education: number;         // Puntuación educación
    skills: number;            // Puntuación habilidades
    projects: number;          // Puntuación proyectos
  };
}
```

## Criterios de Evaluación

### Información Personal (10% del total)
- Email, teléfono, ubicación
- Perfil de LinkedIn (+10 puntos)
- Sitio web/portfolio (+5 puntos)

### Resumen Profesional (15% del total)
- Presencia del resumen
- Longitud óptima (30-80 palabras)
- Uso de verbos de acción

### Experiencia Laboral (30% del total - peso más alto)
- Número de posiciones listadas
- Cantidad de logros por posición (3-5 bullets)
- Cuantificación de logros (métricas, números, porcentajes)

### Educación (15% del total)
- Información completa
- GPA (si es relevante)
- Logros académicos

### Habilidades (15% del total)
- Número de habilidades (óptimo: 5-15)
- Relevancia según el rol objetivo

### Proyectos (15% del total)
- Descripción de proyectos relevantes
- URLs/GitHub links
- Tecnologías utilizadas
- Highlights y logros

## Optimización ATS

El agente también analiza la optimización para ATS (Applicant Tracking Systems):

- **Keywords Comunes**: Leadership, team, project management, agile, collaboration, etc.
- **Keywords Técnicas**: JavaScript, TypeScript, React, Python, SQL, Docker, AWS, etc.
- **Keywords por Rol**: Analiza keywords específicas según el rol objetivo (frontend, backend, fullstack, devops, data)

## Integración con MCP (Opcional)

El agente puede extenderse con herramientas MCP para capacidades adicionales:

```typescript
import { MCPClient } from '@mastra/mcp';

const mcpClient = new MCPClient({
  servers: {
    // Configura servidores MCP para análisis adicional
  }
});

export const cvAnalyzerAgent = new Agent({
  // ... configuración existente
  tools: {
    cvAnalysisTool,
    ...(await mcpClient.getTools()),
  },
});
```

## Configuración

El agente utiliza:
- **Modelo**: OpenAI GPT-4o-mini via AI SDK (`@ai-sdk/openai`)
- **Memoria**: LibSQLStore con persistencia en `mastra.db`
- **Logger**: Mastra PinoLogger

### Variables de Entorno Requeridas

```bash
OPENAI_API_KEY=tu-api-key-de-openai
```

## Próximas Mejoras

- [ ] Análisis de formato y diseño del CV
- [ ] Comparación con CVs de ejemplo de la industria
- [ ] Sugerencias de reformulación de bullets
- [ ] Detección de errores gramaticales y ortográficos
- [ ] Análisis de compatibilidad con descripciones de trabajo específicas
- [ ] Generación automática de versiones optimizadas del CV

## Referencias

- [Documentación de Mastra Agents](https://mastra.ai/docs/agents/overview)
- [Tipos de CV Content](../../types/cv-content.ts)
- [Weather Agent (ejemplo original)](./weather-agent.ts)
