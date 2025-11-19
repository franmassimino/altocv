'use client';

import { useEffect } from 'react';
import { useCVEditorStore } from '@/lib/stores/cv-editor.store';
import ModernTechTemplate from '@/components/cv-templates/modern-tech-template';
import UndoRedoControls from '@/components/cv-editor/undo-redo-controls';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import type { CVContent } from '@/types/cv-content';

interface CVEditorLayoutProps {
  cvId: string;
  initialContent: CVContent;
}

export default function CVEditorLayout({
  cvId,
  initialContent,
}: CVEditorLayoutProps) {
  const loadCV = useCVEditorStore((state) => state.loadCV);
  const cv = useCVEditorStore((state) => state.cv);
  const lastSavedAt = useCVEditorStore((state) => state.lastSavedAt);

  // Load CV data into Zustand store on mount
  useEffect(() => {
    loadCV(cvId, initialContent);
  }, [cvId, initialContent, loadCV]);

  // Show loading while CV is loading
  if (!cv) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back button */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Center: Title and last saved */}
            <div className="flex-1 flex flex-col items-center">
              <h1 className="text-lg font-semibold text-gray-900">
                CV Editor
              </h1>
              {lastSavedAt && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>
                    Last saved: {new Date(lastSavedAt).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Undo/Redo controls */}
            <div className="flex items-center gap-2">
              <UndoRedoControls />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <ModernTechTemplate cv={cv} editable={true} />
        </div>
      </main>
    </div>
  );
}
