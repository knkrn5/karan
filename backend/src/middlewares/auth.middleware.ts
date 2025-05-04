import jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models/user.model.js';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { ApiResponse } from '../utils/apiResponse.js';
import bcrypt from 'bcrypt';
import { redisClient } from '../db/clients/uptashRedisDB.js';


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


//password verification middleware
export const verifyPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Input validation
    if (!email) {
      res.status(400).json(new ApiResponse(400, false, 'Email is required.', null));
      return;
    }
    if (!password) {
      res.status(400).json(new ApiResponse(400, false, 'Password is required', null));
      return;
    }

    //matching password
    const user: IUser | null = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json(new ApiResponse(404, false, 'User not found', null));
      return
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(401).json(new ApiResponse(401, false, 'Incorrect password', null));
      return
    }

    next();
  } catch (error) {
    res.status(500).json(new ApiResponse(500, false, 'Internal server error', error));
  }
};


//OTP verification middleware
export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, enteredOTP } = req.body;
    // Input validation
    if (!email) {
      res.status(400).json(new ApiResponse(400, false, 'Email is required.', null));
      return;
    }
    if (!enteredOTP) {
      res.status(400).json(new ApiResponse(400, false, 'OTP is required', null));
      return;
    }

    // matching OTP
    const storedOTP = await redisClient.get(email);
    if (!storedOTP) {
      res.status(400).json(new ApiResponse(400, false, 'OTP not found. Please resend.', null));
      return;
    }
    const isOtpMatch = await bcrypt.compare(String(enteredOTP), storedOTP);
    if (!isOtpMatch) {
      res.status(401).json(new ApiResponse(401, false, 'Incorrect OTP. Please Enter Valid OTP.', null));
      return;
    }

    //deleting stored OTP after verification
    await redisClient.del(email);

    next();
  } catch (error) {
    res.status(500).json(new ApiResponse(500, false, 'Server error during OTP verification', error));
    return;
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
