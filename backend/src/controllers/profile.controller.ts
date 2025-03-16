import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { ProfileService } from '../services/profile.service.js';

export class ProfileController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const user = await ProfileService.getProfile(userId);

      res.status(200).json(new ApiResponse(true, 'User profile retrieved', user));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(false, error.message, null));
    }
  }

  static async deleteAccount(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      await ProfileService.deleteAccount(userId);
      res.status(200).json(new ApiResponse(true, 'Account deleted successfully', null));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(false, error.message, null));
    }
  }
}
