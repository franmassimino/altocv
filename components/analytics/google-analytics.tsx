'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';
import { useEffect } from 'react';

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Only log in development
    if (process.env.NODE_ENV === 'development' && gaId) {
      console.log('Google Analytics initialized with ID:', gaId);
    }
  }, [gaId]);

  // Don't render analytics in development or if no GA ID is set
  if (!gaId || process.env.NODE_ENV === 'development') {
    return null;
  }

  return <GA gaId={gaId} />;
}
