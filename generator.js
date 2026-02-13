#!/usr/bin/env node

/**
 * AI Image Generator Skill Implementation
 * Supports multiple image generation providers
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

class AIImageGenerator {
  constructor() {
    this.providers = {
      openai: process.env.OPENAI_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
      replicate: process.env.REPLICATE_API_TOKEN
    };
    
    this.defaultProvider = this.getAvailableProvider();
  }

  getAvailableProvider() {
    if (this.providers.openai) return 'openai';
    if (this.providers.gemini) return 'gemini';
    if (this.providers.replicate) return 'replicate';
    throw new Error('No image generation provider configured. Please set API keys.');
  }

  async generateImage(prompt, options = {}) {
    const {
      provider = this.defaultProvider,
      size = '1024x1024',
      style = 'natural',
      quality = 'hd'
    } = options;

    try {
      switch (provider) {
        case 'openai':
          return await this.generateWithOpenAI(prompt, { size, style, quality });
        case 'gemini':
          return await this.generateWithGemini(prompt, options);
        case 'replicate':
          return await this.generateWithReplicate(prompt, options);
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      console.error(`Failed with ${provider}, trying fallback...`);
      return await this.generateWithFallback(prompt, options, provider);
    }
  }

  async generateWithOpenAI(prompt, options) {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: options.size,
      style: options.style,
      quality: options.quality
    }, {
      headers: {
        'Authorization': `Bearer ${this.providers.openai}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      url: response.data.data[0].url,
      revised_prompt: response.data.data[0].revised_prompt,
      provider: 'openai'
    };
  }

  async generateWithGemini(prompt, options) {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:generateImages?key=${this.providers.gemini}`, {
      prompt: prompt,
      number_of_images: 1,
      aspect_ratio: this.convertSizeToAspectRatio(options.size || '1024x1024'),
      safety_filter_level: 'block_some',
      person_generation: 'allow_adult'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      url: response.data.generated_images[0].gcs_uri,
      provider: 'gemini'
    };
  }

  async generateWithReplicate(prompt, options) {
    const response = await axios.post('https://api.replicate.com/v1/predictions', {
      version: 'stability-ai/stable-diffusion-3.5-large',
      input: {
        prompt: prompt,
        width: parseInt(options.size.split('x')[0]) || 1024,
        height: parseInt(options.size.split('x')[1]) || 1024,
        num_inference_steps: 50,
        guidance_scale: 7.5
      }
    }, {
      headers: {
        'Authorization': `Token ${this.providers.replicate}`,
        'Content-Type': 'application/json'
      }
    });

    // Poll for completion
    let prediction = response.data;
    while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const pollResponse = await axios.get(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          'Authorization': `Token ${this.providers.replicate}`
        }
      });
      prediction = pollResponse.data;
    }

    if (prediction.status === 'failed') {
      throw new Error('Image generation failed');
    }

    return {
      url: prediction.output[0],
      provider: 'replicate'
    };
  }

  async generateWithFallback(prompt, options, failedProvider) {
    const availableProviders = Object.keys(this.providers)
      .filter(p => this.providers[p] && p !== failedProvider);
    
    if (availableProviders.length === 0) {
      throw new Error('All image generation providers failed');
    }

    return await this.generateImage(prompt, { ...options, provider: availableProviders[0] });
  }

  convertSizeToAspectRatio(size) {
    const [width, height] = size.split('x').map(Number);
    if (width === height) return '1:1';
    if (width > height) return '16:9';
    return '9:16';
  }

  async downloadAndSaveImage(imageUrl, filename) {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const filepath = path.join(process.cwd(), filename);
    const writer = fs.createWriteStream(filepath);
    
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filepath));
      writer.on('error', reject);
    });
  }

  // Specialized generation methods
  async generateWebHeroImage(brand, persona, style = 'professional') {
    const prompt = `Create a hero image for a ${brand} website targeting ${persona}. 
    Style: ${style}, high-quality, modern, clean composition.
    Focus on conveying trust and professionalism.
    Lighting: bright, welcoming, professional photography style.
    No text or logos in the image.`;
    
    return await this.generateImage(prompt, {
      size: '1920x1080',
      style: 'natural',
      quality: 'hd'
    });
  }

  async generateProductImage(product, context, style = 'clean') {
    const prompt = `Professional product photography of ${product} in ${context}.
    Style: ${style}, minimal background, excellent lighting.
    High-end commercial photography quality.
    Focus on showcasing the product clearly and attractively.`;
    
    return await this.generateImage(prompt, {
      size: '1024x1024',
      style: 'natural',
      quality: 'hd'
    });
  }

  async generateTeamPhoto(industry, diversity = true, setting = 'modern office') {
    const diversityText = diversity ? 'diverse team of professionals' : 'team of professionals';
    const prompt = `Professional corporate photography of a ${diversityText} in ${industry}.
    Setting: ${setting}, natural lighting, authentic interactions.
    Style: professional but approachable, high-quality business photography.
    People should look confident and collaborative.`;
    
    return await this.generateImage(prompt, {
      size: '1200x800',
      style: 'natural',
      quality: 'hd'
    });
  }

  async generateIllustration(concept, style = 'modern', mood = 'professional') {
    const prompt = `${style} illustration representing ${concept}.
    Mood: ${mood}, clean design, suitable for business use.
    Vector-style artwork, professional quality.
    Color palette should be modern and sophisticated.`;
    
    return await this.generateImage(prompt, {
      size: '1024x1024',
      style: 'vivid'
    });
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  const generator = new AIImageGenerator();

  switch (command) {
    case 'hero':
      if (args.length < 3) {
        console.error('Usage: node generator.js hero <brand> <persona> [style]');
        process.exit(1);
      }
      generator.generateWebHeroImage(args[1], args[2], args[3])
        .then(result => console.log(JSON.stringify(result, null, 2)))
        .catch(console.error);
      break;
      
    case 'product':
      if (args.length < 3) {
        console.error('Usage: node generator.js product <product> <context> [style]');
        process.exit(1);
      }
      generator.generateProductImage(args[1], args[2], args[3])
        .then(result => console.log(JSON.stringify(result, null, 2)))
        .catch(console.error);
      break;
      
    case 'team':
      if (args.length < 2) {
        console.error('Usage: node generator.js team <industry> [setting]');
        process.exit(1);
      }
      generator.generateTeamPhoto(args[1], true, args[2])
        .then(result => console.log(JSON.stringify(result, null, 2)))
        .catch(console.error);
      break;
      
    case 'custom':
      if (args.length < 2) {
        console.error('Usage: node generator.js custom <prompt> [size] [style]');
        process.exit(1);
      }
      generator.generateImage(args[1], { size: args[2], style: args[3] })
        .then(result => console.log(JSON.stringify(result, null, 2)))
        .catch(console.error);
      break;
      
    default:
      console.log(`
AI Image Generator Commands:
  hero <brand> <persona> [style]     - Generate hero image for website
  product <product> <context> [style] - Generate product photography
  team <industry> [setting]          - Generate team photos
  custom <prompt> [size] [style]     - Generate custom image
      `);
  }
}

module.exports = AIImageGenerator;
