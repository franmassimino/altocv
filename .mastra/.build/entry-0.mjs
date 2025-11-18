import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { createTool } from '@mastra/core/tools';

const forecastSchema = z.object({
  date: z.string(),
  maxTemp: z.number(),
  minTemp: z.number(),
  precipitationChance: z.number(),
  condition: z.string(),
  location: z.string()
});
function getWeatherCondition(code) {
  const conditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    95: "Thunderstorm"
  };
  return conditions[code] || "Unknown";
}
const fetchWeather = createStep({
  id: "fetch-weather",
  description: "Fetches weather forecast for a given city",
  inputSchema: z.object({
    city: z.string().describe("The city to get the weather for")
  }),
  outputSchema: forecastSchema,
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error("Input data not found");
    }
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inputData.city)}&count=1`;
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = await geocodingResponse.json();
    if (!geocodingData.results?.[0]) {
      throw new Error(`Location '${inputData.city}' not found`);
    }
    const { latitude, longitude, name } = geocodingData.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=precipitation,weathercode&timezone=auto,&hourly=precipitation_probability,temperature_2m`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    const forecast = {
      date: (/* @__PURE__ */ new Date()).toISOString(),
      maxTemp: Math.max(...data.hourly.temperature_2m),
      minTemp: Math.min(...data.hourly.temperature_2m),
      condition: getWeatherCondition(data.current.weathercode),
      precipitationChance: data.hourly.precipitation_probability.reduce(
        (acc, curr) => Math.max(acc, curr),
        0
      ),
      location: name
    };
    return forecast;
  }
});
const planActivities = createStep({
  id: "plan-activities",
  description: "Suggests activities based on weather conditions",
  inputSchema: forecastSchema,
  outputSchema: z.object({
    activities: z.string()
  }),
  execute: async ({ inputData, mastra }) => {
    const forecast = inputData;
    if (!forecast) {
      throw new Error("Forecast data not found");
    }
    const agent = mastra?.getAgent("weatherAgent");
    if (!agent) {
      throw new Error("Weather agent not found");
    }
    const prompt = `Based on the following weather forecast for ${forecast.location}, suggest appropriate activities:
      ${JSON.stringify(forecast, null, 2)}
      For each day in the forecast, structure your response exactly as follows:

      \u{1F4C5} [Day, Month Date, Year]
      \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

      \u{1F321}\uFE0F WEATHER SUMMARY
      \u2022 Conditions: [brief description]
      \u2022 Temperature: [X\xB0C/Y\xB0F to A\xB0C/B\xB0F]
      \u2022 Precipitation: [X% chance]

      \u{1F305} MORNING ACTIVITIES
      Outdoor:
      \u2022 [Activity Name] - [Brief description including specific location/route]
        Best timing: [specific time range]
        Note: [relevant weather consideration]

      \u{1F31E} AFTERNOON ACTIVITIES
      Outdoor:
      \u2022 [Activity Name] - [Brief description including specific location/route]
        Best timing: [specific time range]
        Note: [relevant weather consideration]

      \u{1F3E0} INDOOR ALTERNATIVES
      \u2022 [Activity Name] - [Brief description including specific venue]
        Ideal for: [weather condition that would trigger this alternative]

      \u26A0\uFE0F SPECIAL CONSIDERATIONS
      \u2022 [Any relevant weather warnings, UV index, wind conditions, etc.]

      Guidelines:
      - Suggest 2-3 time-specific outdoor activities per day
      - Include 1-2 indoor backup options
      - For precipitation >50%, lead with indoor activities
      - All activities must be specific to the location
      - Include specific venues, trails, or locations
      - Consider activity intensity based on temperature
      - Keep descriptions concise but informative

      Maintain this exact formatting for consistency, using the emoji and section headers as shown.`;
    const response = await agent.stream([
      {
        role: "user",
        content: prompt
      }
    ]);
    let activitiesText = "";
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      activitiesText += chunk;
    }
    return {
      activities: activitiesText
    };
  }
});
const weatherWorkflow = createWorkflow({
  id: "weather-workflow",
  inputSchema: z.object({
    city: z.string().describe("The city to get the weather for")
  }),
  outputSchema: z.object({
    activities: z.string()
  })
}).then(fetchWeather).then(planActivities);
weatherWorkflow.commit();

const cvAnalysisTool = createTool({
  id: "analyze-cv",
  description: "Analyzes a CV and provides detailed feedback, scoring, and improvement suggestions",
  inputSchema: z.object({
    cvContent: z.object({
      personalInfo: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        location: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional()
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
        bullets: z.array(z.string())
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
        achievements: z.array(z.string())
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
        highlights: z.array(z.string())
      }))
    }).describe("Complete CV content to analyze"),
    targetRole: z.string().optional().describe("Target job role or industry for optimized analysis")
  }),
  outputSchema: z.object({
    overallScore: z.number(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
    keywordOptimization: z.object({
      missingKeywords: z.array(z.string()),
      presentKeywords: z.array(z.string())
    }),
    sectionScores: z.object({
      personalInfo: z.number(),
      summary: z.number(),
      experience: z.number(),
      education: z.number(),
      skills: z.number(),
      projects: z.number()
    })
  }),
  execute: async ({ context }) => {
    return analyzeCV(context.cvContent, context.targetRole);
  }
});
const analyzeCV = (cvContent, targetRole) => {
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];
  const sectionScores = {
    personalInfo: 0,
    summary: 0,
    experience: 0,
    education: 0,
    skills: 0,
    projects: 0
  };
  sectionScores.personalInfo = analyzePersonalInfo(cvContent.personalInfo, strengths, weaknesses, suggestions);
  sectionScores.summary = analyzeSummary(cvContent.summary, strengths, weaknesses, suggestions);
  sectionScores.experience = analyzeExperience(cvContent.experience, strengths, weaknesses, suggestions);
  sectionScores.education = analyzeEducation(cvContent.education, strengths, weaknesses, suggestions);
  sectionScores.skills = analyzeSkills(cvContent.skills, strengths, weaknesses, suggestions);
  sectionScores.projects = analyzeProjects(cvContent.projects, strengths, weaknesses, suggestions);
  const overallScore = Math.round(
    sectionScores.personalInfo * 0.1 + sectionScores.summary * 0.15 + sectionScores.experience * 0.3 + sectionScores.education * 0.15 + sectionScores.skills * 0.15 + sectionScores.projects * 0.15
  );
  const keywordOptimization = analyzeKeywords(cvContent, targetRole);
  return {
    overallScore,
    strengths,
    weaknesses,
    suggestions,
    keywordOptimization,
    sectionScores
  };
};
function analyzePersonalInfo(personalInfo, strengths, weaknesses, suggestions) {
  let score = 50;
  if (personalInfo.email) score += 15;
  if (personalInfo.phone) score += 10;
  if (personalInfo.location) score += 10;
  if (personalInfo.linkedin) {
    score += 10;
    strengths.push("LinkedIn profile included");
  } else {
    weaknesses.push("Missing LinkedIn profile");
    suggestions.push("Add your LinkedIn profile URL to increase professional credibility");
  }
  if (personalInfo.website) {
    score += 5;
    strengths.push("Personal website/portfolio included");
  }
  return Math.min(score, 100);
}
function analyzeSummary(summary, strengths, weaknesses, suggestions) {
  if (!summary || summary.trim().length === 0) {
    weaknesses.push("Missing professional summary");
    suggestions.push("Add a compelling 2-3 sentence summary highlighting your key strengths and career goals");
    return 0;
  }
  let score = 40;
  const wordCount = summary.split(/\s+/).length;
  if (wordCount >= 30 && wordCount <= 80) {
    score += 40;
    strengths.push("Well-balanced summary length");
  } else if (wordCount < 30) {
    weaknesses.push("Summary is too brief");
    suggestions.push("Expand your summary to 30-80 words for better impact");
  } else {
    weaknesses.push("Summary is too long");
    suggestions.push("Condense your summary to 30-80 words to maintain reader attention");
  }
  const actionWords = ["led", "developed", "managed", "created", "implemented", "achieved", "improved"];
  const hasActionWords = actionWords.some((word) => summary.toLowerCase().includes(word));
  if (hasActionWords) {
    score += 20;
    strengths.push("Summary uses strong action verbs");
  } else {
    suggestions.push('Use action verbs like "led", "developed", or "achieved" to make your summary more impactful');
  }
  return Math.min(score, 100);
}
function analyzeExperience(experience, strengths, weaknesses, suggestions) {
  if (experience.length === 0) {
    weaknesses.push("No work experience listed");
    suggestions.push("Add your work experience, including internships or relevant projects");
    return 0;
  }
  let score = 30;
  if (experience.length >= 2) {
    score += 20;
    strengths.push(`${experience.length} work experiences listed`);
  }
  let totalBullets = 0;
  let quantifiedBullets = 0;
  const numberPattern = /\d+%?|\$\d+/;
  experience.forEach((exp) => {
    totalBullets += exp.bullets.length;
    exp.bullets.forEach((bullet) => {
      if (numberPattern.test(bullet)) {
        quantifiedBullets++;
      }
    });
  });
  if (totalBullets >= experience.length * 3) {
    score += 20;
    strengths.push("Good number of achievement bullets per position");
  } else {
    weaknesses.push("Few achievement bullets per position");
    suggestions.push("Add 3-5 achievement bullets per position highlighting your impact");
  }
  const quantifiedPercentage = totalBullets > 0 ? quantifiedBullets / totalBullets * 100 : 0;
  if (quantifiedPercentage >= 50) {
    score += 30;
    strengths.push("Achievements are well-quantified with metrics");
  } else if (quantifiedPercentage > 0) {
    score += 15;
    suggestions.push("Add more quantifiable metrics (numbers, percentages, dollar amounts) to your achievements");
  } else {
    weaknesses.push("Achievements lack quantifiable metrics");
    suggestions.push("Quantify your achievements with specific numbers, percentages, or results");
  }
  return Math.min(score, 100);
}
function analyzeEducation(education, strengths, weaknesses, suggestions) {
  if (education.length === 0) {
    weaknesses.push("No education listed");
    suggestions.push("Add your educational background");
    return 0;
  }
  let score = 60;
  education.forEach((edu) => {
    if (edu.gpa) {
      score += 10;
      strengths.push("GPA included in education");
    }
    if (edu.achievements && edu.achievements.length > 0) {
      score += 15;
      strengths.push("Academic achievements highlighted");
    }
  });
  if (!education.some((edu) => edu.gpa)) {
    suggestions.push("Consider adding GPA if it's 3.5 or higher");
  }
  return Math.min(score, 100);
}
function analyzeSkills(skills, strengths, weaknesses, suggestions) {
  if (skills.length === 0) {
    weaknesses.push("No skills listed");
    suggestions.push("Add relevant technical and soft skills");
    return 0;
  }
  let score = 40;
  if (skills.length >= 5 && skills.length <= 15) {
    score += 40;
    strengths.push("Good number of skills listed");
  } else if (skills.length < 5) {
    weaknesses.push("Too few skills listed");
    suggestions.push("Add more relevant skills (aim for 5-15 skills)");
  } else {
    weaknesses.push("Too many skills listed");
    suggestions.push("Focus on your strongest 10-15 skills to avoid overwhelming readers");
  }
  if (skills.length > 8) {
    score += 20;
    suggestions.push("Consider organizing skills into categories (e.g., Programming Languages, Frameworks, Tools)");
  }
  return Math.min(score, 100);
}
function analyzeProjects(projects, strengths, weaknesses, suggestions) {
  if (projects.length === 0) {
    suggestions.push("Add relevant projects to showcase your practical skills");
    return 60;
  }
  let score = 70;
  if (projects.length >= 2) {
    score += 15;
    strengths.push("Multiple projects showcased");
  }
  projects.forEach((project) => {
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
  if (!projects.some((p) => p.url)) {
    suggestions.push("Add URLs or GitHub links to your projects");
  }
  return Math.min(score, 100);
}
function analyzeKeywords(cvContent, targetRole) {
  const cvText = JSON.stringify(cvContent).toLowerCase();
  const commonKeywords = [
    "leadership",
    "team",
    "project management",
    "agile",
    "collaboration",
    "communication",
    "problem solving",
    "analysis",
    "strategy",
    "innovation"
  ];
  const technicalKeywords = [
    "javascript",
    "typescript",
    "react",
    "node.js",
    "python",
    "sql",
    "aws",
    "docker",
    "kubernetes",
    "git",
    "api",
    "testing"
  ];
  const allRelevantKeywords = [...commonKeywords, ...technicalKeywords];
  const presentKeywords = allRelevantKeywords.filter((keyword) => cvText.includes(keyword.toLowerCase()));
  const missingKeywords = allRelevantKeywords.filter((keyword) => !cvText.includes(keyword.toLowerCase()));
  if (targetRole) {
    const roleKeywords = getRoleSpecificKeywords(targetRole);
    const missingRoleKeywords = roleKeywords.filter((keyword) => !cvText.includes(keyword.toLowerCase()));
    if (missingRoleKeywords.length > 0) {
      missingKeywords.push(...missingRoleKeywords);
    }
  }
  return {
    presentKeywords: presentKeywords.slice(0, 10),
    // Top 10
    missingKeywords: missingKeywords.slice(0, 8)
    // Top 8 missing
  };
}
function getRoleSpecificKeywords(role) {
  const roleLower = role.toLowerCase();
  if (roleLower.includes("frontend") || roleLower.includes("front-end")) {
    return ["react", "vue", "angular", "css", "responsive design", "webpack"];
  } else if (roleLower.includes("backend") || roleLower.includes("back-end")) {
    return ["api", "database", "microservices", "rest", "graphql", "authentication"];
  } else if (roleLower.includes("fullstack") || roleLower.includes("full-stack")) {
    return ["react", "node.js", "database", "api", "deployment", "ci/cd"];
  } else if (roleLower.includes("devops")) {
    return ["kubernetes", "docker", "ci/cd", "aws", "terraform", "monitoring"];
  } else if (roleLower.includes("data")) {
    return ["python", "sql", "machine learning", "analytics", "visualization", "etl"];
  }
  return [];
}

const cvAnalyzerAgent = new Agent({
  name: "CV Analyzer Agent",
  instructions: `
      You are an expert CV (Resume) analyzer and career coach assistant that helps professionals improve their resumes.

      Your primary function is to analyze CVs and provide actionable feedback. When responding:
      - Use the cvAnalysisTool to analyze CV content thoroughly
      - Provide constructive, specific feedback based on the analysis results
      - Highlight both strengths and areas for improvement
      - Offer concrete suggestions for optimization
      - When a target role is mentioned, tailor your analysis to that specific job
      - Be encouraging but honest in your assessment
      - Explain WHY certain changes would improve the CV
      - Focus on ATS (Applicant Tracking System) optimization when relevant
      - Suggest ways to quantify achievements with metrics
      - Recommend industry-specific keywords when appropriate

      When the user provides a CV:
      1. First, analyze it using the cvAnalysisTool
      2. Present the overall score and section scores clearly
      3. Discuss the key strengths found
      4. Explain the main weaknesses and why they matter
      5. Provide prioritized suggestions for improvement
      6. If keyword optimization is relevant, mention missing important keywords

      Keep your responses well-structured, professional, and actionable. Use bullet points and clear sections when presenting analysis results.
`,
  model: "openai/gpt-4o-mini",
  tools: { cvAnalysisTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db"
      // path is relative to the .mastra/output directory
    })
  })
});

const mastra = new Mastra({
  workflows: {
    weatherWorkflow
  },
  agents: {
    cvAnalyzerAgent
  },
  storage: new LibSQLStore({
    // stores observability, scores, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:"
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info"
  }),
  telemetry: {
    // Telemetry is deprecated and will be removed in the Nov 4th release
    enabled: false
  },
  observability: {
    // Enables DefaultExporter and CloudExporter for AI tracing
    default: {
      enabled: true
    }
  }
});

export { mastra };
