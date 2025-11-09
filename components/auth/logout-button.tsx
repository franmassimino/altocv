'use client';

import { Button } from '@/components/ui/button';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export function LogoutButton({ variant = 'ghost', className }: LogoutButtonProps) {
  const handleLogout = async () => {
    // Use form submission to trigger Server Action
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/auth/signout';
    document.body.appendChild(form);
    form.submit();
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
