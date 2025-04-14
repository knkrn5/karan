import { ApiResponse } from '../utils/apiResponse.js';
import { Contact } from '../models/contact.model.js';
import nodemailer from 'nodemailer';
import { sendEmail } from '../utils/email.js';
import { contactMsgEmailTemplate } from '../mail/templates/contactMsgEmailTemplate.js';

export class ContactService {
  static async addContactMessages(name: string, email: string, message: string) {
    const isFieldEmpty: boolean = [name, email, message].some(field => !field.trim());

    if (isFieldEmpty) {
      throw new ApiResponse(404, false, 'All fields are required', null);
    }

    // Create the contact message in the db
    const contactMsg = await Contact.create({
      name,
      email,
      message,
      status: 'unread',
    });

    if (!contactMsg) {
      throw new ApiResponse(404, false, 'Failed to send message', null);
    }

    return new ApiResponse(201, true, 'Message sent successfully', contactMsg);
  }

  static async updateContactMessages(id: string, message: string) {
    if (!id) throw new ApiResponse(401, false, 'Invalid ID.', null);

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: { message: message, status: 'updated' } },
      { new: true }
    );

    if (!updatedContact) throw new ApiResponse(404, false, 'Message not found.', null);

    return new ApiResponse(200, true, 'Message updated successfully', updatedContact);
  }

  static async deleteContactMessages(id: string) {
    if (!id) throw new ApiResponse(404, false, 'Invalid ID.', null);

    const deletedContactMsg = await Contact.findByIdAndDelete(id);

    if (!deletedContactMsg) throw new ApiResponse(400, false, 'Message not found.', null);

    return new ApiResponse(200, true, 'Message deleted successfully', deletedContactMsg);
  }

  static async sendContactMsgCopyEmail(email: string, subject: string, fallbackEmail: string) {
    if (!email) throw new ApiResponse(400, false, 'email is required', null);
    if (!subject) throw new ApiResponse(400, false, 'reason is required', null);
    if (!fallbackEmail) throw new ApiResponse(400, false, 'content is required', null);

    const response = await sendEmail({
      email,
      subject,
      fallbackEmail,
      template: () => contactMsgEmailTemplate(subject, fallbackEmail),
    });

    return new ApiResponse(200, true, 'Contact Message Emailed successfully', response);
  }
}
