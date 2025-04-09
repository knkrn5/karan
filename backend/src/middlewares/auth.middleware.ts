import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { ApiResponse } from '../utils/apiResponse.js';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

//isAccessTokenValid middleware
export const isAccessTokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      res.status(400).json({
        success: false,
        message: 'Access token is required',
      });
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

    // console.log('decoded', decoded);

    req.user = decoded;

    next();
  } catch (error: any) {
    let message = 'Internal server error';
    let statusCode = 500;

    if (error.name === 'TokenExpiredError') {
      message = 'Access Token expired';
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

//***************auth limiters***********************/
//registration limiter
export const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: new ApiResponse(429, false, 'Too many requests sent. Please try after 15 min', null),
});

//sendOpt limiter
export const sendOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: new ApiResponse(429, false, 'Too many OTP requests sent, Please try after 15 min', null),
});
