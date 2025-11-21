import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/auth';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // Redirect if not authenticated
  if (!session?.user) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          name: user.name || null,
          email: user.email || null,
          image: user.image || null,
          credits: user.credits,
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 py-8 px-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
