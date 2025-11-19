/**
 * CV Template Preview Page
 * Development route to preview and test the Modern Tech CV template
 */

'use client';

import { useState, useEffect } from 'react';
import ModernTechTemplate from '@/components/cv-templates/modern-tech-template';
import { getDefaultCVContent } from '@/lib/utils/cv-placeholders';
import { useCVEditorStore } from '@/lib/stores/cv-editor.store';
import UndoRedoControls from '@/components/cv-editor/undo-redo-controls';
import { Button } from '@/components/ui/button';
import { Printer, ArrowLeft, Edit, Eye } from 'lucide-react';
import Link from 'next/link';

export default function CVPreviewPage() {
  const [editable, setEditable] = useState(false);
  const [initialData] = useState(getDefaultCVContent());
  const loadCV = useCVEditorStore((state) => state.loadCV);
  const cv = useCVEditorStore((state) => state.cv);

  // Load CV into store when entering edit mode
  useEffect(() => {
    if (editable && !cv) {
      loadCV('preview-dev', initialData);
    }
  }, [editable, cv, initialData, loadCV]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Controls */}
        <div className="mb-6 flex items-center justify-between print:hidden">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-md">
              🚧 Dev Preview - Template Testing
            </div>
            {editable && <UndoRedoControls />}
            <Button
              onClick={() => setEditable(!editable)}
              variant={editable ? "default" : "outline"}
              size="sm"
            >
              {editable ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  View Mode
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Mode
                </>
              )}
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print Preview
            </Button>
          </div>
        </div>

        {/* CV Template Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <ModernTechTemplate cv={editable && cv ? cv : initialData} editable={editable} />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500 print:hidden">
          <p>
            This is a development preview of the Modern Tech CV template using
            placeholder data.
          </p>
          <p className="mt-1">
            {editable ? (
              <span className="text-blue-600 font-medium">
                ✏️ Edit Mode Active - Click any field to edit, use Undo/Redo controls above
              </span>
            ) : (
              <span>
                Click &ldquo;Edit Mode&rdquo; to test inline editing with Undo/Redo (Story 2.3)
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
