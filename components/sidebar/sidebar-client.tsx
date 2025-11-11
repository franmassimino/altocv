'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Menu, X, LayoutDashboard, Settings, Coins } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserMenu } from './user-menu';

interface SidebarClientProps {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
    credits: number;
  };
}

export function SidebarClient({ user }: SidebarClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 bg-sidebar h-screen transition-all duration-300 border-r',
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
          <nav className="flex-1 p-3 space-y-2">
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
            <UserMenu user={user} sidebarOpen={sidebarOpen} />
          </div>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-16'
        )}
      />
    </>
  );
}
