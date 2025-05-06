import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbot.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class ChatbotController {
  static async getChatbotResponse(req: Request, res: Response) {
    try {
      const { userName, userMsg, llmName, historyMsgs } = req.body;

      await ChatbotService.getChatbotResponse('6804e17625d5c4e27ad2e248', userName, userMsg, llmName, historyMsgs, res);
      // res.send(response); //this is not required, as the response is already sent from the service via res.write
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }


  static async getChatbotMsgsFromDb(req: Request, res: Response) {
    try {
      // const userId = req.user.userId;
      const response = await ChatbotService.getChatbotMsgsFromDb('6804e17625d5c4e27ad2e248');
      res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).send({ error: error });
    }
  }
}


