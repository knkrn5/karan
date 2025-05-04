import { ApiResponse } from '../utils/apiResponse.js';
import { ContactModel } from '../models/contact.model.js';
import { emailTransporter } from '../utils/emailTransporter.js';
import { contactMsgEmailTemplate } from '../mail/templates/contactMsgEmailTemplate.js';

export class ContactService {
  static async addContactMessages(userId: string, message: string) {
    const isFieldEmpty: boolean = [userId, message].some(field => !field.trim());

    if (isFieldEmpty) {
      throw new ApiResponse(404, false, 'All fields are required', null);
    }

    //creating/adding contact message in the db
    const contactMsg = await ContactModel.create({
      user: userId,
      message,
      status: 'notUpdated',
    });

    if (!contactMsg) {
      throw new ApiResponse(404, false, 'Failed to send message', null);
    }

    return new ApiResponse(201, true, 'Message sent successfully', contactMsg);
  }

  static async updateContactMessages(id: string, message: string) {
    if (!id) throw new ApiResponse(401, false, 'Invalid ID.', null);

    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      { $set: { message, status: 'updated' } },
      { new: true }
    );

    if (!updatedContact) throw new ApiResponse(404, false, 'Message not found.', null);

    return new ApiResponse(200, true, 'Message updated successfully', updatedContact);
  }

  static async deleteContactMessages(id: string) {
    if (!id) throw new ApiResponse(404, false, 'Invalid ID.', null);

    const deletedContactMsg = await ContactModel.findByIdAndDelete(id);

    if (!deletedContactMsg) throw new ApiResponse(400, false, 'Message not found.', null);

    return new ApiResponse(200, true, 'Message deleted successfully', deletedContactMsg);
  }

  static async sendContactMsgCopyEmail(
    email: string,
    subject: string,
    excerpt: string,
    message: string
  ) {
    if (!email) throw new ApiResponse(400, false, 'email is required', null);
    if (!subject) throw new ApiResponse(400, false, 'reason is required', null);
    if (!excerpt) throw new ApiResponse(400, false, 'excerpt is required', null);
    if (!message) throw new ApiResponse(400, false, 'message is required', null);

    const response = await emailTransporter({
      email,
      subject,
      fallbackEmail: excerpt + '\n' + message,
      template: () => contactMsgEmailTemplate(excerpt, message),
    });

    return new ApiResponse(200, true, 'Contact Message Emailed successfully', response);
  }
}
