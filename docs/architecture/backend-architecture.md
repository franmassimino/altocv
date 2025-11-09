# Backend Architecture

## Service Architecture

```
server/
├── actions/                     # Server Actions
├── services/                    # Business logic
├── jobs/                        # Background jobs
├── middleware/                  # Reusable middleware
└── utils/                       # Utilities
```

## Authentication Flow

NextAuth v5 with Google OAuth, JWT strategy, Edge Middleware for route protection.

---
