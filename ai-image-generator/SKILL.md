[SKILL.md](https://github.com/user-attachments/files/25284445/SKILL.md)
---
name: ai-image-generator
description: Generate custom AI images using various providers (OpenAI DALL-E, Google Gemini, Replicate, etc.) and integrate them into web designs and documents. Use this skill when you need custom images that match specific brand requirements, user personas, or design aesthetics.
license: MIT
---

# AI Image Generator Skill

This skill enables Claude to generate custom AI images using multiple providers and integrate them seamlessly into web designs, documents, and other creative projects.

## Supported Providers

The skill supports multiple image generation providers:

- **OpenAI DALL-E 3** (recommended for photorealistic images)
- **Google Gemini/Imagen** (good for artistic styles)
- **Replicate (Stable Diffusion)** (open source models)
- **Midjourney API** (when available)

## Environment Variables Required

Set up API keys for the providers you want to use:

```bash
export OPENAI_API_KEY="your_openai_key_here"
export GEMINI_API_KEY="your_gemini_key_here"
export REPLICATE_API_TOKEN="your_replicate_token_here"
```

## Core Functions

### 1. Generate Images for Web Design

When building websites, landing pages, or web applications:

```javascript
// Generate hero images, product shots, team photos, etc.
// Automatically match the brand aesthetic and target persona
await generateWebImages({
  type: 'hero_image',
  brand: 'modern tech startup',
  persona: 'busy marketing managers aged 30-45',
  style: 'professional, clean, trustworthy',
  dimensions: '1920x1080'
});
```

### 2. Generate Document Images

For PDFs, presentations, reports:

```javascript
// Create charts, infographics, illustrations
await generateDocumentImages({
  type: 'infographic',
  topic: 'quarterly sales results',
  style: 'corporate, data-driven',
  format: 'horizontal_chart'
});
```

### 3. Brand-Consistent Image Generation

Maintain visual consistency across all generated images:

```javascript
// Use brand guidelines to ensure consistency
await generateBrandImage({
  brand_colors: ['#2563eb', '#f59e0b'],
  brand_style: 'minimalist, modern',
  tone: 'professional but approachable',
  content: 'team collaboration'
});
```

## Image Integration Workflow

1. **Analyze Project Context**: Understand the target audience, brand, and purpose
2. **Generate Appropriate Prompts**: Create detailed prompts that match the aesthetic
3. **Generate Images**: Use the best provider for the specific use case
4. **Optimize & Integrate**: Resize, optimize, and seamlessly integrate into the design

## Prompt Engineering Best Practices

### For Web Design Images:
- Include specific demographics and emotions
- Specify lighting, composition, and style
- Match the target user persona
- Consider conversion goals

### For Professional Documents:
- Emphasize clarity and professionalism
- Use corporate-friendly styles
- Ensure accessibility and readability
- Match document branding

### For Creative Projects:
- Push artistic boundaries
- Experiment with unique styles
- Focus on memorable visual impact
- Consider artistic trends

## Quality Standards

All generated images must meet these criteria:

- **High Resolution**: Minimum 1024x1024 for web, higher for print
- **Professional Quality**: Suitable for business use
- **Brand Alignment**: Match the project's visual identity
- **Contextual Relevance**: Serve the specific purpose
- **Accessibility**: Consider color contrast and clarity

## Error Handling & Fallbacks

If primary provider fails:
1. Automatically try secondary provider
2. Generate alternative prompt if needed
3. Provide high-quality stock image alternatives
4. Notify user of any limitations

## Usage Examples

### Landing Page for SaaS Company
```
Generate a hero image for a project management SaaS targeting remote teams. 
Style: Clean, modern, trustworthy
Show: Diverse remote team collaborating successfully
Mood: Professional but friendly
Colors: Blues and greens that convey productivity
```

### Restaurant Website
```
Generate food photography for an Italian restaurant website.
Style: Warm, appetizing, authentic
Show: Fresh pasta dishes, rustic Italian setting
Mood: Cozy, family-friendly
Lighting: Natural, golden hour warmth
```

### Tech Startup About Page
```
Generate team photos for a AI startup's about page.
Style: Modern, innovative, approachable
Show: Diverse tech team in modern office
Mood: Confident, forward-thinking
Setting: Clean office space with tech elements
```

## Integration with Other Skills

This skill works seamlessly with:
- **Frontend Design Skill**: Auto-generate images for web designs
- **Document Skills**: Create custom graphics for PDFs, presentations
- **Brand Guidelines**: Maintain consistency across all materials

## Performance Optimization

- Cache frequently used styles and prompts
- Batch generate multiple images when possible
- Optimize file sizes for web delivery
- Provide multiple format options (PNG, JPG, WebP)

## Best Practices

1. **Always match the target audience**: Images should resonate with the specific user persona
2. **Maintain brand consistency**: Use consistent colors, styles, and tone
3. **Consider context**: Web images differ from print images
4. **Test and iterate**: Generate multiple options when possible
5. **Respect copyright**: Only generate original content

## Provider-Specific Notes

### OpenAI DALL-E 3
- Best for: Photorealistic images, people, products
- Limitations: Cannot generate real people or copyrighted content
- Recommended for: Business photography, product shots

### Google Gemini
- Best for: Artistic styles, illustrations, abstract concepts
- Strengths: Good at following complex prompts
- Recommended for: Creative designs, illustrations

### Replicate/Stable Diffusion
- Best for: Artistic flexibility, custom models
- Strengths: Open source, highly customizable
- Recommended for: Unique artistic styles, experimentation

Remember: The goal is to create images that look professionally crafted and perfectly suited to their context, not generic AI-generated content.
