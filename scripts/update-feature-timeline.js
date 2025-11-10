#!/usr/bin/env node

/**
 * Script to auto-generate feature timeline for README
 * Parses story files and updates README with latest completed and upcoming features
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(__dirname, '..', 'docs', 'stories');
const README_PATH = path.join(__dirname, '..', 'README.md');

// Markers for feature timeline section in README
const START_MARKER = '<!-- FEATURE_TIMELINE_START -->';
const END_MARKER = '<!-- FEATURE_TIMELINE_END -->';

/**
 * Parse a story file to extract metadata
 */
function parseStoryFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let title = '';
  let status = '';
  let storyDescription = '';
  let inStorySection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Extract title (first h1)
    if (!title && line.startsWith('# ')) {
      title = line.replace('# ', '').replace(/Story \d+\.\d+:\s*/, '');
    }

    // Extract status
    if (line.startsWith('**') && line.includes('Done')) {
      status = 'Done';
    } else if (line.startsWith('**') && line.includes('Ready for Review')) {
      status = 'Ready for Review';
    } else if (line === '## Story') {
      inStorySection = true;
    } else if (inStorySection && line.startsWith('**As a**')) {
      // Extract the story description from "I want" part
      let wantPart = '';
      for (let j = i; j < lines.length && !lines[j].startsWith('---'); j++) {
        const storyLine = lines[j].trim();
        if (storyLine.includes('**I want**')) {
          wantPart = storyLine
            .replace(/.*\*\*I want\*\*/i, '')
            .replace(/\*\*so that\*\*.*/i, '')
            .replace(/,$/g, '')
            .trim();
          break;
        }
      }
      storyDescription = wantPart;
      break;
    }
  }

  return { title, status, storyDescription };
}

/**
 * Get all story files sorted by name
 */
function getStoryFiles() {
  if (!fs.existsSync(STORIES_DIR)) {
    console.error(`Stories directory not found: ${STORIES_DIR}`);
    return [];
  }

  const files = fs.readdirSync(STORIES_DIR)
    .filter(file => file.endsWith('.story.md'))
    .sort();

  return files;
}

/**
 * Generate feature timeline markdown
 */
function generateFeatureTimeline() {
  const storyFiles = getStoryFiles();

  if (storyFiles.length === 0) {
    return 'No stories found.';
  }

  const stories = storyFiles.map((file, index) => {
    const filePath = path.join(STORIES_DIR, file);
    const storyData = parseStoryFile(filePath);
    return {
      number: index + 1,
      file,
      ...storyData
    };
  });

  // Find latest completed story
  const completedStories = stories.filter(s => s.status === 'Done');
  const latestCompleted = completedStories[completedStories.length - 1];

  // Find next upcoming stories
  const upcomingStories = stories.filter(s => s.status !== 'Done').slice(0, 2);

  let timeline = `## 📊 Feature Timeline\n\n`;

  // Latest Feature
  if (latestCompleted) {
    timeline += `### ✅ Latest Feature Published\n\n`;
    timeline += `**${latestCompleted.title}**\n\n`;
    timeline += `${latestCompleted.storyDescription}\n\n`;
  }

  // Upcoming Features
  if (upcomingStories.length > 0) {
    timeline += `### 🚀 Coming Next\n\n`;
    upcomingStories.forEach((story, index) => {
      const emoji = index === 0 ? '🔜' : '📅';
      timeline += `${emoji} **${story.title}**`;
      if (story.status === 'Ready for Review') {
        timeline += ` _(In Review)_`;
      }
      timeline += `\n\n`;
    });
  }

  timeline += `---\n`;

  return timeline;
}

/**
 * Update README with feature timeline
 */
function updateReadme() {
  if (!fs.existsSync(README_PATH)) {
    console.error(`README not found: ${README_PATH}`);
    return false;
  }

  let readme = fs.readFileSync(README_PATH, 'utf-8');
  const timeline = generateFeatureTimeline();

  // Check if markers exist
  const hasMarkers = readme.includes(START_MARKER) && readme.includes(END_MARKER);

  if (hasMarkers) {
    // Replace existing timeline
    const startIndex = readme.indexOf(START_MARKER);
    const endIndex = readme.indexOf(END_MARKER) + END_MARKER.length;

    const before = readme.substring(0, startIndex);
    const after = readme.substring(endIndex);

    readme = before + START_MARKER + '\n' + timeline + '\n' + END_MARKER + after;
  } else {
    // Add timeline section before "## 💡 What is AltoCV?"
    const insertPoint = readme.indexOf('## 💡 What is AltoCV?');

    if (insertPoint === -1) {
      console.error('Could not find insertion point in README');
      return false;
    }

    const before = readme.substring(0, insertPoint);
    const after = readme.substring(insertPoint);

    readme = before + START_MARKER + '\n' + timeline + '\n' + END_MARKER + '\n\n' + after;
  }

  fs.writeFileSync(README_PATH, readme, 'utf-8');
  console.log('✅ README updated with feature timeline');
  return true;
}

// Run the script
if (require.main === module) {
  updateReadme();
}

module.exports = { updateReadme, generateFeatureTimeline };
