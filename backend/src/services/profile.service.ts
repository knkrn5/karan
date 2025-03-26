import { User, IUser } from '../models/user.model.js';
// import { UserDTO } from '../dtos/user.dto.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class ProfileService {
  static async getProfile(userId: string) {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new ApiResponse(404, false, 'User not found', null);

    return new ApiResponse(200, true, 'User profile retrieved', user);
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

  static async deleteAccount(userId: string) {
    if (!userId) throw new ApiResponse(404, false, 'User ID not found', null);

    await User.findByIdAndDelete(userId);

    return new ApiResponse(200, true, 'Account deleted successfully', null);
  }
}
