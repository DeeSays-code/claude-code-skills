# AI Image Generator Skill for Claude Code

This custom skill enables Claude Code to generate AI images using multiple providers (OpenAI DALL-E, Google Gemini, Replicate) and integrate them seamlessly into web designs and documents.

## Quick Setup

### 1. Install the Skill

**Option A: Local Installation (Recommended)**
```bash
# Create the skill directory
mkdir ~/.claude/skills/ai-image-generator
cd ~/.claude/skills/ai-image-generator

# Copy the skill files (you'll need to copy the files we just created)
cp /path/to/SKILL.md ./
cp /path/to/generator.js ./
cp /path/to/package.json ./

# Install dependencies
npm install
```

**Option B: Manual Setup**
1. Create `~/.claude/skills/ai-image-generator/` directory
2. Copy all the skill files we created
3. Run `npm install` in that directory

### 2. Set Up API Keys

Choose one or more providers and get API keys:

**OpenAI (Recommended)**
```bash
export OPENAI_API_KEY="sk-your-openai-key-here"
```
Get your key at: https://platform.openai.com/api-keys

**Google Gemini**
```bash
export GEMINI_API_KEY="your-gemini-key-here"
```
Get your key at: https://ai.google.dev/

**Replicate (Stable Diffusion)**
```bash
export REPLICATE_API_TOKEN="your-replicate-token-here"
```
Get your token at: https://replicate.com/account/api-tokens

### 3. Restart Claude Code

```bash
# Exit Claude Code and restart it
npx @anthropic-ai/claude-code
```

## Usage in Claude Code

### Basic Usage

```
Use the ai-image-generator skill to create a hero image for a tech startup website targeting busy marketing managers. Style should be professional, clean, and trustworthy.
```

### Advanced Usage

```
Use the ai-image-generator and frontend-design skills together to create a complete landing page for a vehicle restoration company. Generate at least 5 custom images including:
- Hero image of classic car restoration
- Portfolio images of restored vehicles  
- Team photo of skilled mechanics
- Before/after restoration examples
- Workshop/facility images

Make sure all images match a vintage automotive aesthetic and appeal to classic car enthusiasts.
```

## Features

✅ **Multiple Providers**: OpenAI DALL-E 3, Google Gemini, Replicate
✅ **Automatic Fallback**: If one provider fails, automatically tries others
✅ **Web-Optimized**: Generates images perfect for websites and documents
✅ **Brand Consistency**: Maintains visual consistency across all images
✅ **Smart Prompting**: Automatically creates detailed prompts based on context
✅ **Professional Quality**: All images suitable for business use

## Image Types Supported

- **Hero Images**: Website headers and banners
- **Product Photography**: Clean product shots
- **Team Photos**: Professional corporate headshots
- **Lifestyle Images**: Contextual brand photography
- **Illustrations**: Custom graphics and diagrams
- **Background Images**: Textures and patterns

## Cost Estimates

- **OpenAI DALL-E 3**: ~$0.04 per standard image, ~$0.08 per HD image
- **Google Gemini**: ~$0.025 per image
- **Replicate**: ~$0.01-0.05 per image (varies by model)

## Troubleshooting

### "No image generation provider configured"
Make sure you've set at least one API key:
```bash
echo $OPENAI_API_KEY    # Should show your key
echo $GEMINI_API_KEY    # Or this one
echo $REPLICATE_API_TOKEN  # Or this one
```

### "Command not found" errors
Restart Claude Code after setting environment variables:
```bash
npx @anthropic-ai/claude-code
```

### Images not integrating properly
Make sure you're using both skills together:
```
Use the frontend-design skill AND the ai-image-generator skill to create...
```

## Example Prompts

### SaaS Landing Page
```
Create a landing page for a project management SaaS using frontend-design and ai-image-generator skills. Generate images showing diverse remote teams collaborating successfully. Style: modern, trustworthy, professional.
```

### Restaurant Website
```
Build a restaurant website using both frontend-design and ai-image-generator skills. Generate appetizing food photography and cozy dining atmosphere images. Style: warm, authentic Italian.
```

### E-commerce Product Page
```
Design a product page using frontend-design and ai-image-generator skills. Generate clean product photography and lifestyle images showing the product in use. Style: minimal, premium.
```

## Advanced Configuration

### Custom Provider Priority
You can modify the `generator.js` file to change which provider is tried first:

```javascript
// Edit this line in generator.js
this.defaultProvider = 'openai';  // or 'gemini' or 'replicate'
```

### Image Quality Settings
Adjust default image quality in the skill file for your needs.

## Contributing

This is a custom skill. To improve it:
1. Edit the files in `~/.claude/skills/ai-image-generator/`
2. Test your changes
3. Share improvements with the community

## License

MIT License - Use and modify as needed!
