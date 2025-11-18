/**
 * Zustand store for CV Editor state management
 * Handles CV content, undo/redo stack, and localStorage persistence
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type {
  CVContent,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  ProjectItem,
} from '@/types/cv-content';

/**
 * Maximum number of history entries for undo/redo
 */
const MAX_HISTORY_SIZE = 50;

/**
 * CV Editor State Interface
 */
interface CVEditorState {
  // Current CV being edited
  cv: CVContent | null;
  cvId: string | null;

  // Loading and saving states
  isLoading: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Undo/redo history
  history: CVContent[];
  historyIndex: number;

  // State management actions
  loadCV: (cvId: string, content: CVContent) => void;
  clearCV: () => void;

  // Personal Info actions
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void;

  // Summary actions
  updateSummary: (summary: string) => void;

  // Experience actions
  addExperience: (item: ExperienceItem) => void;
  updateExperience: (index: number, updates: Partial<ExperienceItem>) => void;
  deleteExperience: (index: number) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;

  // Education actions
  addEducation: (item: EducationItem) => void;
  updateEducation: (index: number, updates: Partial<EducationItem>) => void;
  deleteEducation: (index: number) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;

  // Skills actions
  addSkill: (skill: string) => void;
  updateSkill: (index: number, skill: string) => void;
  deleteSkill: (index: number) => void;

  // Projects actions
  addProject: (item: ProjectItem) => void;
  updateProject: (index: number, updates: Partial<ProjectItem>) => void;
  deleteProject: (index: number) => void;
  reorderProject: (fromIndex: number, toIndex: number) => void;

  // Undo/redo actions
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;

  // Save state actions
  setSaving: (isSaving: boolean) => void;
  setLastSavedAt: (date: Date) => void;

  // Persistence actions
  clearPersistedState: () => void;
}

/**
 * Helper function to push state to history
 */
const pushToHistory = (
  state: CVEditorState,
  newContent: CVContent
): void => {
  if (!state.cv) return;

  // Create new history array truncated at current index
  const newHistory = state.history.slice(0, state.historyIndex + 1);

  // Add current state to history
  newHistory.push(state.cv);

  // Limit history size (keep most recent entries)
  if (newHistory.length > MAX_HISTORY_SIZE) {
    newHistory.shift();
  }

  state.history = newHistory;
  state.historyIndex = newHistory.length - 1;
  state.cv = newContent;
};

/**
 * CV Editor Zustand Store
 */
export const useCVEditorStore = create<CVEditorState>()(
  persist(
    immer((set) => ({
      // Initial state
      cv: null,
      cvId: null,
      isLoading: false,
      isSaving: false,
      lastSavedAt: null,
      history: [],
      historyIndex: -1,

      // Load CV into editor
      loadCV: (cvId, content) =>
        set((state) => {
          state.cv = content;
          state.cvId = cvId;
          state.history = [content];
          state.historyIndex = 0;
          state.isLoading = false;
        }),

      // Clear CV from editor
      clearCV: () =>
        set((state) => {
          state.cv = null;
          state.cvId = null;
          state.history = [];
          state.historyIndex = -1;
          state.lastSavedAt = null;
        }),

      // Update personal info
      updatePersonalInfo: (updates) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            personalInfo: { ...state.cv.personalInfo, ...updates },
          };

          pushToHistory(state, newCV);
        }),

      // Update summary
      updateSummary: (summary) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            summary,
          };

          pushToHistory(state, newCV);
        }),

      // Add experience
      addExperience: (item) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            experience: [...state.cv.experience, item],
          };

          pushToHistory(state, newCV);
        }),

      // Update experience
      updateExperience: (index, updates) =>
        set((state) => {
          if (!state.cv) return;

          const newExperience = [...state.cv.experience];
          newExperience[index] = { ...newExperience[index], ...updates };

          const newCV: CVContent = {
            ...state.cv,
            experience: newExperience,
          };

          pushToHistory(state, newCV);
        }),

      // Delete experience
      deleteExperience: (index) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            experience: state.cv.experience.filter((_, i) => i !== index),
          };

          pushToHistory(state, newCV);
        }),

      // Reorder experience
      reorderExperience: (fromIndex, toIndex) =>
        set((state) => {
          if (!state.cv) return;

          const newExperience = [...state.cv.experience];
          const [movedItem] = newExperience.splice(fromIndex, 1);
          newExperience.splice(toIndex, 0, movedItem);

          const newCV: CVContent = {
            ...state.cv,
            experience: newExperience,
          };

          pushToHistory(state, newCV);
        }),

      // Add education
      addEducation: (item) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            education: [...state.cv.education, item],
          };

          pushToHistory(state, newCV);
        }),

      // Update education
      updateEducation: (index, updates) =>
        set((state) => {
          if (!state.cv) return;

          const newEducation = [...state.cv.education];
          newEducation[index] = { ...newEducation[index], ...updates };

          const newCV: CVContent = {
            ...state.cv,
            education: newEducation,
          };

          pushToHistory(state, newCV);
        }),

      // Delete education
      deleteEducation: (index) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            education: state.cv.education.filter((_, i) => i !== index),
          };

          pushToHistory(state, newCV);
        }),

      // Reorder education
      reorderEducation: (fromIndex, toIndex) =>
        set((state) => {
          if (!state.cv) return;

          const newEducation = [...state.cv.education];
          const [movedItem] = newEducation.splice(fromIndex, 1);
          newEducation.splice(toIndex, 0, movedItem);

          const newCV: CVContent = {
            ...state.cv,
            education: newEducation,
          };

          pushToHistory(state, newCV);
        }),

      // Add skill
      addSkill: (skill) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            skills: [...state.cv.skills, skill],
          };

          pushToHistory(state, newCV);
        }),

      // Update skill
      updateSkill: (index, skill) =>
        set((state) => {
          if (!state.cv) return;

          const newSkills = [...state.cv.skills];
          newSkills[index] = skill;

          const newCV: CVContent = {
            ...state.cv,
            skills: newSkills,
          };

          pushToHistory(state, newCV);
        }),

      // Delete skill
      deleteSkill: (index) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            skills: state.cv.skills.filter((_, i) => i !== index),
          };

          pushToHistory(state, newCV);
        }),

      // Add project
      addProject: (item) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            projects: [...state.cv.projects, item],
          };

          pushToHistory(state, newCV);
        }),

      // Update project
      updateProject: (index, updates) =>
        set((state) => {
          if (!state.cv) return;

          const newProjects = [...state.cv.projects];
          newProjects[index] = { ...newProjects[index], ...updates };

          const newCV: CVContent = {
            ...state.cv,
            projects: newProjects,
          };

          pushToHistory(state, newCV);
        }),

      // Delete project
      deleteProject: (index) =>
        set((state) => {
          if (!state.cv) return;

          const newCV: CVContent = {
            ...state.cv,
            projects: state.cv.projects.filter((_, i) => i !== index),
          };

          pushToHistory(state, newCV);
        }),

      // Reorder project
      reorderProject: (fromIndex, toIndex) =>
        set((state) => {
          if (!state.cv) return;

          const newProjects = [...state.cv.projects];
          const [movedItem] = newProjects.splice(fromIndex, 1);
          newProjects.splice(toIndex, 0, movedItem);

          const newCV: CVContent = {
            ...state.cv,
            projects: newProjects,
          };

          pushToHistory(state, newCV);
        }),

      // Undo action
      undo: () =>
        set((state) => {
          if (state.historyIndex <= 0) return;

          state.historyIndex -= 1;
          state.cv = state.history[state.historyIndex];
        }),

      // Redo action
      redo: () =>
        set((state) => {
          if (state.historyIndex >= state.history.length - 1) return;

          state.historyIndex += 1;
          state.cv = state.history[state.historyIndex];
        }),

      // Clear history
      clearHistory: () =>
        set((state) => {
          if (!state.cv) return;

          state.history = [state.cv];
          state.historyIndex = 0;
        }),

      // Set saving state
      setSaving: (isSaving) =>
        set((state) => {
          state.isSaving = isSaving;
        }),

      // Set last saved timestamp
      setLastSavedAt: (date) =>
        set((state) => {
          state.lastSavedAt = date;
        }),

      // Clear persisted state from localStorage
      clearPersistedState: () =>
        set((state) => {
          state.cv = null;
          state.cvId = null;
          state.history = [];
          state.historyIndex = -1;
          state.lastSavedAt = null;
        }),
    })),
    {
      name: 'altocv-editor-state',
      version: 1,
    }
  )
);
