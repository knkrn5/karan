import { User, IUser } from '../models/user.model.js';
import { UserDTO } from '../dtos/user.dto.js';
import { ApiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async registerUser(
    firstName: string,
    lastName: string | undefined,
    email: string,
    password: string
  ) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiResponse(false, 'User already exists', null);

    const user: IUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    

    const userDTO: UserDTO = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return {
      user: userDTO,
      accessToken,
      refreshToken,
    };
  }

  static async loginUser(email: string, password: string) {
    const user: IUser | null = await User.findOne({ email });
    if (!user) throw new ApiResponse(false, 'User not found', null);

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) throw new ApiResponse(false, 'Incorrect password', null);

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    const userDTO: UserDTO = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return {
      user: userDTO,
      accessToken,
      refreshToken,
    };
  }

  static async getProfile(userId: string): Promise<UserDTO> {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new ApiResponse(false, 'User not found', null);

    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  /* static async updateProfile(userId: string, data: Partial<UserDTO>): Promise<UserDTO> {
    const user = await User.findByIdAndUpdate(userId, data, { new: true }).select('-password');
    if (!user) throw new Error('User not found');

    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  } */

  /*   static async deleteAccount(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  } */
}
