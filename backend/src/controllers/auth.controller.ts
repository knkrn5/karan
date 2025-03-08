import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.registerUser(
        firstName,
        lastName,
        email,
        password
      );

      res
        .status(201)
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .json(new ApiResponse(true, 'User registered successfully', user));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(false, error.message, null));
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.loginUser(email, password);

      res
        .status(200)
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .json(new ApiResponse(true, 'Login successful', user));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(false, error.message, null));
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const {
        data: { accessToken },
      } = await AuthService.refreshAccessToken(refreshToken);

      res
        .status(200)
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .json(new ApiResponse(true, 'Token refreshed successfully', { accessToken }));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(false, error.message, null));
    }
  }

  static async logoutUser(req: Request, res: Response) {
    res
      .status(200)
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .json(new ApiResponse(true, 'Logout successful', null));
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user._id;
      const user = await AuthService.getProfile(userId);

      res.status(200).json(new ApiResponse(true, 'User profile retrieved', user));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(false, error.message, null));
    }
  }
}
