# Neon Database Setup for Vercel Production

This guide explains how to configure Neon database for production deployment on Vercel.

## The Problem

**AccessDenied Error in Production?** This is likely caused by:
1. Neon's IP restrictions blocking Vercel serverless functions
2. Using direct connection instead of pooled connection

## Solution

### Step 1: Get Your Connection Strings from Neon

1. Go to [Neon Console](https://console.neon.tech/)
2. Select your project
3. Navigate to **Dashboard** → **Connection Details**
4. You'll see two types of connection strings:

#### Pooled Connection (Use this for DATABASE_URL)
```
postgresql://user:pass@ep-xxx.pooler.us-east-2.aws.neon.tech/dbname?sslmode=require
```
Note the `.pooler.` in the hostname - this is crucial!

#### Direct Connection (Use this for DIRECT_DATABASE_URL)
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```
Note: NO `.pooler.` in the hostname

### Step 2: Configure IP Allowlist in Neon

1. In Neon Console, go to **Settings** → **IP Allow**
2. Choose one of these options:

   **Option A: Allow All IPs (Recommended for Vercel)**
   - Uncheck "Restrict IP addresses" or leave the allowlist empty
   - This allows connections from Vercel's dynamic IPs

   **Option B: Allow Specific IPs**
   - If you need tighter security, you can try adding Vercel's IP ranges
   - Note: Vercel uses dynamic IPs, so Option A is more reliable

### Step 3: Configure Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Environment Variables**
3. Add/Update these variables:

```bash
# Use the POOLED connection for runtime queries
DATABASE_URL=postgresql://user:pass@ep-xxx.pooler.us-east-2.aws.neon.tech/dbname?sslmode=require

# Optional: Use the DIRECT connection for migrations (if needed)
DIRECT_DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

4. Set these for **Production**, **Preview**, and **Development** environments
5. Click **Save**

### Step 4: Redeploy

After updating environment variables:
1. Go to **Deployments** in Vercel
2. Find your latest deployment
3. Click **⋯** → **Redeploy**
4. Select **Use existing Build Cache** (faster)

## Verification

### Check Environment Variables
Visit: `https://your-app.vercel.app/api/debug/env`

You should see:
```json
{
  "env": {
    "DATABASE_URL": true,
    "NEXTAUTH_URL": true,
    ...
  }
}
```

### Check Database Connection
Try logging in with Google OAuth. If it works, your database connection is configured correctly!

## Why This Configuration?

### Pooled vs Direct Connection

- **Pooled Connection (`DATABASE_URL`)**:
  - Uses PgBouncer connection pooling
  - Perfect for serverless (Vercel Functions)
  - Handles many concurrent connections efficiently
  - Required for production with Vercel

- **Direct Connection (`DIRECT_DATABASE_URL`)**:
  - Direct connection to Postgres
  - Used for migrations and schema changes
  - Optional but recommended

### Prisma Configuration

The `schema.prisma` file now includes:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")        // Pooled connection
  directUrl = env("DIRECT_DATABASE_URL")  // Direct connection (optional)
}
```

This ensures:
- Runtime queries use the pooled connection (fast, scalable)
- Migrations use the direct connection (if provided)

## Troubleshooting

### Still Getting AccessDenied?

1. **Check Neon IP Allowlist**: Make sure it's disabled or allows all IPs
2. **Verify Connection String**: Ensure `DATABASE_URL` includes `.pooler.` in the hostname
3. **Check Logs**: Visit Vercel Deployments → Functions → View logs for detailed errors
4. **Test Connection**: Use the `/api/debug/env` endpoint to verify variables are set

### Connection Timeout?

- Verify `?sslmode=require` is at the end of your connection string
- Check that your Neon project is not suspended (free tier limitation)

### Prisma Client Issues?

If Prisma can't connect:
```bash
# Regenerate Prisma Client locally
npx prisma generate

# Push to trigger rebuild on Vercel
git commit --allow-empty -m "chore: trigger rebuild"
git push
```

## Security Best Practices

1. **Never commit** your actual connection strings to Git
2. **Use different databases** for development, preview, and production
3. **Enable IP restrictions** in Neon if you have static IPs (advanced)
4. **Rotate credentials** periodically from Neon Console

## Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Prisma with Neon](https://www.prisma.io/docs/guides/database/neon)
