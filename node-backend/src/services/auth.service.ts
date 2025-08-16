import { ApiResponse } from '../utils/apiResponse.js';
import { JWTPayload } from '../middlewares/auth.middleware.js';


export class AuthService {

  //validating user authentication
  static async authenticateUser(userDataPayload: JWTPayload) {
    if (!userDataPayload) throw new ApiResponse(404, false, 'User not found', null);
    return new ApiResponse(200, true, ' user Authenticated successfully ', userDataPayload);
  }

}
