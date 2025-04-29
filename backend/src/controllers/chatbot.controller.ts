import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbot.service.js';

export class ChatbotController {
  static async getChatbotResponse(req: Request, res: Response) {
    try {
      const { userName, userMsg, llmName, historyMsgs } = req.body;

      await ChatbotService.getChatbotResponse(userName, userMsg, llmName, historyMsgs, res);
      // res.send(response); //this is not required, as the response is already sent from the service via res.write
    } catch (error) {
      res.status(500).send({ error: error });
    }

  }
}


