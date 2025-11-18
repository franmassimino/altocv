/**
 * Tests for CV Server Actions
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createCV, getCVById, updateCVContent, deleteCV, getUserCVs } from '@/server/actions/cv-actions';
import { NotFoundError, UnauthorizedError } from '@/server/utils/errors';
import type { CVContent } from '@/types/cv-content';

// Mock Prisma client
const mockPrismaCV = {
  create: vi.fn(),
  findUnique: vi.fn(),
  findMany: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

vi.mock('@/lib/db', () => ({
  prisma: {
    cV: mockPrismaCV,
  },
}));

// Mock auth helpers
const mockRequireAuth = vi.fn();
vi.mock('@/lib/auth/auth', () => ({
  requireAuth: mockRequireAuth,
}));

// Mock placeholder data
vi.mock('@/lib/utils/cv-placeholders', () => ({
  getDefaultCVContent: () => ({
    personalInfo: { name: 'Test User', email: 'test@example.com' },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  }),
  getDefaultDesignSettings: () => ({ template: 'modern' }),
}));

describe('CV Server Actions', () => {
  const mockSession = {
    user: {
      id: 'user-123',
      email: 'user@example.com',
      name: 'Test User',
    },
  };

  const mockCV = {
    id: 'cv-456',
    userId: 'user-123',
    title: 'My CV',
    templateId: 'template-1',
    content: {
      personalInfo: { name: 'Test User', email: 'test@example.com' },
      experience: [],
      education: [],
      skills: [],
      projects: [],
    },
    designSettings: { template: 'modern' },
    atsScore: null,
    lastAnalyzedAt: null,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRequireAuth.mockResolvedValue(mockSession);
  });

  describe('createCV', () => {
    it('should create CV with default content', async () => {
      mockPrismaCV.create.mockResolvedValue(mockCV);

      const result = await createCV({
        title: 'My CV',
        templateId: 'template-1',
      });

      expect(mockRequireAuth).toHaveBeenCalled();
      expect(mockPrismaCV.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-123',
          title: 'My CV',
          templateId: 'template-1',
          version: 1,
        }),
      });
      expect(result).toEqual(mockCV);
    });

    it('should throw UnauthorizedError if not authenticated', async () => {
      mockRequireAuth.mockRejectedValue(new UnauthorizedError());

      await expect(
        createCV({ title: 'My CV', templateId: 'template-1' })
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe('getCVById', () => {
    it('should return CV if user owns it', async () => {
      mockPrismaCV.findUnique.mockResolvedValue(mockCV);

      const result = await getCVById('cv-456');

      expect(mockRequireAuth).toHaveBeenCalled();
      expect(mockPrismaCV.findUnique).toHaveBeenCalledWith({
        where: { id: 'cv-456' },
      });
      expect(result).toEqual(mockCV);
    });

    it('should throw NotFoundError if CV does not exist', async () => {
      mockPrismaCV.findUnique.mockResolvedValue(null);

      await expect(getCVById('cv-999')).rejects.toThrow(NotFoundError);
      await expect(getCVById('cv-999')).rejects.toThrow('CV not found');
    });

    it('should throw UnauthorizedError if user does not own CV', async () => {
      const otherUserCV = { ...mockCV, userId: 'other-user' };
      mockPrismaCV.findUnique.mockResolvedValue(otherUserCV);

      await expect(getCVById('cv-456')).rejects.toThrow(UnauthorizedError);
      await expect(getCVById('cv-456')).rejects.toThrow(
        'You do not have access to this CV'
      );
    });

    it('should throw UnauthorizedError if not authenticated', async () => {
      mockRequireAuth.mockRejectedValue(new UnauthorizedError());

      await expect(getCVById('cv-456')).rejects.toThrow(UnauthorizedError);
    });
  });

  describe('updateCVContent', () => {
    it('should update CV content and increment version', async () => {
      const updatedContent: CVContent = {
        personalInfo: { name: 'Updated Name', email: 'updated@example.com' },
        experience: [],
        education: [],
        skills: ['JavaScript'],
        projects: [],
      };

      mockPrismaCV.findUnique.mockResolvedValue(mockCV);
      mockPrismaCV.update.mockResolvedValue({
        ...mockCV,
        content: updatedContent,
        version: 2,
      });

      const result = await updateCVContent('cv-456', updatedContent);

      expect(mockRequireAuth).toHaveBeenCalled();
      expect(mockPrismaCV.findUnique).toHaveBeenCalledWith({
        where: { id: 'cv-456' },
      });
      expect(mockPrismaCV.update).toHaveBeenCalledWith({
        where: { id: 'cv-456' },
        data: expect.objectContaining({
          content: updatedContent,
          version: { increment: 1 },
        }),
      });
      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundError if CV does not exist', async () => {
      mockPrismaCV.findUnique.mockResolvedValue(null);

      const content: CVContent = {
        personalInfo: { name: 'Test', email: 'test@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      await expect(updateCVContent('cv-999', content)).rejects.toThrow(
        NotFoundError
      );
    });

    it('should throw UnauthorizedError if user does not own CV', async () => {
      const otherUserCV = { ...mockCV, userId: 'other-user' };
      mockPrismaCV.findUnique.mockResolvedValue(otherUserCV);

      const content: CVContent = {
        personalInfo: { name: 'Test', email: 'test@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      await expect(updateCVContent('cv-456', content)).rejects.toThrow(
        UnauthorizedError
      );
    });
  });

  describe('deleteCV', () => {
    it('should delete CV if user owns it', async () => {
      mockPrismaCV.findUnique.mockResolvedValue(mockCV);
      mockPrismaCV.delete.mockResolvedValue(mockCV);

      const result = await deleteCV('cv-456');

      expect(mockRequireAuth).toHaveBeenCalled();
      expect(mockPrismaCV.findUnique).toHaveBeenCalledWith({
        where: { id: 'cv-456' },
      });
      expect(mockPrismaCV.delete).toHaveBeenCalledWith({
        where: { id: 'cv-456' },
      });
      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundError if CV does not exist', async () => {
      mockPrismaCV.findUnique.mockResolvedValue(null);

      await expect(deleteCV('cv-999')).rejects.toThrow(NotFoundError);
    });

    it('should throw UnauthorizedError if user does not own CV', async () => {
      const otherUserCV = { ...mockCV, userId: 'other-user' };
      mockPrismaCV.findUnique.mockResolvedValue(otherUserCV);

      await expect(deleteCV('cv-456')).rejects.toThrow(UnauthorizedError);
    });
  });

  describe('getUserCVs', () => {
    it('should return all CVs for current user', async () => {
      const mockCVs = [
        {
          id: 'cv-1',
          title: 'CV 1',
          templateId: 'template-1',
          atsScore: 85,
          lastAnalyzedAt: new Date(),
          version: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'cv-2',
          title: 'CV 2',
          templateId: 'template-2',
          atsScore: null,
          lastAnalyzedAt: null,
          version: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaCV.findMany.mockResolvedValue(mockCVs);

      const result = await getUserCVs();

      expect(mockRequireAuth).toHaveBeenCalled();
      expect(mockPrismaCV.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        select: expect.objectContaining({
          id: true,
          title: true,
          templateId: true,
          atsScore: true,
          lastAnalyzedAt: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        }),
        orderBy: { updatedAt: 'desc' },
      });
      expect(result).toEqual(mockCVs);
    });

    it('should throw UnauthorizedError if not authenticated', async () => {
      mockRequireAuth.mockRejectedValue(new UnauthorizedError());

      await expect(getUserCVs()).rejects.toThrow(UnauthorizedError);
    });
  });
});
