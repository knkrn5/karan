import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model.js';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

//verifyToken middleware
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: 'Access token is required',
        data: null,
      });
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    let message = 'Internal server error';

    if (error.name === 'TokenExpiredError') message = 'Token expired';
    if (error.name === 'JsonWebTokenError') message = 'Invalid token';

    res.status(401).json({ success: false, message });
  }
};

//isAccessTokenValid middleware
export const isAccessTokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = decoded; 

    next();
  } catch (error: any) {
    let message = 'Internal server error';
    let statusCode = 500;

    if (error.name === 'TokenExpiredError') {
      message = 'Token expired';
      statusCode = 401;
    }

    if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token';
      statusCode = 401;
    }

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
