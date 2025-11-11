import { Suspense } from 'react';
import { getServerSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

async function DashboardContent() {
  const session = await getServerSession();

  // Type-safe check (middleware should handle this, but defensive programming)
  if (!session?.user) {
    redirect('/login');
  }
  const { user } = session;

  return (
    <div className="p-12 mx-auto">
      {/* User Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user.name || 'User'}!
        </h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      {/* Empty State for CVs */}
      <Card className="p-12 text-center">
        <div className="mx-auto">
          <div className="flex justify-center mb-4">
            <FileText className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl mb-3 font-semibold">No CVs yet. Create your first CV!</h2>
          <p className="text-muted-foreground">
            Start building your professional CV in minutes with our AI-powered editor.
          </p>
          <Button size="lg"  className="mt-4">
            Create New CV
          </Button>
          
        </div>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <div className="h-9 w-64 bg-muted animate-pulse rounded" />
        <div className="h-5 w-48 bg-muted animate-pulse rounded" />
      </div>
      <Card className="p-12">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 bg-muted animate-pulse rounded-full mx-auto" />
          <div className="h-8 w-full bg-muted animate-pulse rounded" />
          <div className="h-5 w-3/4 bg-muted animate-pulse rounded mx-auto" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded mx-auto" />
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
