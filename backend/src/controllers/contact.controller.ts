import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class ContactController {
  // Adding contact message to the db
  static async addContactMessage(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.userId;
      const { message } = req.body;
      const response = await ContactService.addContactMessages(userId, message);

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

  static async sendContactMsgCopyEmail(req: Request, res: Response): Promise<void> {
    const { email, subject, excerpt, message } = req.body;
    try {
      const response = await ContactService.sendContactMsgCopyEmail(
        email,
        subject,
        excerpt,
        message
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  static async getContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const response = await ContactService.getContactMessages('68122cea2aa1b0852309c095');
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({
        success: false,
        message: 'Failed to fetch messages',
        error: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  }

}
