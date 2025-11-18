/**
 * Server Actions for CV CRUD operations
 * All actions require authentication and verify ownership
 */

'use server';

import { requireAuth } from '@/lib/auth/auth';
import { db } from '@/lib/db';
import { NotFoundError, UnauthorizedError } from '@/server/utils/errors';
import { getDefaultCVContent, getDefaultDesignSettings } from '@/lib/utils/cv-placeholders';
import type { CVContent } from '@/types/cv-content';
import type { Prisma } from '@prisma/client';

/**
 * Create a new CV with placeholder content
 *
 * @param data - CV creation data (title, templateId)
 * @returns Created CV with id and content
 * @throws UnauthorizedError if user not authenticated
 */
export async function createCV(data: { title: string; templateId: string }) {
  const session = await requireAuth();

  const cv = await db.cV.create({
    data: {
      userId: session.user.id,
      title: data.title,
      templateId: data.templateId,
      content: getDefaultCVContent() as unknown as Prisma.JsonObject,
      designSettings: getDefaultDesignSettings() as unknown as Prisma.JsonObject,
      version: 1,
    },
  });

  return cv;
}

/**
 * Get CV by ID
 * Verifies user ownership before returning
 *
 * @param cvId - CV ID to fetch
 * @returns CV data
 * @throws UnauthorizedError if user not authenticated or doesn't own CV
 * @throws NotFoundError if CV doesn't exist
 */
export async function getCVById(cvId: string) {
  const session = await requireAuth();

  const cv = await db.cV.findUnique({
    where: { id: cvId },
  });

  if (!cv) {
    throw new NotFoundError('CV not found');
  }

  if (cv.userId !== session.user.id) {
    throw new UnauthorizedError('You do not have access to this CV');
  }

  return cv;
}

/**
 * Update CV content
 * Increments version number on each update
 *
 * @param cvId - CV ID to update
 * @param content - Updated CV content
 * @returns Success status
 * @throws UnauthorizedError if user not authenticated or doesn't own CV
 * @throws NotFoundError if CV doesn't exist
 */
export async function updateCVContent(cvId: string, content: CVContent) {
  const session = await requireAuth();

  const cv = await db.cV.findUnique({
    where: { id: cvId },
  });

  if (!cv) {
    throw new NotFoundError('CV not found');
  }

  if (cv.userId !== session.user.id) {
    throw new UnauthorizedError('You do not have access to this CV');
  }

  await db.cV.update({
    where: { id: cvId },
    data: {
      content: content as unknown as Prisma.JsonObject,
      version: { increment: 1 },
      updatedAt: new Date(),
    },
  });

  return { success: true };
}

/**
 * Delete CV
 * Cascade deletes all related chat messages
 *
 * @param cvId - CV ID to delete
 * @returns Success status
 * @throws UnauthorizedError if user not authenticated or doesn't own CV
 * @throws NotFoundError if CV doesn't exist
 */
export async function deleteCV(cvId: string) {
  const session = await requireAuth();

  const cv = await db.cV.findUnique({
    where: { id: cvId },
  });

  if (!cv) {
    throw new NotFoundError('CV not found');
  }

  if (cv.userId !== session.user.id) {
    throw new UnauthorizedError('You do not have access to this CV');
  }

  await db.cV.delete({
    where: { id: cvId },
  });

  return { success: true };
}

/**
 * Get all CVs for current user
 *
 * @returns Array of CVs (without full content, only metadata)
 * @throws UnauthorizedError if user not authenticated
 */
export async function getUserCVs() {
  const session = await requireAuth();

  const cvs = await db.cV.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      title: true,
      templateId: true,
      atsScore: true,
      lastAnalyzedAt: true,
      version: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  });

  return cvs;
}
