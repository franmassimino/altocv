'use client';

import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { type ReactNode } from 'react';

// Dynamically import ThemeProvider to reduce initial bundle size
const ThemeProvider = dynamic(
  () => import('@/components/theme-provider').then((mod) => mod.ThemeProvider),
  {
    ssr: true,
  }
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
