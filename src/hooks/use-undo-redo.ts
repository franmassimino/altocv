/**
 * Hook for undo/redo keyboard shortcuts
 * Ctrl+Z (undo), Ctrl+Shift+Z (redo)
 */

'use client';

import { useEffect } from 'react';
import { useCVEditorStore } from '@/lib/stores/cv-editor.store';

export interface UseUndoRedoReturn {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

/**
 * Hook to enable undo/redo keyboard shortcuts
 * Also exposes undo/redo state and actions
 */
export function useUndoRedo(): UseUndoRedoReturn {
  const { undo, redo, history, historyIndex } = useCVEditorStore();

  // Determine if undo/redo is available
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl (Windows/Linux) or Cmd (Mac)
      const isCmdOrCtrl = event.ctrlKey || event.metaKey;

      if (!isCmdOrCtrl) return;

      // Undo: Ctrl+Z (without Shift)
      if (event.key === 'z' && !event.shiftKey && canUndo) {
        event.preventDefault();
        undo();
      }

      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if (
        ((event.key === 'z' || event.key === 'Z') && event.shiftKey && canRedo) ||
        (event.key === 'y' && canRedo)
      ) {
        event.preventDefault();
        redo();
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canUndo, canRedo, undo, redo]);

  return {
    canUndo,
    canRedo,
    undo,
    redo,
  };
}
