import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class ContactController {
  // Adding contact message to the db
  static addContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, message } = req.body;
      const response = await ContactService.addContactMessages(name, email, message);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({
        success: false,
        message: 'Failed to send message',
        error: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  };

  static async updateContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const { id, message } = req.body;
      const response = await ContactService.updateContactMessages(id, message);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({
        success: false,
        message: 'Failed to update message',
        error: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  }

  static async deleteContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const response = await ContactService.deleteContactMessages(id);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({
        success: false,
        message: 'Failed to delete message',
        error: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  }
}
