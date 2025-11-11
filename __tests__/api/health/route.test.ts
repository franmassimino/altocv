import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/health/route';

// Mock the database module
vi.mock('@/lib/db', () => ({
  db: {
    $queryRaw: vi.fn(),
  },
}));

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 200 when database is connected', async () => {
    // Import the mocked db
    const { db } = await import('@/lib/db');

    // Mock successful database query
    vi.mocked(db.$queryRaw).mockResolvedValue([{ '?column?': 1 }]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      status: 'ok',
      database: 'connected',
    });
    expect(data.timestamp).toBeDefined();
    expect(new Date(data.timestamp)).toBeInstanceOf(Date);
  });

  it('should return 503 when database is disconnected', async () => {
    // Import the mocked db
    const { db } = await import('@/lib/db');

    // Mock database connection failure
    const dbError = new Error('Connection refused');
    vi.mocked(db.$queryRaw).mockRejectedValue(dbError);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data).toMatchObject({
      status: 'error',
      database: 'disconnected',
      error: 'Connection refused',
    });
    expect(data.timestamp).toBeDefined();
  });

  it('should handle unknown errors gracefully', async () => {
    // Import the mocked db
    const { db } = await import('@/lib/db');

    // Mock non-Error object being thrown
    vi.mocked(db.$queryRaw).mockRejectedValue('Unknown error string');

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data).toMatchObject({
      status: 'error',
      database: 'disconnected',
      error: 'Unknown error',
    });
  });

  it('should include valid ISO 8601 timestamp in response', async () => {
    // Import the mocked db
    const { db } = await import('@/lib/db');

    vi.mocked(db.$queryRaw).mockResolvedValue([{ '?column?': 1 }]);

    const response = await GET();
    const data = await response.json();

    // Verify timestamp is valid ISO 8601
    const timestamp = new Date(data.timestamp);
    expect(timestamp.toISOString()).toBe(data.timestamp);
  });
});
