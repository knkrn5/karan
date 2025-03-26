import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service.js';

export class ProfileController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const response = await ProfileService.getProfile(userId);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message || 'An unknown error occurred.' });
    }
  }

  static async verifyPassword(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const { password } = req.body;
      const response = await ProfileService.verifyPassword(userId, password);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message || 'An unknown error occurred.' });
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const response = await ProfileService.deleteAccount(userId);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res
        .status(500)
        .json({ success: false, message: error.message || 'An unknown error occurred.' });
    }
  }
}
