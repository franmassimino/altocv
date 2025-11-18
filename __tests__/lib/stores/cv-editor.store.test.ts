/**
 * Tests for CV Editor Zustand Store
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useCVEditorStore } from '@/lib/stores/cv-editor.store';
import type { CVContent, ExperienceItem } from '@/types/cv-content';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('CV Editor Store', () => {
  beforeEach(() => {
    // Reset store state
    const { clearCV } = useCVEditorStore.getState();
    clearCV();
    localStorageMock.clear();
  });

  describe('Store Initialization', () => {
    it('should initialize with empty state', () => {
      const state = useCVEditorStore.getState();

      expect(state.cv).toBeNull();
      expect(state.cvId).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.isSaving).toBe(false);
      expect(state.lastSavedAt).toBeNull();
      expect(state.history).toEqual([]);
      expect(state.historyIndex).toBe(-1);
    });
  });

  describe('loadCV', () => {
    it('should load CV and initialize history', () => {
      const mockCV: CVContent = {
        personalInfo: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      const state = useCVEditorStore.getState();

      expect(state.cv).toEqual(mockCV);
      expect(state.cvId).toBe('cv-123');
      expect(state.history).toHaveLength(1);
      expect(state.historyIndex).toBe(0);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('Personal Info Updates', () => {
    it('should update personal info without affecting other sections', () => {
      const mockCV: CVContent = {
        personalInfo: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        summary: 'Original summary',
        experience: [],
        education: [],
        skills: ['JavaScript'],
        projects: [],
      };

      const { loadCV, updatePersonalInfo } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      updatePersonalInfo({ name: 'Jane Doe', phone: '555-1234' });

      const state = useCVEditorStore.getState();

      expect(state.cv?.personalInfo.name).toBe('Jane Doe');
      expect(state.cv?.personalInfo.phone).toBe('555-1234');
      expect(state.cv?.personalInfo.email).toBe('john@example.com');
      expect(state.cv?.summary).toBe('Original summary');
      expect(state.cv?.skills).toEqual(['JavaScript']);
    });

    it('should push to history on update', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, updatePersonalInfo } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      expect(useCVEditorStore.getState().history).toHaveLength(1);

      updatePersonalInfo({ name: 'Jane Doe' });

      expect(useCVEditorStore.getState().history).toHaveLength(2);
    });
  });

  describe('Experience Actions', () => {
    it('should add experience entry', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const newExperience: ExperienceItem = {
        id: 'exp-1',
        company: 'Acme Corp',
        role: 'Engineer',
        startDate: '2020-01-01',
        current: true,
        bullets: ['Built stuff'],
      };

      const { loadCV, addExperience } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      addExperience(newExperience);

      const state = useCVEditorStore.getState();

      expect(state.cv?.experience).toHaveLength(1);
      expect(state.cv?.experience[0]).toEqual(newExperience);
    });

    it('should update experience entry', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [
          {
            id: 'exp-1',
            company: 'Acme Corp',
            role: 'Junior Engineer',
            startDate: '2020-01-01',
            current: true,
            bullets: [],
          },
        ],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, updateExperience } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      updateExperience(0, { role: 'Senior Engineer' });

      const state = useCVEditorStore.getState();

      expect(state.cv?.experience[0]?.role).toBe('Senior Engineer');
      expect(state.cv?.experience[0]?.company).toBe('Acme Corp');
    });

    it('should delete experience entry', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [
          {
            id: 'exp-1',
            company: 'Acme Corp',
            role: 'Engineer',
            startDate: '2020-01-01',
            current: false,
            bullets: [],
          },
          {
            id: 'exp-2',
            company: 'Tech Co',
            role: 'Developer',
            startDate: '2021-01-01',
            current: true,
            bullets: [],
          },
        ],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, deleteExperience } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      deleteExperience(0);

      const state = useCVEditorStore.getState();

      expect(state.cv?.experience).toHaveLength(1);
      expect(state.cv?.experience[0]?.id).toBe('exp-2');
    });

    it('should reorder experience entries', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [
          {
            id: 'exp-1',
            company: 'Acme Corp',
            role: 'Engineer',
            startDate: '2020-01-01',
            current: false,
            bullets: [],
          },
          {
            id: 'exp-2',
            company: 'Tech Co',
            role: 'Developer',
            startDate: '2021-01-01',
            current: true,
            bullets: [],
          },
        ],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, reorderExperience } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      reorderExperience(0, 1);

      const state = useCVEditorStore.getState();

      expect(state.cv?.experience[0]?.id).toBe('exp-2');
      expect(state.cv?.experience[1]?.id).toBe('exp-1');
    });
  });

  describe('Undo/Redo Stack', () => {
    it('should push to history on content update', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, updatePersonalInfo, updateSummary } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      expect(useCVEditorStore.getState().history).toHaveLength(1);

      updatePersonalInfo({ name: 'Jane Doe' });
      expect(useCVEditorStore.getState().history).toHaveLength(2);

      updateSummary('New summary');
      expect(useCVEditorStore.getState().history).toHaveLength(3);
    });

    it('should undo to previous state', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, updatePersonalInfo, undo } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      updatePersonalInfo({ name: 'Jane Doe' });

      expect(useCVEditorStore.getState().cv?.personalInfo.name).toBe('Jane Doe');

      undo();

      expect(useCVEditorStore.getState().cv?.personalInfo.name).toBe('John Doe');
    });

    it('should redo to next state', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, updatePersonalInfo, undo, redo } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      updatePersonalInfo({ name: 'Jane Doe' });
      undo();

      expect(useCVEditorStore.getState().cv?.personalInfo.name).toBe('John Doe');

      redo();

      expect(useCVEditorStore.getState().cv?.personalInfo.name).toBe('Jane Doe');
    });

    it('should not undo if at history start', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, undo } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      const initialState = useCVEditorStore.getState().cv;

      undo(); // Should have no effect

      expect(useCVEditorStore.getState().cv).toEqual(initialState);
    });

    it('should not redo if at history end', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, updatePersonalInfo, redo } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      updatePersonalInfo({ name: 'Jane Doe' });

      const currentState = useCVEditorStore.getState().cv;

      redo(); // Should have no effect

      expect(useCVEditorStore.getState().cv).toEqual(currentState);
    });

    it('should enforce max 50 history entries', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, updatePersonalInfo } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      // Make 60 updates
      for (let i = 0; i < 60; i++) {
        updatePersonalInfo({ name: `Name ${i}` });
      }

      const state = useCVEditorStore.getState();

      expect(state.history.length).toBeLessThanOrEqual(50);
    });
  });

  describe('Clear Actions', () => {
    it('should clear CV and reset state', () => {
      const mockCV: CVContent = {
        personalInfo: { name: 'John Doe', email: 'john@example.com' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      const { loadCV, clearCV } = useCVEditorStore.getState();
      loadCV('cv-123', mockCV);

      clearCV();

      const state = useCVEditorStore.getState();

      expect(state.cv).toBeNull();
      expect(state.cvId).toBeNull();
      expect(state.history).toEqual([]);
      expect(state.historyIndex).toBe(-1);
      expect(state.lastSavedAt).toBeNull();
    });
  });
});
