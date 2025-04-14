import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AuthController {
  //verify existing user
  static async verifyUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await AuthService.verifyUser(email);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  //sending opt
  static async sendOTPVerificationEmail(req: Request, res: Response) {
    try {
      const { email, subject } = req.body;
      const response = await AuthService.sendOTPVerificationEmail(email, subject);

      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  //verifing opt
  static async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const response = await AuthService.verifyOTP(email, otp);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        res.status(error.statusCode).json(error);
        return;
      }
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  //registering user
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
          maxAge: 10 * 60 * 1000,
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

  //loginning in user
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
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  //refreshing access token
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
      .clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      })
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      })
      .status(200)
      .json({ success: true, message: 'Logout successful', data: null });
  }

  //validating user authentication
  static async authenticateUser(req: Request, res: Response) {
    try {
      const userData = req.user;
      const response = await AuthService.authenticateUser(userData);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  //verifing password
  static async verifyPassword(req: Request, res: Response) {
    try {
      const userId = req.user.userId;
      const { password } = req.body;
      const response = await AuthService.verifyPassword(userId, password);
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
}
