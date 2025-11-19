/**
 * Default Design Settings for CV Templates
 * These defaults are used when no custom design settings are provided
 */

import type { DesignSettings } from '@/types/cv-content';

/**
 * Default design settings for the Modern Tech template
 * Colors follow the blue professional theme
 * Typography uses Inter font family (already loaded in the app)
 * Spacing follows 8px grid system
 */
export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
  colors: {
    primary: '#2563eb', // Blue 600 - Professional and trustworthy
    accent: '#0ea5e9', // Sky 500 - Complementary accent
    text: '#1f2937', // Gray 800 - High contrast for readability
    background: '#ffffff', // White - Clean and professional
  },
  typography: {
    fontPairing: 'Inter', // Modern sans-serif, excellent readability
    headingSize: 24, // px - Large enough for hierarchy, not overwhelming
    bodySize: 14, // px - Optimal for CV readability
    lineHeight: 1.6, // Comfortable reading experience
  },
  spacing: {
    density: 1, // Normal density (1 = 100%, 0.8 = compact, 1.2 = spacious)
    sectionMargin: 24, // px - Clear separation between sections
    contentPadding: 16, // px - Comfortable internal padding
  },
  layout: {
    sectionOrder: [
      'personalInfo',
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
    ],
  },
};

/**
 * Alternative design preset: Compact
 * Ideal for fitting more content on a single page
 */
export const COMPACT_DESIGN_SETTINGS: DesignSettings = {
  ...DEFAULT_DESIGN_SETTINGS,
  typography: {
    ...DEFAULT_DESIGN_SETTINGS.typography,
    headingSize: 20,
    bodySize: 12,
    lineHeight: 1.4,
  },
  spacing: {
    ...DEFAULT_DESIGN_SETTINGS.spacing,
    density: 0.8,
    sectionMargin: 16,
    contentPadding: 12,
  },
};

/**
 * Alternative design preset: Spacious
 * Ideal for senior positions with less content
 */
export const SPACIOUS_DESIGN_SETTINGS: DesignSettings = {
  ...DEFAULT_DESIGN_SETTINGS,
  typography: {
    ...DEFAULT_DESIGN_SETTINGS.typography,
    headingSize: 28,
    bodySize: 15,
    lineHeight: 1.8,
  },
  spacing: {
    ...DEFAULT_DESIGN_SETTINGS.spacing,
    density: 1.2,
    sectionMargin: 32,
    contentPadding: 20,
  },
};

/**
 * Alternative color preset: Dark Professional
 * Subtle dark theme for modern look
 */
export const DARK_PROFESSIONAL_COLORS = {
  primary: '#3b82f6', // Blue 500
  accent: '#14b8a6', // Teal 500
  text: '#0f172a', // Slate 900
  background: '#f8fafc', // Slate 50
};

/**
 * Alternative color preset: Warm Professional
 * Orange/amber tones for creative roles
 */
export const WARM_PROFESSIONAL_COLORS = {
  primary: '#ea580c', // Orange 600
  accent: '#f59e0b', // Amber 500
  text: '#78350f', // Amber 900
  background: '#ffffff',
};

/**
 * Alternative color preset: Green Professional
 * Green tones for environmental/sustainability roles
 */
export const GREEN_PROFESSIONAL_COLORS = {
  primary: '#059669', // Emerald 600
  accent: '#10b981', // Emerald 500
  text: '#064e3b', // Emerald 900
  background: '#ffffff',
};
