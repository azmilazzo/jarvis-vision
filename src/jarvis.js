import OpenAI from 'openai';
import { config } from './config.js';
import { log } from './utils/logger.js';
import { handleError } from './utils/errorHandler.js';

const openai = new OpenAI({
  baseURL: config.openRouter.baseURL,
  apiKey: config.openRouter.apiKey,
  defaultHeaders: {
    "HTTP-Referer": config.openRouter.headers.referer,
    "X-Title": config.openRouter.headers.title
  }
});

export class Jarvis {
  constructor() {
    this.lastAnalysis = null;
  }

  async analyzeImage(imageUrl) {
    try {
      const completion = await openai.chat.completions.create({
        model: config.openRouter.model,
        messages: [{
          role: "user",
          content: [
            { type: "text", text: "Analyze this image in detail" },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }],
        max_tokens: 1000,
        temperature: 0.5
      });

      this.lastAnalysis = completion.choices[0].message;
      return this.formatResponse(completion);
      
    } catch (error) {
      handleError(error, 'vision-analysis');
      throw new Error('Failed to analyze image');
    }
  }

  formatResponse(response) {
    return {
      raw: response,
      summary: this.extractSummary(response.content),
      keywords: this.extractKeywords(response.content)
    };
  }

  // Additional helper methods...
}