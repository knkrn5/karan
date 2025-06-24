import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbot.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { accessTokenRetriever } from '../utils/accessTokenRetriver.js';


export class ChatbotController {
  static async getChatbotResponse(req: Request, res: Response) {
    try {
      let userId = '';
      const decoded = accessTokenRetriever(req);
      if (typeof decoded !== 'string' && decoded?.userId) {
        userId = decoded.userId;
      } else {
        userId = '681ac87324dc59112b9e2a61';
      }

      const { userName, userMsg, llmName, historyMsgs } = req.body;

      await ChatbotService.getChatbotResponse(userId, userName, userMsg, llmName, historyMsgs, res);
      // res.send(response); //this is not required, as the response is already sent from the service via res.write
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({ error: error });;
    }
  }


  static async getChatbotMsgsFromDb(req: Request, res: Response) {
    try {
      const userId = req.payload.userId;
      const response = await ChatbotService.getChatbotMsgsFromDb(userId);
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


