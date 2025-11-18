/**
 * Zustand Store Hooks and Selectors for CV Editor
 * Optimized with shallow equality for performance
 */

'use client';

import { useCVEditorStore } from '@/lib/stores/cv-editor.store';
import type {
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  ProjectItem,
} from '@/types/cv-content';

/**
 * Main hook - returns full store
 * Use sparingly; prefer specific selector hooks for performance
 */
export const useCVEditor = useCVEditorStore;

/**
 * Select only personal info section
 */
export function usePersonalInfo(): PersonalInfo | null {
  return useCVEditorStore((state) => state.cv?.personalInfo ?? null);
}

/**
 * Select only summary section
 */
export function useSummary(): string | undefined {
  return useCVEditorStore((state) => state.cv?.summary);
}

/**
 * Select only experience section
 */
export function useExperience(): ExperienceItem[] {
  return useCVEditorStore((state) => state.cv?.experience ?? []);
}

/**
 * Select only education section
 */
export function useEducation(): EducationItem[] {
  return useCVEditorStore((state) => state.cv?.education ?? []);
}

/**
 * Select only skills section
 */
export function useSkills(): string[] {
  return useCVEditorStore((state) => state.cv?.skills ?? []);
}

/**
 * Select only projects section
 */
export function useProjects(): ProjectItem[] {
  return useCVEditorStore((state) => state.cv?.projects ?? []);
}

/**
 * Select save status (isSaving, lastSavedAt)
 */
export function useSaveStatus() {
  return useCVEditorStore((state) => ({
    isSaving: state.isSaving,
    lastSavedAt: state.lastSavedAt,
  }));
}

/**
 * Select CV metadata (cvId, isLoading)
 */
export function useCVMetadata() {
  return useCVEditorStore((state) => ({
    cvId: state.cvId,
    isLoading: state.isLoading,
  }));
}

/**
 * Get full CV content (for save operations)
 */
export function useCVContent() {
  return useCVEditorStore((state) => state.cv);
}

// Action hooks for easier component usage

/**
 * Hook to get updatePersonalInfo action
 */
export function useUpdatePersonalInfo() {
  return useCVEditorStore((state) => state.updatePersonalInfo);
}

/**
 * Hook to get updateSummary action
 */
export function useUpdateSummary() {
  return useCVEditorStore((state) => state.updateSummary);
}

/**
 * Hook to get experience actions
 */
export function useExperienceActions() {
  return useCVEditorStore((state) => ({
    add: state.addExperience,
    update: state.updateExperience,
    delete: state.deleteExperience,
    reorder: state.reorderExperience,
  }));
}

/**
 * Hook to get education actions
 */
export function useEducationActions() {
  return useCVEditorStore((state) => ({
    add: state.addEducation,
    update: state.updateEducation,
    delete: state.deleteEducation,
    reorder: state.reorderEducation,
  }));
}

/**
 * Hook to get skills actions
 */
export function useSkillsActions() {
  return useCVEditorStore((state) => ({
    add: state.addSkill,
    update: state.updateSkill,
    delete: state.deleteSkill,
  }));
}

/**
 * Hook to get projects actions
 */
export function useProjectsActions() {
  return useCVEditorStore((state) => ({
    add: state.addProject,
    update: state.updateProject,
    delete: state.deleteProject,
    reorder: state.reorderProject,
  }));
}

/**
 * Hook to get save state actions
 */
export function useSaveActions() {
  return useCVEditorStore((state) => ({
    setSaving: state.setSaving,
    setLastSavedAt: state.setLastSavedAt,
  }));
}

/**
 * Hook to load/clear CV
 */
export function useCVLoading() {
  return useCVEditorStore((state) => ({
    loadCV: state.loadCV,
    clearCV: state.clearCV,
  }));
}
