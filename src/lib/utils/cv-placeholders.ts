/**
 * CV Placeholder Data Generator
 * Provides default CV content for new CVs and empty editor initialization
 */

import { nanoid } from 'nanoid';
import type {
  CVContent,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  ProjectItem,
} from '@/types/cv-content';

/**
 * Generate default personal info placeholder
 */
function getDefaultPersonalInfo(): PersonalInfo {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
  };
}

/**
 * Generate sample experience entries
 */
function getDefaultExperience(): ExperienceItem[] {
  return [
    {
      id: nanoid(),
      company: 'Tech Innovations Inc.',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-06-01',
      endDate: undefined,
      current: true,
      bullets: [
        'Led development of microservices architecture serving 1M+ users, reducing latency by 40%',
        'Architected and implemented real-time data processing pipeline using Apache Kafka',
        'Mentored team of 5 junior developers, improving code quality and development velocity',
        'Drove adoption of TypeScript and Next.js across frontend teams',
      ],
    },
    {
      id: nanoid(),
      company: 'Digital Solutions LLC',
      role: 'Full Stack Developer',
      location: 'Austin, TX',
      startDate: '2019-03-01',
      endDate: '2021-05-31',
      current: false,
      bullets: [
        'Built customer-facing web applications using React, Node.js, and PostgreSQL',
        'Designed and implemented RESTful APIs serving 500K+ monthly active users',
        'Optimized database queries, reducing response times by 60%',
        'Collaborated with UX team to deliver responsive, accessible user interfaces',
      ],
    },
    {
      id: nanoid(),
      company: 'Startup Ventures',
      role: 'Junior Developer',
      location: 'Remote',
      startDate: '2017-08-01',
      endDate: '2019-02-28',
      current: false,
      bullets: [
        'Developed features for MVP e-commerce platform using Django and Vue.js',
        'Wrote unit and integration tests achieving 85%+ code coverage',
        'Participated in agile ceremonies and code reviews',
      ],
    },
  ];
}

/**
 * Generate sample education entries
 */
function getDefaultEducation(): EducationItem[] {
  return [
    {
      id: nanoid(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2013-09-01',
      endDate: '2017-05-31',
      gpa: '3.8',
      achievements: [
        'Dean\'s List all semesters',
        'CS Student Association President (2016-2017)',
        'Capstone project: Built ML-powered recommendation engine',
      ],
    },
    {
      id: nanoid(),
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Software Engineering',
      location: 'Stanford, CA',
      startDate: '2017-09-01',
      endDate: '2019-06-30',
      gpa: '3.9',
      achievements: [
        'Research published in ACM SIGSOFT conference',
        'Teaching Assistant for Software Design course',
      ],
    },
  ];
}

/**
 * Generate sample skills
 */
function getDefaultSkills(): string[] {
  return [
    'JavaScript/TypeScript',
    'React/Next.js',
    'Node.js/Express',
    'PostgreSQL/MongoDB',
    'AWS/Docker/Kubernetes',
    'GraphQL/REST APIs',
    'CI/CD (GitHub Actions)',
  ];
}

/**
 * Generate sample projects
 */
function getDefaultProjects(): ProjectItem[] {
  return [
    {
      id: nanoid(),
      name: 'Open Source CV Builder',
      description:
        'Full-stack web application for creating ATS-friendly CVs with AI-powered suggestions',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'OpenAI API'],
      url: 'github.com/johndoe/cv-builder',
      startDate: '2023-01-01',
      endDate: undefined,
      highlights: [
        '2,000+ GitHub stars and 500+ forks',
        'Featured in ProductHunt top 10 products of the week',
        'Serving 10,000+ monthly active users',
      ],
    },
    {
      id: nanoid(),
      name: 'Real-time Chat Platform',
      description:
        'Scalable WebSocket-based chat application with end-to-end encryption',
      technologies: ['Socket.io', 'Redis', 'React', 'Node.js'],
      url: 'github.com/johndoe/chat-platform',
      startDate: '2022-06-01',
      endDate: '2022-12-31',
      highlights: [
        'Supports 100,000+ concurrent connections',
        'Implemented E2E encryption using Web Crypto API',
        'Deployed on AWS with auto-scaling infrastructure',
      ],
    },
  ];
}

/**
 * Get default CV content with all placeholder data
 */
export function getDefaultCVContent(): CVContent {
  return {
    personalInfo: getDefaultPersonalInfo(),
    summary:
      'Experienced Full Stack Software Engineer with 7+ years of expertise in building scalable web applications. Specialized in TypeScript, React, Node.js, and cloud infrastructure. Proven track record of leading teams, architecting solutions, and delivering high-impact products for millions of users.',
    experience: getDefaultExperience(),
    education: getDefaultEducation(),
    skills: getDefaultSkills(),
    projects: getDefaultProjects(),
  };
}

/**
 * Get default design settings for CV
 * (Will be expanded in future stories for design customization)
 */
export function getDefaultDesignSettings(): Record<string, unknown> {
  return {
    template: 'modern',
    fontSize: 11,
    margins: {
      top: 0.5,
      right: 0.5,
      bottom: 0.5,
      left: 0.5,
    },
    colors: {
      primary: '#1a73e8',
      text: '#333333',
      headings: '#000000',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  };
}
