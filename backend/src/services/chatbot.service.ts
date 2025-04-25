import OpenAI from 'openai';
import dotenv from 'dotenv';
import { ApiResponse } from '../utils/apiResponse.js';
dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

export class ChatbotService {
  static async getChatbotResponse(userMsg: string): Promise<string> {
    if (!userMsg) throw new ApiResponse(400, false, 'User message not found', null);

    const completion = await openai.chat.completions.create({
      model: 'meta/llama-3.1-70b-instruct',
      messages: [{ role: 'user', content: userMsg }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    let fullResponse = '';

    for await (const chunk of completion) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      fullResponse += text;
    }

    return fullResponse;
  }
}

