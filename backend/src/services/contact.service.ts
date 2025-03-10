import { ApiResponse } from '../utils/apiResponse.js';
import { Contact, IContact } from '../models/contact.model.js';

export class ContactService {
  static async addContactMessages(name: string, email: string, message: string): Promise<IContact> {
    const isFieldEmpty: boolean = [name, email, message].some(field => !field.trim());

    if (isFieldEmpty) {
      throw new ApiResponse(false, 'All fields are required', null);
    }

    // Create the contact message in the db
    const contactMsg = await Contact.create({
      name,
      email,
      message,
      status: 'unread',
    });

    if (!contactMsg) {
      throw new ApiResponse(false, 'Failed to send message', null);
    }

    return contactMsg;
  }

  static async updateContactMessages(id: string, message: string): Promise<IContact> {
    if (!id) throw new ApiResponse(false, 'Invalid ID.', null);

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: { message: message, status: 'updated' } },
      { new: true }
    );

    if (!updatedContact) throw new ApiResponse(false, 'Message not found.', null);

    return updatedContact;
  }

  static async deleteContactMessages(id: string): Promise<IContact> {
    if (!id) throw new ApiResponse(false, 'Invalid ID.', null);

    const deletedContactMsg = await Contact.findByIdAndDelete(id);

    if (!deletedContactMsg) throw new ApiResponse(false, 'Message not found.', null);

    return deletedContactMsg;
  }
}
