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
        .json(new ApiResponse(201, true, 'User registered successfully, Please Login', user));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(500, false, error.message, null));
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
        .json(new ApiResponse(200, true, 'Login successful', user));
    } catch (error: any) {
      if (error instanceof ApiResponse) {
        if (error.statusCode === 404) {
          res.status(404).json(new ApiResponse(404, false, error.message, null));
        } else if (error.statusCode === 401) {
          res.status(401).json(new ApiResponse(401, false, error.message, null));
        } else {
          res.status(500).json(new ApiResponse(500, false, error.message, null));
        }
      } else {
        res.status(500).json(new ApiResponse(500, false, error.message, null));
      }
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
        .json(new ApiResponse(200, true, 'Token refreshed successfully', { accessToken }));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(500, false, error.message, null));
    }
  }

  static async logoutUser(req: Request, res: Response) {
    res
      .status(200)
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .json(new ApiResponse(200, true, 'Logout successful', null));
  }

  static async authenticateUser(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken } = req.cookies;
      const { data } = await AuthService.authenticateUser(accessToken, refreshToken);

      res.status(200).json(new ApiResponse(200, true, 'User is Logged In', data));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(500, false, error.message, null));
    }
  }
}
