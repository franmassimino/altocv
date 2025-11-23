'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  children?: ReactNode;
}

export function LogoutButton({ variant = 'ghost', className, children }: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      className={className}
    >
      {children || 'Sign Out'}
    </Button>
  );
}
