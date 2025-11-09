import { describe, it, expect } from 'vitest';
import { isAuthenticated } from '@/lib/auth';

describe('Auth Utilities', () => {
  describe('isAuthenticated', () => {
    it('should return true for valid session', () => {
      const mockSession = {
        user: {
          id: '123',
          email: 'test@example.com',
          name: 'Test User',
          credits: 50,
          tier: 'FREE',
        },
        expires: '2024-12-31',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isAuthenticated(mockSession as any)).toBe(true);
    });

    it('should return false for null session', () => {
      expect(isAuthenticated(null)).toBe(false);
    });

    it('should return false for session without user', () => {
      const mockSession = {
        expires: '2024-12-31',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(isAuthenticated(mockSession as any)).toBe(false);
    });
  });
});
