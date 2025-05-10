import { UserModel } from '../models/user.model.js';
import { ApiResponse } from '../utils/apiResponse.js';


export class ProfileService {
  static async getProfile(userId: string) {
    const user = await UserModel.findById(userId).select('-_id -password -refreshToken -createdAt -updatedAt');
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

  static async deleteAccount(userId: string) {

    if (!userId) throw new ApiResponse(400, false, 'User ID is required', null);

    //deleting account
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      if (!deletedUser) throw new ApiResponse(404, false, 'User not found', null);

      return new ApiResponse(200, true, 'Account deleted successfully', null);
    } catch (error) {
      throw new ApiResponse(500, false, 'Failed to delete account due to server error', error);
    }

  }
}
