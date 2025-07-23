import { Request, Response } from 'express';
import { EmailNotificationsService } from '../services/emailNotifications.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class EmailNotificationsController {
  static async emailUserAgentData(req: Request, res: Response) {
    try {
      const { email, subject, excerpt, userAgentData } = req.body;
      const response = await EmailNotificationsService.emailUserAgentData(
        email,
        subject,
        excerpt,
        userAgentData
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
}
