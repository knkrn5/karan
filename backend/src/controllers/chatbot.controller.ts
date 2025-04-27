import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbot.service.js';

export class ChatbotController {
  static async getChatbotResponse(req: Request, res: Response) {
    try {
      const { userMsg, llmName } = req.body;

      const response = await ChatbotService.getChatbotResponse(userMsg, llmName);
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: error });
    }

  }
}


