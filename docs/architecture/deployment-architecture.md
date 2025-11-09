# Deployment Architecture

## Deployment Strategy

- **Frontend:** Vercel Edge Network (auto-deploy on git push)
- **Backend:** Vercel Serverless Functions (same)
- **CI/CD:** GitHub Actions + Vercel Git Integration

## Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | localhost:3000 | Local dev |
| Staging | altocv-staging.vercel.app | Testing |
| Production | altocv.com | Live |

---
