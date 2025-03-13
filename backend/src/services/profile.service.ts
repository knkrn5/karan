import { User, IUser } from '../models/user.model.js';
import { UserDTO } from '../dtos/user.dto.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class ProfileService {
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

  /* static async deleteAccount(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  } */
}
