import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbot.service.js';

export class ChatbotController {
  static async getChatbotResponse(req: Request, res: Response) {
    try {
      const { userName, userMsg, llmName, historyMsgs } = req.body;

      const response = await ChatbotService.getChatbotResponse(userName, userMsg, llmName, historyMsgs, res);
      res.send(response);
    } catch (error) {
      res.status(500).send({ error: error });
    }

  }
}


