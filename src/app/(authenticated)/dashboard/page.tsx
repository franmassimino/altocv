import { Suspense } from 'react';
import { getServerSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { DashboardClient } from './dashboard-client';
import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/db/prisma';

async function DashboardContent() {
  const session = await getServerSession();

  // Type-safe check (middleware should handle this, but defensive programming)
  if (!session?.user) {
    redirect('/login');
  }
  const { user } = session;

  // Fetch user's CVs
  const cvs = await prisma.cV.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      templateId: true,
      atsScore: true,
      lastAnalyzedAt: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  return <DashboardClient user={user} cvs={cvs} />;
}

function DashboardSkeleton() {
  return (
    <div className="w-full mx-auto py-2">
      {/* Welcome Section */}
      <div className="mb-8 space-y-2">
        <div className="h-10 w-72 bg-muted animate-pulse rounded" /> {/* Title */}
        <div className="h-6 w-56 bg-muted animate-pulse rounded" />  {/* Email */}
      </div>

      {/* Card Skeleton */}
      <Card className="p-12 text-center">
        <div className="mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-muted animate-pulse rounded-full" />
          </div>

          {/* Title */}
          <div className="h-8 w-64 bg-muted animate-pulse rounded mx-auto mb-3" />

          {/* Description */}
          <div className="h-5 w-80 bg-muted animate-pulse rounded mx-auto" />

          {/* Buttons */}
          <div className="flex gap-3 justify-center mt-6">
            <div className="h-10 w-40 bg-muted animate-pulse rounded" />
            <div className="h-10 w-40 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      
      <DashboardContent />

    </Suspense>
  );
}
