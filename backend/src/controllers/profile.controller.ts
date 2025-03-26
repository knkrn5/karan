import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { ProfileService } from '../services/profile.service.js';

export class ProfileController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const response = await ProfileService.getProfile(userId);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json(new ApiResponse(500, false, error.message, null));
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const response = await ProfileService.deleteAccount(userId);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json(new ApiResponse(500, false, error.message, null));
    }
  }
}
