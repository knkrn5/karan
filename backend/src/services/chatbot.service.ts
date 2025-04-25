import OpenAI from 'openai';
import dotenv from 'dotenv';
import { ApiResponse } from '../utils/apiResponse';
dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: '',
});

export class ChatbotService {
  static async getChatbotResponse(userMsg: string) {
    const completion = await openai.chat.completions.create({
      model: 'meta/llama-3.1-70b-instruct',
      messages: [{ role: 'user', content: userMsg }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    for await (const chunk of completion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
  }
}
