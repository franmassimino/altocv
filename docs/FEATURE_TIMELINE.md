# Feature Timeline System

## Overview

The AltoCV project includes an automated feature timeline system that keeps the README.md updated with the latest completed features and upcoming work.

## How It Works

### 1. Story Parsing

The system reads all story files from [`docs/stories/`](../docs/stories/) and extracts:
- **Title**: The feature name (from the h1 heading)
- **Status**: Whether the story is "Done", "Ready for Review", or in progress
- **Description**: The "I want" part of the user story

### 2. Timeline Generation

The script generates a timeline showing:
- **Latest Feature Published** (✅): The most recently completed story
- **Coming Next** (🚀): The next 1-2 upcoming features

### 3. Automatic Updates

The timeline is automatically updated via GitHub Actions when:
- A story file is modified in the `docs/stories/` directory
- A push is made to the `development` or `master` branches
- The workflow is manually triggered

## Manual Usage

To manually update the feature timeline:

```bash
npm run update:timeline
```

This will parse all story files and update the README.md with the latest information.

## README Integration

The feature timeline is inserted into README.md between special markers:

```markdown
<!-- FEATURE_TIMELINE_START -->
... timeline content here ...
<!-- FEATURE_TIMELINE_END -->
```

**Important**: Do not manually edit content between these markers, as it will be overwritten by the automated system.

## Story File Format

For the system to work correctly, story files must follow this format:

```markdown
# Story X.Y: Feature Title

## Status

**Done**

---

## Story

**As a** user type,
**I want** desired functionality,
**so that** expected benefit.
```

### Required Elements

1. **Title**: Must start with `# Story X.Y: ` followed by the feature name
2. **Status**: Must be one of:
   - `**Done**` - Feature is complete and deployed
   - `**Ready for Review**` - Feature is complete but awaiting review
   - Any other value - Feature is in progress or planned
3. **Story Section**: Must include the user story in the standard format

## GitHub Actions Workflow

The automation is handled by [`.github/workflows/update-feature-timeline.yml`](../.github/workflows/update-feature-timeline.yml):

### Triggers

- **Push events**: When story files are modified on `development` or `master` branches
- **Manual dispatch**: Can be triggered manually from the Actions tab

### Permissions

The workflow requires `contents: write` permission to commit changes back to the repository.

### Skip CI

Commits made by the workflow include `[skip ci]` in the message to prevent triggering additional CI runs.

## Customization

### Modifying the Timeline Format

Edit [`scripts/update-feature-timeline.js`](../scripts/update-feature-timeline.js) and modify the `generateFeatureTimeline()` function.

### Changing the Number of Upcoming Features

In `update-feature-timeline.js`, change this line:

```javascript
const upcomingStories = stories.filter(s => s.status !== 'Done').slice(0, 2);
```

Change `.slice(0, 2)` to `.slice(0, N)` where N is the desired number of upcoming features.

### Adding More Status Types

Add additional status checks in the `parseStoryFile()` function:

```javascript
} else if (line.startsWith('**') && line.includes('Your Status')) {
  status = 'Your Status';
}
```

## Troubleshooting

### Timeline Not Updating

1. Check that story files are in `docs/stories/` directory
2. Verify story files have the `.story.md` extension
3. Ensure story files follow the required format
4. Run `npm run update:timeline` manually to see any errors

### Workflow Not Running

1. Check GitHub Actions permissions in repository settings
2. Verify the workflow file is in `.github/workflows/`
3. Check that the story file path matches the trigger pattern

### Incorrect Timeline Content

1. Verify story status is properly formatted: `**Done**` or `**Ready for Review**`
2. Check that the user story section includes `**I want**`
3. Run the script locally to debug: `node scripts/update-feature-timeline.js`

## Future Enhancements

Potential improvements to the feature timeline system:

- [ ] Add story completion dates
- [ ] Include story completion percentages
- [ ] Show epic-level progress
- [ ] Add visual progress bars
- [ ] Generate a separate CHANGELOG.md
- [ ] Include story metrics (complexity, time spent)
- [ ] Support multiple languages
