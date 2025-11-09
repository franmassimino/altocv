# Testing Strategy

## Testing Pyramid

```
        E2E (5%)
       /        \
   Integration (25%)
  /                \
Unit Tests (70%)
```

## Test Organization

- **Frontend Tests:** Component tests with Vitest + Testing Library
- **Backend Tests:** Server Action tests with Vitest
- **E2E Tests:** Playwright for critical flows

---
