import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth/auth';
import { SidebarClient } from '@/components/sidebar/sidebar-client';
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
    <div className="min-h-screen flex">
      <SidebarClient
        user={{
          name: user.name || null,
          email: user.email || null,
          image: user.image || null,
          credits: user.credits,
        }}
      />
      <main className="flex-1">{children}</main>
    </div>
  );
}
