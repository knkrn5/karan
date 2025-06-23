import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AuthController {
  // //verify existing user
  // static async verifyUser(req: Request, res: Response) {
  //   try {
  //     const { email } = req.body;
  //     const response = await AuthService.verifyUser(email);
  //     res.status(response.statusCode).json(response);
  //   } catch (error: any) {
  //     if (error instanceof ApiResponse) {
  //       res.status(error.statusCode).json(error);
  //       return;
  //     }
  //     res.status(500).json({ success: false, message: error.message, data: null });
  //   }
  // }

  // //sending opt
  // static async sendEmailVerificationOTP(req: Request, res: Response) {
  //   try {
  //     const { email, subject, excerpt } = req.body;
  //     const response = await AuthService.sendEmailVerificationOTP(email, subject, excerpt);

  //     res.status(response.statusCode).json(response);
  //   } catch (error: any) {
  //     if (error instanceof ApiResponse) {
  //       res.status(error.statusCode).json(error);
  //       return;
  //     }
  //     res.status(500).json({ success: false, message: error.message, data: null });
  //   }
  // }

  // //verifing opt
  // static async verifyOTP(req: Request, res: Response) {
  //   try {
  //     const { email, enteredOtp } = req.body;
  //     const response = await AuthService.verifyOTP(email, enteredOtp);
  //     res.status(response.statusCode).json(response);
  //   } catch (error: any) {
  //     if (error instanceof ApiResponse) {
  //       res.status(error.statusCode).json(error);
  //       return;
  //     }
  //     res.status(500).json({ success: false, message: error.message, data: null });
  //   }
  // }

  // //registering user
  // static async registerUser(req: Request, res: Response) {
  //   try {
  //     const { firstName, lastName, email, password } = req.body;
  //     const response = await AuthService.registerUser(firstName, lastName, email, password);

  //     res
  //       .status(response.statusCode)
  //       .json(response);
  //   } catch (error: any) {
  //     if (error instanceof ApiResponse) {
  //       res.status(error.statusCode).json(error);
  //       return;
  //     }
  //     res.status(500).json({ success: false, message: error.message, data: null });
  //   }
  // }

  // //loginning in user
  // static async loginUser(req: Request, res: Response) {
  //   try {
  //     const { email, password } = req.body;
  //     const response = await AuthService.loginUser(email, password);

  //     res
  //       .status(response.statusCode)
  //       .cookie('accessToken', response.data.accessToken, {
  //         domain: process.env.ENV === 'PRODUCTION' ? '.karan.email' : undefined,
  //         httpOnly: true,
  //         secure: true,
  //         sameSite: 'none',
  //       })
  //       .cookie('refreshToken', response.data.refreshToken, {
  //         domain: process.env.ENV === 'PRODUCTION' ? '.karan.email' : undefined,
  //         httpOnly: true,
  //         secure: true,
  //         sameSite: 'none',
  //       })
  //       .json(response);
  //   } catch (error: any) {
  //     if (error instanceof ApiResponse) {
  //       res.status(error.statusCode).json(error);
  //       return;
  //     }
  //     res.status(500).json({ success: false, message: error.message, data: null });
  //   }
  // }

  //refreshing access token
  static async refreshAccessToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;

      const response = await AuthService.refreshAccessToken(refreshToken);

      const { accessToken } = response.data;


      res.cookie('accessToken', accessToken, {
        domain: process.env.ENV === 'PRODUCTION' ? '.karan.email' : undefined,
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

  // static async logoutUser(req: Request, res: Response) {
  //   res
  //     .clearCookie('accessToken', {
  //       domain: process.env.ENV === 'PRODUCTION' ? '.karan.email' : undefined,
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: 'none',
  //       path: '/',
  //     })
  //     .clearCookie('refreshToken', {
  //       domain: process.env.ENV === 'PRODUCTION' ? '.karan.email' : undefined,
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: 'none',
  //       path: '/',
  //     })
  //     .status(200)
  //     .json({ success: true, message: 'User LogedOut successful', data: null });
  // }

  //validating user authentication
  static async authenticateUser(req: Request, res: Response) {
    try {
      const userData = req.user;
      console.log(userData)
      const response = await AuthService.authenticateUser(userData);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  //verifing password
  // static async verifyPassword(req: Request, res: Response) {
  //   try {
  //     const userId = req.user.userId;
  //     const { password } = req.body;
  //     const response = await AuthService.verifyPassword(userId, password);
  //     res.status(response.statusCode).json(response);
  //   } catch (error: any) {
  //     if (error instanceof ApiResponse) {
  //       res.status(error.statusCode).json(error);
  //       return;
  //     }

  //     res.status(500).json({
  //       success: false,
  //       message: error.message ?? 'An unknown error occurred.',
  //     });
  //   }
  // }

  //change password
  // static async resetPassword(req: Request, res: Response) {
  //   try {
  //     const { email, newPassword } = req.body;
  //     const response = await AuthService.resetPassword(email, newPassword);
  //     res.status(response.statusCode).json(response);
  //   } catch (error: any) {
  //     if (error instanceof ApiResponse) {
  //       res.status(error.statusCode).json(error);
  //       return;
  //     }
  //     res.status(500).json({
  //       success: false,
  //       message: error.message ?? 'An unknown error occurred.',
  //     });
  //   }
  // }
}
