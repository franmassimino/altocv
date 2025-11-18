import { NextResponse } from 'next/server';

export async function GET() {
  // Check environment variables without exposing their values
  const envCheck = {
    AUTH_URL: !!process.env.AUTH_URL,
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: !!process.env.DATABASE_URL,
    // Show actual AUTH_URL value (safe to expose in your own domain)
    AUTH_URL_VALUE: process.env.AUTH_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: 'Environment variables check',
    env: envCheck,
    timestamp: new Date().toISOString(),
  });
}
