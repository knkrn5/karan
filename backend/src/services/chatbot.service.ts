import { Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { ApiResponse } from '../utils/apiResponse.js';
import { ChatbotModel } from '../models/chatbot.model.js';


dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

export class ChatbotService {

  static async getChatbotResponse(userId: string, userName: string, userMsg: string, llmName: string, historyMsgs: Array<{ role: 'user' | 'system'; content: string }>, res: Response) {
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

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    let assistantFullResponse = '';
    for await (const chunk of completion) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      if (text) {
        assistantFullResponse += text;
        res.write(`data: ${JSON.stringify(text)}\n\n`);
      }
    }

    res.write(`data: [DONE]\n\n`);
    res.end();


    //stroing chat history in database
    await ChatbotModel.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          message: {
            $each: [
              { role: "user", content: userMsg },
              { role: "system", content: assistantFullResponse }
            ]
          }
        }
      },
      { upsert: true, new: true }
    );

  }

  static async getChatbotMsgsFromDb(userId: string) {
    if (!userId) throw new ApiResponse(400, false, 'User ID is required', null);

    const chatbotMsgs = await ChatbotModel.findOne({ user: userId }).select('message');
    return new ApiResponse(200, true, 'Chat history retrieved successfully', chatbotMsgs);
  }


}


