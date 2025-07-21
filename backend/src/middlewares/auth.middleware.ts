import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { ApiResponse } from '../utils/apiResponse.js';



export interface JWTPayload extends JwtPayload {
  email: string;
  role: 'USER' | 'ADMIN';
  id: string;
}


declare global {
  namespace Express {
    interface Request {
      payload: JWTPayload;
    }
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

    const decodedPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, { algorithms: ['HS256'] }) as JWTPayload;

    req.payload = decodedPayload;

    next();
  } catch (error: any) {
    let message = 'Internal server error';
    let statusCode = 500;

    if (error instanceof jwt.TokenExpiredError) {
      message = 'Access Token expired';
      statusCode = 401;
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = 'Invalid Access token';
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
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: new ApiResponse(429, false, 'Too many requests sent. Please try after 15 minutes', null),
});

//sendOpt limiter
export const sendOtpLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: new ApiResponse(
    429,
    false,
    'Too many OTP requests sent, Please try after 2 minutes',
    null
  ),
});
