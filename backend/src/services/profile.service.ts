import { User, IUser } from '../models/user.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import bcrypt from 'bcrypt';
import { redisClient } from '../db/clients/uptashRedisDB.js';



export class ProfileService {
  static async getProfile(userId: string) {
    const user = await User.findById(userId).select('-_id -password -refreshToken -createdAt -updatedAt');
    if (!user) throw new ApiResponse(400, false, 'User not found', null);

    return new ApiResponse(200, true, 'User profile data retrieved', user);
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

  static async deleteAccount(email: string, password: string, enteredOTP: number) {
    if (!email) throw new ApiResponse(400, false, 'Email is required', null);
    if (!enteredOTP) throw new ApiResponse(400, false, 'OTP is required', null);
    if (!password) throw new ApiResponse(400, false, 'Password is required', null);

    //verify password
    const user: IUser | null = await User.findOne({ email });
    if (!user) throw new ApiResponse(404, false, 'User not found', null);
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) throw new ApiResponse(401, false, 'Incorrect password, Please Enter the correct password', null);


    //verify OTP
    const storedOTP = await redisClient.get(email);
    if (!storedOTP) throw new ApiResponse(400, false, 'OTP not found. Please resend.', null);
    const isOtpMatch = await bcrypt.compare(String(enteredOTP), storedOTP);
    if (!isOtpMatch) {
      throw new ApiResponse(401, false, 'Incorrect OTP. Please Enter Valid OTP.', null);
    }

    //delete stored OTP
    await redisClient.del(email);

    //delete account
    try {
      const deletedUser = await User.findOneAndDelete({ email });
      if (!deletedUser) {
        throw new ApiResponse(404, false, 'User not found', null);
      }

      return new ApiResponse(200, true, 'Account deleted successfully', null);
    } catch (error) {
      throw new ApiResponse(500, false, 'Failed to delete account due to server error', error);
    }

  }
}
