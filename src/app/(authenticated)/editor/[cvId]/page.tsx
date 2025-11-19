import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import CVEditorLayout from '@/components/cv-editor/cv-editor-layout';

interface EditorPageProps {
  params: {
    cvId: string;
  };
}

export default async function EditorPage(props: EditorPageProps) {
  // Await params for Next.js 15
  const params = await Promise.resolve(props.params);

  // Require authentication
  const session = await requireAuth();

  // Fetch CV from database
  const cv = await db.cV.findUnique({
    where: {
      id: params.cvId,
      userId: session.user.id, // Ensure user owns this CV
    },
  });

  // Redirect if CV not found or user doesn't own it
  if (!cv) {
    redirect('/dashboard?error=cv-not-found');
  }

  // Parse content (stored as JSON)
  const content = typeof cv.content === 'string'
    ? JSON.parse(cv.content)
    : cv.content;

  return <CVEditorLayout cvId={cv.id} initialContent={content} />;
}
