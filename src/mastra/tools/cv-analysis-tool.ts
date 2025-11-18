import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import type { CVContent } from '../../types/cv-content';

interface CVAnalysisResult {
  overallScore: number; // 0-100
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywordOptimization: {
    missingKeywords: string[];
    presentKeywords: string[];
  };
  sectionScores: {
    personalInfo: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    projects: number;
  };
}

export const cvAnalysisTool = createTool({
  id: 'analyze-cv',
  description: 'Analyzes a CV and provides detailed feedback, scoring, and improvement suggestions',
  inputSchema: z.object({
    cvContent: z.object({
      personalInfo: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        location: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
      }),
      summary: z.string().optional(),
      experience: z.array(z.object({
        id: z.string(),
        company: z.string(),
        role: z.string(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean(),
        bullets: z.array(z.string()),
      })),
      education: z.array(z.object({
        id: z.string(),
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        gpa: z.string().optional(),
        achievements: z.array(z.string()),
      })),
      skills: z.array(z.string()),
      projects: z.array(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        technologies: z.array(z.string()),
        url: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        highlights: z.array(z.string()),
      })),
    }).describe('Complete CV content to analyze'),
    targetRole: z.string().optional().describe('Target job role or industry for optimized analysis'),
  }),
  outputSchema: z.object({
    overallScore: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
    keywordOptimization: z.object({
      missingKeywords: z.array(z.string()),
      presentKeywords: z.array(z.string()),
    }),
    sectionScores: z.object({
      personalInfo: z.number(),
      summary: z.number(),
      experience: z.number(),
      education: z.number(),
      skills: z.number(),
      projects: z.number(),
    }),
  }),
  execute: async ({ context }) => {
    return analyzeCV(context.cvContent, context.targetRole);
  },
});

const analyzeCV = (cvContent: CVContent, targetRole?: string): CVAnalysisResult => {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];
  const sectionScores = {
    personalInfo: 0,
    summary: 0,
    experience: 0,
    education: 0,
    skills: 0,
    projects: 0,
  };

  // Analyze Personal Info
  sectionScores.personalInfo = analyzePersonalInfo(cvContent.personalInfo, strengths, weaknesses, suggestions);

  // Analyze Summary
  sectionScores.summary = analyzeSummary(cvContent.summary, strengths, weaknesses, suggestions);

  // Analyze Experience
  sectionScores.experience = analyzeExperience(cvContent.experience, strengths, weaknesses, suggestions);

  // Analyze Education
  sectionScores.education = analyzeEducation(cvContent.education, strengths, weaknesses, suggestions);

  // Analyze Skills
  sectionScores.skills = analyzeSkills(cvContent.skills, strengths, weaknesses, suggestions);

  // Analyze Projects
  sectionScores.projects = analyzeProjects(cvContent.projects, strengths, weaknesses, suggestions);

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (sectionScores.personalInfo * 0.1 +
      sectionScores.summary * 0.15 +
      sectionScores.experience * 0.3 +
      sectionScores.education * 0.15 +
      sectionScores.skills * 0.15 +
      sectionScores.projects * 0.15)
  );

  // Keyword optimization
  const keywordOptimization = analyzeKeywords(cvContent, targetRole);

  return {
    overallScore,
    strengths,
    weaknesses,
    suggestions,
    keywordOptimization,
    sectionScores,
  };
};

function analyzePersonalInfo(
  personalInfo: CVContent['personalInfo'],
  strengths: string[],
  weaknesses: string[],
  suggestions: string[]
): number {
  let score = 50; // Base score

  if (personalInfo.email) score += 15;
  if (personalInfo.phone) score += 10;
  if (personalInfo.location) score += 10;
  if (personalInfo.linkedin) {
    score += 10;
    strengths.push('LinkedIn profile included');
  } else {
    weaknesses.push('Missing LinkedIn profile');
    suggestions.push('Add your LinkedIn profile URL to increase professional credibility');
  }
  if (personalInfo.website) {
    score += 5;
    strengths.push('Personal website/portfolio included');
  }

  return Math.min(score, 100);
}

function analyzeSummary(
  summary: string | undefined,
  strengths: string[],
  weaknesses: string[],
  suggestions: string[]
): number {
  if (!summary || summary.trim().length === 0) {
    weaknesses.push('Missing professional summary');
    suggestions.push('Add a compelling 2-3 sentence summary highlighting your key strengths and career goals');
    return 0;
  }

  let score = 40; // Base score for having a summary
  const wordCount = summary.split(/\s+/).length;

  if (wordCount >= 30 && wordCount <= 80) {
    score += 40;
    strengths.push('Well-balanced summary length');
  } else if (wordCount < 30) {
    weaknesses.push('Summary is too brief');
    suggestions.push('Expand your summary to 30-80 words for better impact');
  } else {
    weaknesses.push('Summary is too long');
    suggestions.push('Condense your summary to 30-80 words to maintain reader attention');
  }

  // Check for action words
  const actionWords = ['led', 'developed', 'managed', 'created', 'implemented', 'achieved', 'improved'];
  const hasActionWords = actionWords.some(word => summary.toLowerCase().includes(word));
  if (hasActionWords) {
    score += 20;
    strengths.push('Summary uses strong action verbs');
  } else {
    suggestions.push('Use action verbs like "led", "developed", or "achieved" to make your summary more impactful');
  }

  return Math.min(score, 100);
}

function analyzeExperience(
  experience: CVContent['experience'],
  strengths: string[],
  weaknesses: string[],
  suggestions: string[]
): number {
  if (experience.length === 0) {
    weaknesses.push('No work experience listed');
    suggestions.push('Add your work experience, including internships or relevant projects');
    return 0;
  }

  let score = 30; // Base score for having experience

  if (experience.length >= 2) {
    score += 20;
    strengths.push(`${experience.length} work experiences listed`);
  }

  // Check bullet points quality
  let totalBullets = 0;
  let quantifiedBullets = 0;
  const numberPattern = /\d+%?|\$\d+/;

  experience.forEach(exp => {
    totalBullets += exp.bullets.length;
    exp.bullets.forEach(bullet => {
      if (numberPattern.test(bullet)) {
        quantifiedBullets++;
      }
    });
  });

  if (totalBullets >= experience.length * 3) {
    score += 20;
    strengths.push('Good number of achievement bullets per position');
  } else {
    weaknesses.push('Few achievement bullets per position');
    suggestions.push('Add 3-5 achievement bullets per position highlighting your impact');
  }

  const quantifiedPercentage = totalBullets > 0 ? (quantifiedBullets / totalBullets) * 100 : 0;
  if (quantifiedPercentage >= 50) {
    score += 30;
    strengths.push('Achievements are well-quantified with metrics');
  } else if (quantifiedPercentage > 0) {
    score += 15;
    suggestions.push('Add more quantifiable metrics (numbers, percentages, dollar amounts) to your achievements');
  } else {
    weaknesses.push('Achievements lack quantifiable metrics');
    suggestions.push('Quantify your achievements with specific numbers, percentages, or results');
  }

  return Math.min(score, 100);
}

function analyzeEducation(
  education: CVContent['education'],
  strengths: string[],
  weaknesses: string[],
  suggestions: string[]
): number {
  if (education.length === 0) {
    weaknesses.push('No education listed');
    suggestions.push('Add your educational background');
    return 0;
  }

  let score = 60; // Base score for having education

  education.forEach(edu => {
    if (edu.gpa) {
      score += 10;
      strengths.push('GPA included in education');
    }
    if (edu.achievements && edu.achievements.length > 0) {
      score += 15;
      strengths.push('Academic achievements highlighted');
    }
  });

  if (!education.some(edu => edu.gpa)) {
    suggestions.push('Consider adding GPA if it\'s 3.5 or higher');
  }

  return Math.min(score, 100);
}

function analyzeSkills(
  skills: string[],
  strengths: string[],
  weaknesses: string[],
  suggestions: string[]
): number {
  if (skills.length === 0) {
    weaknesses.push('No skills listed');
    suggestions.push('Add relevant technical and soft skills');
    return 0;
  }

  let score = 40; // Base score for having skills

  if (skills.length >= 5 && skills.length <= 15) {
    score += 40;
    strengths.push('Good number of skills listed');
  } else if (skills.length < 5) {
    weaknesses.push('Too few skills listed');
    suggestions.push('Add more relevant skills (aim for 5-15 skills)');
  } else {
    weaknesses.push('Too many skills listed');
    suggestions.push('Focus on your strongest 10-15 skills to avoid overwhelming readers');
  }

  // Check for skill categorization potential
  if (skills.length > 8) {
    score += 20;
    suggestions.push('Consider organizing skills into categories (e.g., Programming Languages, Frameworks, Tools)');
  }

  return Math.min(score, 100);
}

function analyzeProjects(
  projects: CVContent['projects'],
  strengths: string[],
  weaknesses: string[],
  suggestions: string[]
): number {
  if (projects.length === 0) {
    suggestions.push('Add relevant projects to showcase your practical skills');
    return 60; // Not critical, so decent base score
  }

  let score = 70; // Base score for having projects

  if (projects.length >= 2) {
    score += 15;
    strengths.push('Multiple projects showcased');
  }

  projects.forEach(project => {
    if (project.url) {
      score += 5;
    }
    if (project.technologies && project.technologies.length > 0) {
      score += 5;
    }
    if (project.highlights && project.highlights.length > 0) {
      score += 5;
    }
  });

  if (!projects.some(p => p.url)) {
    suggestions.push('Add URLs or GitHub links to your projects');
  }

  return Math.min(score, 100);
}

function analyzeKeywords(cvContent: CVContent, targetRole?: string): CVAnalysisResult['keywordOptimization'] {
  // Extract all text from CV
  const cvText = JSON.stringify(cvContent).toLowerCase();

  // Common professional keywords
  const commonKeywords = [
    'leadership', 'team', 'project management', 'agile', 'collaboration',
    'communication', 'problem solving', 'analysis', 'strategy', 'innovation'
  ];

  // Technical keywords (example set)
  const technicalKeywords = [
    'javascript', 'typescript', 'react', 'node.js', 'python', 'sql',
    'aws', 'docker', 'kubernetes', 'git', 'api', 'testing'
  ];

  const allRelevantKeywords = [...commonKeywords, ...technicalKeywords];

  const presentKeywords = allRelevantKeywords.filter(keyword => cvText.includes(keyword.toLowerCase()));
  const missingKeywords = allRelevantKeywords.filter(keyword => !cvText.includes(keyword.toLowerCase()));

  // If target role is specified, add role-specific keywords
  if (targetRole) {
    const roleKeywords = getRoleSpecificKeywords(targetRole);
    const missingRoleKeywords = roleKeywords.filter(keyword => !cvText.includes(keyword.toLowerCase()));

    if (missingRoleKeywords.length > 0) {
      missingKeywords.push(...missingRoleKeywords);
    }
  }

  return {
    presentKeywords: presentKeywords.slice(0, 10), // Top 10
    missingKeywords: missingKeywords.slice(0, 8), // Top 8 missing
  };
}

function getRoleSpecificKeywords(role: string): string[] {
  const roleLower = role.toLowerCase();

  if (roleLower.includes('frontend') || roleLower.includes('front-end')) {
    return ['react', 'vue', 'angular', 'css', 'responsive design', 'webpack'];
  } else if (roleLower.includes('backend') || roleLower.includes('back-end')) {
    return ['api', 'database', 'microservices', 'rest', 'graphql', 'authentication'];
  } else if (roleLower.includes('fullstack') || roleLower.includes('full-stack')) {
    return ['react', 'node.js', 'database', 'api', 'deployment', 'ci/cd'];
  } else if (roleLower.includes('devops')) {
    return ['kubernetes', 'docker', 'ci/cd', 'aws', 'terraform', 'monitoring'];
  } else if (roleLower.includes('data')) {
    return ['python', 'sql', 'machine learning', 'analytics', 'visualization', 'etl'];
  }

  return [];
}