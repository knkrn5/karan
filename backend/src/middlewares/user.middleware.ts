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
    let statusCode = 500;
    let message = 'Internal server error';

    if (error.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expired';
    } else if (error.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    }

    res.status(statusCode).json({
      success: false,
      message,
      status: message,
      data: null,
    });
  }
};