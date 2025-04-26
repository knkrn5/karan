import OpenAI from 'openai';
import dotenv from 'dotenv';
import { ApiResponse } from '../utils/apiResponse.js';
dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

export class ChatbotService {
  static async getChatbotResponse(userMsg: string, llmName: string): Promise<string> {
    if (!userMsg) throw new ApiResponse(400, false, 'User message not found', null);
    if (!llmName) throw new ApiResponse(400, false, 'AI model not found', null);

    const completion = await openai.chat.completions.create({
      model: llmName,
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

