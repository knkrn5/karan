// middlewares/user.middleware.ts
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  interface Request {
    user?: any; // Consider defining a proper interface for the user
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from cookie
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: 'Access token is required',
        status: 'Access token is required',
        data: null,
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { userId: string };

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid access token',
        status: 'Invalid access token',
        data: null,
      });
      return;
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Token expired',
        status: 'Token expired',
        data: null,
      });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Invalid token',
        status: 'Invalid token',
        data: null,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      status: 'Internal server error',
      data: null,
    });
  }
};
