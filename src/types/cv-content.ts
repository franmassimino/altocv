/**
 * TypeScript type definitions for CV content structure
 * Used by Zustand store and Prisma Json fields
 */

/**
 * Personal information section of CV
 */
export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  website?: string;
}

/**
 * Single work experience entry
 */
export interface ExperienceItem {
  id: string; // UUID for stable React keys and reordering
  company: string;
  role: string;
  location?: string;
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate?: string; // ISO date string or null if current
  current: boolean; // Is this the current position
  bullets: string[]; // Achievement bullet points
}

/**
 * Single education entry
 */
export interface EducationItem {
  id: string; // UUID for stable React keys
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string or null if ongoing
  gpa?: string;
  achievements: string[]; // Notable achievements or honors
}

/**
 * Single project entry
 */
export interface ProjectItem {
  id: string; // UUID for stable React keys
  name: string;
  description: string;
  technologies: string[]; // Tech stack used
  url?: string; // Project URL or GitHub link
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string or null if ongoing
  highlights: string[]; // Key achievements or features
}

/**
 * Complete CV content structure
 * Stored in CV.content Json field
 */
export interface CVContent {
  personalInfo: PersonalInfo;
  summary?: string; // Professional summary or objective
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[]; // List of skills/technologies
  projects: ProjectItem[];
}

/**
 * Design settings for CV template customization
 * Used by design panel to control colors, fonts, and spacing via CSS custom properties
 */
export interface DesignSettings {
  colors: {
    primary: string;
    accent: string;
    text: string;
    background: string;
  };
  typography: {
    fontPairing: string;
    headingSize: number;
    bodySize: number;
    lineHeight: number;
  };
  spacing: {
    density: number; // 1 = normal, 0.8 = compact, 1.2 = spacious
    sectionMargin: number;
    contentPadding: number;
  };
  layout: {
    sectionOrder: string[];
  };
}
