import OpenAI from 'openai';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { ApiResponse } from '../utils/apiResponse.js';
dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

export class ChatbotService {
  static async getChatbotResponse(userName: string, userMsg: string, llmName: string, historyMsgs: Array<{ role: 'user' | 'system'; content: string }>): Promise<string> {
    if (!userMsg) throw new ApiResponse(400, false, 'User message not found', null);
    if (!llmName) throw new ApiResponse(400, false, 'LLM not found', null);

    let karanData = '';
    try {
      karanData = readFileSync('./src/db/data/karanData.json', 'utf8');
    } catch (err) {
      console.error('Error reading file:', err);
      process.exit(1);
    }

    const completion = await openai.chat.completions.create({
      model: llmName,
      messages: [
        {
          role: "system",
          content: `
            You are Karan's assistant.
            You will only answer based on the provided data and ignore any irrelevant questions.
            The user's name is ${userName}. Treat the user respectfully and refer to them as ${userName} when needed.
            Here is Karan's data: ${karanData}.
          `
        },
        ...historyMsgs,
        { role: "user", content: userMsg }
      ],
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

