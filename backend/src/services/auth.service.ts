import { UserModel, IUser } from '../models/user.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';
import { OTPEmailTemplate } from '../mail/templates/otpEmailTemplate.js';
import { redisClient } from '../db/clients/uptashRedisDB.js';
import { emailTransporter } from '../utils/emailTransporter.js';
import bcrypt from 'bcrypt';

export class AuthService {

  //validating user authentication
  static async authenticateUser(userData: string) {
    if (!userData) throw new ApiResponse(404, false, 'User not found', null);
    return new ApiResponse(200, true, ' user Authenticated successfully ', userData);
  }

}
