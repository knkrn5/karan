import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const response = await AuthService.registerUser(firstName, lastName, email, password);

      res
        .status(response.statusCode)
        .cookie('accessToken', response.data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .cookie('refreshToken', response.data.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const response = await AuthService.loginUser(email, password);

      res
        .status(response.statusCode)
        .cookie('accessToken', response.data.accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .cookie('refreshToken', response.data.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .json(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ success: false, message: error.message, data: null });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const response = await AuthService.refreshAccessToken(refreshToken);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  static async logoutUser(req: Request, res: Response) {
    res
      .status(200)
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .json({ success: true, message: 'Logout successful', data: null });
  }

  static async authenticateUser(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken } = req.cookies || {};
      const response = await AuthService.authenticateUser(accessToken, refreshToken);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }
}
