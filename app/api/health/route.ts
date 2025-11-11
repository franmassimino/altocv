import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Simple database check: query for database connectivity
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'connected',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

// Add caching headers to prevent excessive DB checks
export const revalidate = 60; // Revalidate every 60 seconds
