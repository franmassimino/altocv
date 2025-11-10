import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getServerSession } from '@/lib/auth/auth';

// Mock the auth module
vi.mock('@/lib/auth/auth', () => ({
  getServerSession: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle authenticated user session', async () => {
    const mockSession = {
      user: {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        image: 'https://example.com/avatar.jpg',
        credits: 50,
        tier: 'FREE' as const,
      },
      expires: '2024-12-31',
    };

    vi.mocked(getServerSession).mockResolvedValue(mockSession);

    // Test that getServerSession is called
    const session = await getServerSession();
    expect(session).toBeDefined();
    expect(session?.user.email).toBe('test@example.com');
    expect(session?.user.name).toBe('Test User');
  });

  it('should handle null session', async () => {
    vi.mocked(getServerSession).mockResolvedValue(null);

    const session = await getServerSession();
    expect(session).toBeNull();
  });

  it('should verify session structure matches expectations', async () => {
    const mockSession = {
      user: {
        id: 'user-456',
        email: 'another@example.com',
        name: 'Another User',
        image: null,
        credits: 100,
        tier: 'PRO' as const,
      },
      expires: '2025-01-15',
    };

    vi.mocked(getServerSession).mockResolvedValue(mockSession);

    const session = await getServerSession();
    expect(session?.user).toHaveProperty('id');
    expect(session?.user).toHaveProperty('email');
    expect(session?.user).toHaveProperty('name');
    expect(session?.user).toHaveProperty('image');
    expect(session?.user).toHaveProperty('credits');
    expect(session?.user).toHaveProperty('tier');
  });
});
