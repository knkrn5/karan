import { User, IUser } from '../models/user.model.js';
import { UserDTO } from '../dtos/user.dto.js';
import { ApiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { generateOTPEmailTemplate } from '../mail/templates/otpEmailTemplate.js';
import { redisClient } from '../db/clients/uptashRedisDB.js';
import { sendEmail } from '../utils/email.js';

export class AuthService {
  //verify existing user
  static async verifyUser(email: string) {
    if (!email) throw new ApiResponse(400, false, 'email is required', null);
    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new ApiResponse(404, false, 'User not found', null);
    return new ApiResponse(200, true, 'User already exists, Please Login', null);
  }

  //sending opt
  static async sendOTPVerificationEmail(email: string, subject: string) {
    if (!email) throw new ApiResponse(400, false, 'email is required', null);
    if (!subject) throw new ApiResponse(400, false, 'reason is required', null);

    const existingOtp = await redisClient.get(email);
    if (existingOtp) {
      await redisClient.del(email);
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await redisClient.set(email, otp, {
      EX: 300, // IN SECONDS
    });

    try {
      const otpSubject = `${otp} ${subject}`;
      await sendEmail({
        email,
        subject: otpSubject,
        content: `Your verification code is: ${otp}`,
        template: () => generateOTPEmailTemplate(otp, subject),
      });

      const OPTttl = await redisClient.ttl(email);

      return new ApiResponse(200, true, 'OTP Email sent successfully', OPTttl);
    } catch (error: any) {
      return new ApiResponse(500, false, error.message, null);
    }
  }

  //verifing opt
  static async verifyOTP(email: string, enteredOTP: number) {
    if (!email) throw new ApiResponse(404, false, 'Email is required', null);
    if (!enteredOTP) throw new ApiResponse(404, false, 'OTP not found', null);

    const storedOTP = await redisClient.get(email);
    const OPTttl = await redisClient.ttl(email);
    if (OPTttl <= 0 || !storedOTP) {
      throw new ApiResponse(404, false, 'OTP expired, Please resend again', null);
    }

    if (Number(enteredOTP) !== Number(storedOTP)) {
      throw new ApiResponse(401, false, 'Incorrect OTP, Please Enter valid OTP', null);
    }

    await redisClient.del(email);

    return new ApiResponse(200, true, 'OTP verified successfully', null);
  }

  //registering user
  static async registerUser(
    firstName: string,
    lastName: string | undefined,
    email: string,
    password: string
  ) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiResponse(409, false, 'User already exists, Please Login', null);

    const user: IUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const userDTO: UserDTO = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return new ApiResponse(201, true, 'User registered successfully', {
      user: userDTO,
      accessToken,
      refreshToken,
    });
  }

  //loginning in user
  static async loginUser(email: string, password: string) {
    const user: IUser | null = await User.findOne({ email });
    if (!user) throw new ApiResponse(404, false, 'User not found, Please Signup', null);

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) throw new ApiResponse(401, false, 'Incorrect password', null);

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const userDTO: UserDTO = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return new ApiResponse(200, true, 'User logged in successfully', {
      user: userDTO,
      accessToken,
      refreshToken,
    });
  }

  //refreshing access token
  static async refreshAccessToken(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new ApiResponse(400, false, 'Refresh token is required', null);
      }

      const decoded = jwt.decode(refreshToken) as { userId: string } | null;
      if (!decoded) {
        throw new ApiResponse(401, false, 'Invalid refresh token decoding', null);
      }

      // Verifing the token
      const verifiedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as {
        userId: string;
      };

      const user = await User.findById(verifiedToken.userId);
      if (!user || user.refreshToken !== refreshToken) {
        throw new ApiResponse(401, false, 'Invalid refresh token comparing', null);
      }

      // Generating new access token
      const accessToken = user.createAccessToken();
      return new ApiResponse(200, true, 'Token refreshed successfully', { accessToken });
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiResponse(401, false, 'Refresh token expired', null);
      }

      if (error.name === 'JsonWebTokenError') {
        throw new ApiResponse(400, false, 'Malformed refresh token', null);
      }

      throw new ApiResponse(401, false, 'Invalid refresh token', null);
    }
  }

  //validating user authentication
  static async authenticateUser(userData: string) {
    if (!userData) throw new ApiResponse(404, false, 'User not found', null);
    return new ApiResponse(200, true, ' user Authenticated successfully via service', userData);
  }

  //verifing password
  static async verifyPassword(userId: string, password: string) {
    const user = await User.findById(userId);
    if (!user) throw new ApiResponse(404, false, 'User not found', null);

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) throw new ApiResponse(401, false, 'Incorrect password', null);

    return new ApiResponse(200, true, 'Password verified successfully', null);
  }
}
