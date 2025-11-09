# Error Handling Strategy

All Server Actions return typed errors:
- `NotFoundError` - Resource doesn't exist
- `InsufficientCreditsError` - Not enough credits
- `UnauthorizedError` - Not authenticated
- `ValidationError` - Invalid input (Zod)

Frontend displays user-friendly toast notifications.

---
