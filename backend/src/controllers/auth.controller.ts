import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

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
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
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
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message, data: null });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const response = await AuthService.refreshAccessToken(refreshToken);

      const { accessToken } = response.data;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 15 * 60 * 1000,
      });

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
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
      const userData = req.user;
      const userid = req.user.userId;
      const response = await AuthService.authenticateUser(userData);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }
}
