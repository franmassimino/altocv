'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export function LogoutButton({ variant = 'ghost', className }: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      className={className}
    >
      Sign Out
    </Button>
  );
}
