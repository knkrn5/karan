import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class ProfileController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const response = await ProfileService.getProfile(userId);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res
        .status(500)
        .json({ success: false, message: error.message || 'An unknown error occurred.' });
    }
  }

  static async verifyPassword(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const { password } = req.body;
      const response = await ProfileService.verifyPassword(userId, password);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }

      res.status(500).json({
        success: false,
        message: error.message || 'An unknown error occurred.',
      });
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const response = await ProfileService.deleteAccount(userId);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res
        .status(500)
        .json({ success: false, message: error.message || 'An unknown error occurred.' });
    }
  }
}
