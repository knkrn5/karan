import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { ContactService } from '../services/contact.service.js';

export class ContactController {
  // Adding contact message to the database
  static addContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, message } = req.body;
      const contactMsg = await ContactService.addContactMessages(name, email, message);

      res.status(201).json(new ApiResponse(true, 'Message sent successfully', contactMsg));
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(400).json(error);
      } else if (error instanceof Error) {
        res.status(500).json(new ApiResponse(false, 'Failed to send message', error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(false, 'Failed to send message', 'An unknown error occurred.'));
      }
    }
  };

  static async updateContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const { id, message } = req.body;
      const updatedContact = await ContactService.updateContactMessages(id, message);
      res.status(200).json(new ApiResponse(true, 'Message updated successfully', updatedContact));
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(400).json(error);
      } else if (error instanceof Error) {
        res.status(500).json(new ApiResponse(false, 'Failed to update message', error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(false, 'Failed to update message', 'An unknown error occurred.'));
      }
    }
  }

  static async deleteContactMessages(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const deletedContact = await ContactService.deleteContactMessages(id);
      res.status(200).json(new ApiResponse(true, 'Message deleted successfully', deletedContact));
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(400).json(error);
      } else if (error instanceof Error) {
        res.status(500).json(new ApiResponse(false, 'Failed to delete message', error.message));
      } else {
        res
          .status(500)
          .json(new ApiResponse(false, 'Failed to delete message', 'An unknown error occurred.'));
      }
    }
  }
}
