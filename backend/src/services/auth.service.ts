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

    return new ApiResponse(201, true, 'User registered successfully', {
      user: userDTO,
      accessToken,
      refreshToken,
    });
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

    return new ApiResponse(200, true, 'User logged in successfully', {
      user: userDTO,
      accessToken,
      refreshToken,
    });
  }

  static async refreshAccessToken(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new ApiResponse(400, false, 'Refresh token is required', null);
      }

      const decoded = jwt.decode(refreshToken) as { userId: string } | null;
      if (!decoded) {
        throw new ApiResponse(401, false, 'Invalid refresh token', null);
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
        throw new ApiResponse(401, false, 'Invalid refresh token', null);
      }

      // Generating new access token
      const accessToken = user.createAccessToken();
      return new ApiResponse(200, true, 'Token refreshed successfully', { accessToken });
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiResponse(401, false, 'Refresh token expired', null);
      }
      throw new ApiResponse(401, false, 'Invalid refresh token', null);
    }
  }

  static async authenticateUser(userData: string) {
    return new ApiResponse(200, true, ' user Authenticated successfully via service', userData);
  }
}
