/**
 * Example usage of the CV Analyzer Agent
 *
 * This demonstrates how to use the CV analyzer agent to analyze a CV
 * and get detailed feedback and suggestions.
 */

import { mastra } from '../index';
import type { CVContent } from '../../types/cv-content';

// Example CV data
const exampleCV: CVContent = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0100',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
  summary: 'Software engineer with 5 years of experience building web applications using React and Node.js. Passionate about creating user-friendly interfaces and scalable backend systems.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-01-01',
      current: true,
      bullets: [
        'Led development of new dashboard feature that increased user engagement by 35%',
        'Implemented microservices architecture reducing API response time by 50%',
        'Mentored 3 junior developers in React best practices',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2019-06-01',
      endDate: '2020-12-31',
      current: false,
      bullets: [
        'Built customer-facing web application using React and Node.js',
        'Collaborated with design team to implement responsive UI',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015-09-01',
      endDate: '2019-05-31',
      gpa: '3.7',
      achievements: [
        'Dean\'s List 2017-2019',
        'Computer Science Department Award',
      ],
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'SQL',
    'Git',
    'Docker',
    'AWS',
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source Library',
      description: 'Created a React component library with 1000+ GitHub stars',
      technologies: ['React', 'TypeScript', 'Storybook'],
      url: 'https://github.com/johndoe/library',
      highlights: [
        'Used by 50+ companies in production',
        'Comprehensive documentation and examples',
      ],
    },
  ],
};

async function analyzeCV() {
  try {
    // Get the CV analyzer agent
    const cvAgent = mastra.getAgent('cvAnalyzerAgent');

    if (!cvAgent) {
      throw new Error('CV Analyzer Agent not found. Make sure it is registered in mastra instance.');
    }

    console.log('🔍 Analyzing CV...\n');

    // Analyze the CV with the agent
    const response = await cvAgent.generate(
      `Please analyze this CV and provide detailed feedback: ${JSON.stringify(exampleCV)}`,
    );

    console.log('📊 Analysis Result:\n');
    console.log(response.text);

    // You can also specify a target role
    console.log('\n\n🎯 Analyzing for Frontend Developer role...\n');

    const targetedResponse = await cvAgent.generate(
      `Please analyze this CV for a Frontend Developer role: ${JSON.stringify(exampleCV)}`,
    );

    console.log('📊 Targeted Analysis Result:\n');
    console.log(targetedResponse.text);

  } catch (error) {
    console.error('Error analyzing CV:', error);
    throw error;
  }
}

// Run the example
if (require.main === module) {
  analyzeCV()
    .then(() => {
      console.log('\n✅ CV Analysis completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ CV Analysis failed:', error);
      process.exit(1);
    });
}

export { analyzeCV, exampleCV };