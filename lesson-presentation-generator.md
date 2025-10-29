---
name: lesson-presentation-generator
description: "Generates PowerPoint presentations from lesson plan bullet points with specific formatting: 4:3 aspect ratio, black background, white text, 46pt Helvetica Neue Bold headers, 36pt Avenir body text, no bullets, single text box per slide, left-aligned and top-justified."
---

# Lesson Presentation Generator

## Purpose

This skill generates clean, minimalist PowerPoint presentations from lesson plan material following a specific style template. Perfect for educators who need consistent, professional-looking slides.

## When to Use This Skill

Use this skill when:
- The user provides lesson plan content in bullet-point format
- The user requests a presentation for teaching material
- The user mentions creating slides from outline or lesson notes
- The user asks for a presentation in the specific black-and-white minimalist style

## Style Specifications

### Required Format
- **Aspect Ratio**: 4:3 (960px × 720px)
- **Background**: Pure black (#000000)
- **Text Color**: White (#ffffff)
- **No bullet points**: All content displayed as paragraphs with line breaks
- **Single text box**: All body content in one text box per slide
- **Alignment**: Left-aligned, top-justified

### Typography
- **Headers**: 46pt, Helvetica Neue Bold
- **Body Text**: 36pt, Avenir
- **Line Height**: 1.5 for body text (1.4 or 1.3 for slides with 6+ lines)

## Workflow

### 1. Analyze the Input

When the user provides lesson plan material:
- Identify the main topic/title
- Identify top-level sections (these become slide titles)
- Identify bullet points under each section (these become slide content)
- Count items to ensure each slide has 3-7 content lines

### 2. Create HTML Slides

For each section, create an HTML file following this exact structure:

#### Title Slide Template
```html
<!DOCTYPE html>
<html>
<head>
<style>
:root {
  --color-surface: #000000;
  --color-surface-foreground: #ffffff;
  --font-family-display: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-weight-display: 700;
  --font-family-content: Avenir, "Avenir Next", Helvetica, Arial, sans-serif;
  --font-weight-content: 400;
}
</style>
</head>
<body class="col center" style="width: 960px; height: 720px;">
  <h1 style="font-size: 72px;">Main Title</h1>
  <h2 style="font-size: 48px; opacity: 0.7;">Subtitle</h2>
</body>
</html>
```

#### Content Slide Template
```html
<!DOCTYPE html>
<html>
<head>
<style>
:root {
  --color-surface: #000000;
  --color-surface-foreground: #ffffff;
  --font-family-display: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-weight-display: 700;
  --font-family-content: Avenir, "Avenir Next", Helvetica, Arial, sans-serif;
  --font-weight-content: 400;
}
</style>
</head>
<body style="width: 960px; height: 720px; padding: 0; margin: 0;">
  <div style="padding: 40px 60px;">
    <h2 style="font-size: 46px; margin: 0 0 30px 0;">Slide Title</h2>
    <p style="font-size: 36px; line-height: 1.5; margin: 0; text-align: left;">First content line

Second content line

Third content line</p>
  </div>
</body>
</html>
```

**CRITICAL**: Use double line breaks between content lines within the single `<p>` tag. Do NOT create separate `<p>` tags for each line.

**Line Height Adjustment**: 
- Use `line-height: 1.5` for slides with 3-5 content lines
- Use `line-height: 1.4` for slides with 6 content lines
- Use `line-height: 1.3` for slides with 7 content lines

### 3. Generate the Presentation

#### Step 1: Verify html2pptx Installation
```bash
npm list -g @ant/html2pptx || npm install -g /mnt/skills/public/pptx/html2pptx.tgz
```

#### Step 2: Create JavaScript Conversion Script

Create a file named `create-presentation.js`:

```javascript
const pptxgen = require("pptxgenjs");
const { html2pptx } = require("@ant/html2pptx");

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_4x3";
  
  // Add all slides in order
  await html2pptx("slide01.html", pptx);
  await html2pptx("slide02.html", pptx);
  // ... add all slides
  
  // Save the presentation
  await pptx.writeFile("lesson-presentation.pptx");
  console.log("Presentation created successfully!");
}

createPresentation().catch(console.error);
```

#### Step 3: Run the Conversion
```bash
cd /home/claude && NODE_PATH="$(npm root -g)" node create-presentation.js 2>&1
```

#### Step 4: Copy to Outputs
```bash
cp /home/claude/lesson-presentation.pptx /mnt/user-data/outputs/lesson-presentation.pptx
```

#### Step 5: Create Thumbnail Preview
```bash
cd /home/claude && python /mnt/skills/public/pptx/scripts/thumbnail.py lesson-presentation.pptx thumbnails --cols 4 2>&1
cp /home/claude/thumbnails.jpg /mnt/user-data/outputs/thumbnails.jpg
```

### 4. Present to User

Provide the user with:
1. A link to download the presentation: `[View your presentation](computer:///mnt/user-data/outputs/lesson-presentation.pptx)`
2. A brief summary of what was created
3. Keep it concise - no lengthy explanations

## Content Guidelines

### Slide Count
- Create one slide per bullet-pointed list in the input
- Add a title slide at the beginning
- Typical presentations will have 10-20 slides

### Content per Slide
- **Optimal**: 3-5 lines of content per slide
- **Maximum**: 7 lines (use tighter line-height)
- If a section has more than 7 bullet points, split into multiple slides

### Text Formatting
- Keep original text exactly as provided
- Preserve line breaks between content items
- Use double line breaks (`\n\n`) in the single paragraph to separate lines
- No bullets, numbers, or other markers
- Maintain any biblical references or parenthetical citations

## Common Issues and Solutions

### Issue: Text Too Close to Bottom Edge
**Solution**: Adjust line-height:
- Change from `line-height: 1.5` to `line-height: 1.4`
- For 7 lines, use `line-height: 1.3`

### Issue: Long Title Text
**Solution**: The title will wrap automatically. If it's too long, you may need to abbreviate or use a smaller font for that specific slide.

### Issue: Multiple Text Boxes Created
**Solution**: Ensure all content lines are within a SINGLE `<p>` tag with double line breaks between them.

## Example Usage

**User Input:**
```
* Introduction to Photosynthesis
   * Plants convert sunlight to energy
   * Process occurs in chloroplasts
   * Produces oxygen as byproduct
* The Light Reactions
   * Take place in thylakoid membranes
   * Split water molecules
   * Generate ATP and NADPH
```

**Output:** 3 slides total
1. Title slide: "Introduction to Photosynthesis"
2. Content slide: "Introduction to Photosynthesis" with 3 content lines
3. Content slide: "The Light Reactions" with 3 content lines

## Notes

- Always work in `/home/claude` directory for creating files
- Always copy final output to `/mnt/user-data/outputs/`
- File naming: Use descriptive names like `lesson-presentation.pptx`
- The html2pptx library automatically handles font rendering
- This style matches the minimalist black-and-white aesthetic of professional educational presentations
