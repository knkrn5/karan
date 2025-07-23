import { emailTransporter } from '../utils/emailTransporter.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { sendUserDataAgentEmailTemplate } from '../mail/templates/userAgentDataEmailTemplate.js';

export class EmailNotificationsService {
  static async emailUserAgentData(
    toEmail: string,
    subject: string,
    excerpt: string,
    userAgentData: any
  ) {
    if (!toEmail) throw new ApiResponse(400, false, 'Email is required', null);
    if (!subject) throw new ApiResponse(400, false, 'Subject is required', null);
    if (!userAgentData) throw new ApiResponse(400, false, 'User Agent Data not found', null);

    const response = await emailTransporter({
      toEmail,
      subject,
      fallbackEmail: JSON.stringify(userAgentData),
      template: () => sendUserDataAgentEmailTemplate(excerpt, userAgentData),
    });

    return new ApiResponse(200, true, 'User Agent Data Emailed successfully', response);
  }
}
