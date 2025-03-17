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
    if (existingUser) throw new ApiResponse(409, false, 'User already exists', null);

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

    return {
      user: userDTO,
      accessToken,
      refreshToken,
    };
  }

  static async loginUser(email: string, password: string) {
    const user: IUser | null = await User.findOne({ email });
    if (!user) throw new ApiResponse(404, false, 'User not found', null);

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

    return {
      user: userDTO,
      accessToken,
      refreshToken,
    };
  }

  static async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as {
        userId: string;
      };

      const user = await User.findById(decoded.userId);
      if (!user || user.refreshToken !== refreshToken)
        throw new ApiResponse(401, false, 'Invalid refresh token', null);

      const accessToken = user.createAccessToken();
      return new ApiResponse(200, true, 'Token refreshed successfully', { accessToken });
    } catch (error) {
      throw new ApiResponse(401, false, 'Refresh token expired', null);
    }
  }
}
