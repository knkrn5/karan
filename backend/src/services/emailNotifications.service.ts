import { emailTransporter } from '../utils/emailTransporter.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class emailNotificationsService {
  static async emailUserAgentData(email: string, subject: string, userAgentData: any) {
    if (!email) throw new ApiResponse(400, false, 'Email is required', null);
    if (!subject) throw new ApiResponse(400, false, 'Subject is required', null);
    if (!userAgentData) throw new ApiResponse(400, false, 'User Agent Data not found', null);

    const response = await emailTransporter({
      email,
      subject,
      fallbackEmail: JSON.stringify(userAgentData),
      template: () => JSON.stringify(userAgentData),
    });

    return new ApiResponse(200, true, 'User Agent Data Emailed successfully', response);
  }
}
