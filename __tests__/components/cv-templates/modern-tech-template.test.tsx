/**
 * Tests for Modern Tech Template Component
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ModernTechTemplate from '@/components/cv-templates/modern-tech-template';
import type { CVContent } from '@/types/cv-content';

// Mock date-fns to have consistent date formatting in tests
vi.mock('date-fns', () => ({
  format: vi.fn((date) => {
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${month} ${year}`;
  }),
}));

// Complete CV data fixture
const completeCVData: CVContent = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.com',
  },
  summary:
    'Experienced Full Stack Software Engineer with 7+ years of expertise.',
  experience: [
    {
      id: '1',
      company: 'Tech Company',
      role: 'Senior Developer',
      location: 'San Francisco, CA',
      startDate: '2021-06-01',
      endDate: undefined,
      current: true,
      bullets: [
        'Led development of microservices',
        'Mentored junior developers',
      ],
    },
    {
      id: '2',
      company: 'Startup Inc',
      role: 'Developer',
      location: 'Austin, TX',
      startDate: '2019-03-01',
      endDate: '2021-05-31',
      current: false,
      bullets: ['Built web applications', 'Optimized database queries'],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2013-09-01',
      endDate: '2017-05-31',
      gpa: '3.8',
      achievements: ["Dean's List", 'CS Club President'],
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
  projects: [
    {
      id: '1',
      name: 'Open Source CV Builder',
      description: 'Full-stack web application for creating CVs',
      technologies: ['Next.js', 'TypeScript', 'Prisma'],
      url: 'https://github.com/johndoe/cv-builder',
      startDate: '2023-01-01',
      endDate: undefined,
      highlights: ['2,000+ GitHub stars', 'Featured in ProductHunt'],
    },
  ],
};

// Minimal CV data fixture
const minimalCVData: CVContent = {
  personalInfo: {
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

describe('ModernTechTemplate', () => {
  describe('Rendering with complete data', () => {
    it('should render personal info correctly', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });

    it('should render summary section when provided', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByText('Professional Summary')).toBeInTheDocument();
      expect(
        screen.getByText(/Experienced Full Stack Software Engineer/)
      ).toBeInTheDocument();
    });

    it('should render all experience items', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByText('Work Experience')).toBeInTheDocument();
      expect(screen.getByText('Tech Company')).toBeInTheDocument();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      expect(screen.getByText('Startup Inc')).toBeInTheDocument();
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('should render education section', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByText('Education')).toBeInTheDocument();
      expect(screen.getByText('University of California')).toBeInTheDocument();
      expect(
        screen.getByText('Bachelor of Science in Computer Science')
      ).toBeInTheDocument();
      expect(screen.getByText('GPA: 3.8')).toBeInTheDocument();
    });

    it('should render skills section with badges', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    it('should render projects section', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Open Source CV Builder')).toBeInTheDocument();
      expect(
        screen.getByText(/Full-stack web application/)
      ).toBeInTheDocument();
    });
  });

  describe('Conditional rendering', () => {
    it('should not render summary section when not provided', () => {
      render(<ModernTechTemplate cv={minimalCVData} />);

      expect(
        screen.queryByText('Professional Summary')
      ).not.toBeInTheDocument();
    });

    it('should not render optional contact fields when not provided', () => {
      render(<ModernTechTemplate cv={minimalCVData} />);

      expect(screen.queryByText(/LinkedIn/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Website/)).not.toBeInTheDocument();
    });

    it('should not render empty sections', () => {
      render(<ModernTechTemplate cv={minimalCVData} />);

      expect(screen.queryByText('Work Experience')).not.toBeInTheDocument();
      expect(screen.queryByText('Education')).not.toBeInTheDocument();
      expect(screen.queryByText('Skills')).not.toBeInTheDocument();
      expect(screen.queryByText('Projects')).not.toBeInTheDocument();
    });
  });

  describe('Date formatting', () => {
    it('should display "Present" for current positions', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByText(/Present/)).toBeInTheDocument();
    });

    it('should format dates correctly for past positions', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      // Check that dates are formatted (mocked to "Month Year")
      const dateElements = screen.getAllByText(/2021|2019|2013|2017/);
      expect(dateElements.length).toBeGreaterThan(0);
    });
  });

  describe('External links security', () => {
    it('should add rel="noopener noreferrer" to external links', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(linkedinLink).toHaveAttribute('target', '_blank');

      const websiteLink = screen.getByRole('link', { name: /Website/i });
      expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(websiteLink).toHaveAttribute('target', '_blank');
    });

    it('should make project URLs clickable with proper attributes', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      const projectLink = screen.getByRole('link', {
        name: /Open Source CV Builder/i,
      });
      expect(projectLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(projectLink).toHaveAttribute('target', '_blank');
      expect(projectLink).toHaveAttribute(
        'href',
        'https://github.com/johndoe/cv-builder'
      );
    });
  });

  describe('CSS Custom Properties', () => {
    it('should apply default CSS custom properties when no design settings provided', () => {
      const { container } = render(<ModernTechTemplate cv={minimalCVData} />);

      const templateDiv = container.querySelector('.cv-template');
      expect(templateDiv).toBeInTheDocument();

      // Check that style attribute is applied (contains CSS variables)
      const style = templateDiv?.getAttribute('style');
      expect(style).toContain('--cv-color-primary');
      expect(style).toContain('--cv-color-text');
      expect(style).toContain('--cv-font-heading');
    });

    it('should apply custom design settings when provided', () => {
      const customDesignSettings = {
        colors: {
          primary: '#ff0000',
          accent: '#00ff00',
          text: '#000000',
          background: '#ffffff',
        },
        typography: {
          fontPairing: 'Arial',
          headingSize: 32,
          bodySize: 16,
          lineHeight: 1.8,
        },
        spacing: {
          density: 1.2,
          sectionMargin: 32,
          contentPadding: 20,
        },
        layout: {
          sectionOrder: ['personalInfo', 'summary', 'experience'],
        },
      };

      const { container } = render(
        <ModernTechTemplate
          cv={minimalCVData}
          designSettings={customDesignSettings}
        />
      );

      const templateDiv = container.querySelector('.cv-template');
      const style = templateDiv?.getAttribute('style');

      expect(style).toContain('--cv-color-primary: #ff0000');
      expect(style).toContain('--cv-font-heading: Arial');
      expect(style).toContain('--cv-heading-size: 32px');
    });
  });

  describe('Responsive classes', () => {
    it('should apply responsive Tailwind classes', () => {
      const { container } = render(<ModernTechTemplate cv={completeCVData} />);

      // Check for responsive padding classes
      const mainDiv = container.querySelector('.px-4.md\\:px-8');
      expect(mainDiv).toBeInTheDocument();

      // Check for responsive text size classes
      const heading = container.querySelector('.text-3xl.md\\:text-4xl');
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML elements', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(
        screen.getAllByRole('heading', { level: 2 }).length
      ).toBeGreaterThan(0);
    });

    it('should render lists with proper structure', () => {
      render(<ModernTechTemplate cv={completeCVData} />);

      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
    });
  });
});
