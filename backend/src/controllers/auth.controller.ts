import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {

  //validating user authentication
  static async authenticateUser(req: Request, res: Response) {
    try {
      const userDataPayload = req.payload;
      const response = await AuthService.authenticateUser(userDataPayload);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }
}
