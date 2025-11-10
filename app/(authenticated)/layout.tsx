'use client';

import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from '@/components/auth/logout-button';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LayoutDashboard, Settings, Coins } from 'lucide-react';
import { useSession } from '@/hooks/use-session';
import { cn } from '@/lib/utils';

function getInitials(name: string | null | undefined): string {
  if (!name) return 'U';

  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle loading and unauthenticated states
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-background border-r',
          sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            {sidebarOpen ? (
              <>
                <Link href="/dashboard" className="flex items-center">
                  <div className="text-xl font-bold">
                    <span className="text-primary">ALTO</span>
                    <span className="text-foreground">CV</span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="h-8 w-8 mx-auto"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/dashboard"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors',
                sidebarOpen ? 'justify-start' : 'justify-center'
              )}
            >
              <LayoutDashboard className="h-5 w-5" />
              {sidebarOpen && <span>Dashboard</span>}
            </Link>

            <Link
              href="/settings"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors',
                sidebarOpen ? 'justify-start' : 'justify-center'
              )}
            >
              <Settings className="h-5 w-5" />
              {sidebarOpen && <span>Settings</span>}
            </Link>
          </nav>

          <Separator />

          {/* Credits Section */}
          <div className="p-4">
            {sidebarOpen ? (
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted">
                <Coins className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Credits</p>
                  <p className="text-sm font-semibold">{user.credits}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center px-3 py-2 rounded-lg bg-muted">
                <Coins className="h-5 w-5 text-primary" />
              </div>
            )}
          </div>

          <Separator />

          {/* User Section */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:outline-none">
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors',
                    sidebarOpen ? 'justify-start' : 'justify-center'
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  {sidebarOpen && (
                    <div className="flex-1 text-left overflow-hidden">
                      <p className="text-sm font-medium truncate">{user.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div className="w-full">
                    <LogoutButton
                      variant="ghost"
                      className="w-full justify-start p-0 h-auto font-normal"
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-16'
        )}
      >
        {children}
      </main>
    </div>
  );
}
