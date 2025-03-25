import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { ContactService } from '../services/contact.service.js';

export class ContactController {
  // Adding contact message to the db
  static addContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, message } = req.body;
      const response = await ContactService.addContactMessages(name, email, message);

      res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(400).json(error);
      } else if (error instanceof Error) {
        res.status(500).json(new ApiResponse(500, false, 'Failed to send message', error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(500, false, 'Failed to send message', 'An unknown error occurred.'));
      }
    }
  };

  static async updateContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const { id, message } = req.body;
      const response = await ContactService.updateContactMessages(id, message);
      res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(400).json(error);
      } else if (error instanceof Error) {
        res.status(500).json(new ApiResponse(500, false, 'Failed to update message', error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(500, false, 'Failed to update message', 'An unknown error occurred.'));
      }
    }
  }

  static async deleteContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const response = await ContactService.deleteContactMessages(id);

      res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(400).json(error);
      } else if (error instanceof Error) {
        res.status(500).json(new ApiResponse(500, false, 'Failed to delete message', error.message));
      } else {
        res.status(500).json(new ApiResponse(500, false, 'Failed to delete message', 'An unknown error occurred.'));
      }
    }
  }
}
