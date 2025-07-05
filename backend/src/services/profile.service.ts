// import { UserModel } from '../models/user.model.js';
import { ApiResponse } from '../utils/apiResponse.js';

import { ContactModel } from '../models/contact.model.js';
import { ChatbotModel } from '../models/chatbot.model.js';
import { ProjectModel } from '../models/projects.models.js';




export class ProfileService {
  // static async getProfile(userId: string) {
  //   const user = await UserModel.findById(userId).select('-_id -password -refreshToken -createdAt -updatedAt');
  //   if (!user) throw new ApiResponse(400, false, 'User not found', null);

  //   return new ApiResponse(200, true, 'User profile data retrieved', user);
  // }

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

      await ContactModel.deleteOne({ userId });
      await ChatbotModel.deleteOne({ userId });
      await ProjectModel.updateMany(
        {},
        {
          $pull: { likeDislikeInteractions: { userId } }
        });

      return new ApiResponse(200, true, 'Account deleted successfully', null);
    } catch (error) {
      throw new ApiResponse(500, false, 'Failed to delete account due to server error', error);
    }

  }
}
