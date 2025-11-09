# Coding Standards

## Critical Rules

- **Type Sharing:** Define types in `types/`, never duplicate
- **Server Actions Only:** Never use fetch() for internal APIs
- **Environment Variables:** Access via config objects, never `process.env` directly
- **Error Handling:** Use standard error classes from `server/utils/errors.ts`
- **State Updates:** Use Zustand actions, never mutate directly
- **CSS Variables:** Design panel uses CSS vars (--cv-*)

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `CVEditor.tsx` |
| Hooks | camelCase + use | `useAutoSave.ts` |
| Server Actions | camelCase | `createCV()` |
| Files | kebab-case | `cv-editor.store.ts` |

---
