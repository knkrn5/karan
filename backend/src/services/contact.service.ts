import { ApiResponse } from '../utils/apiResponse.js';
import { ContactModel } from '../models/contact.model.js';
import { emailTransporter } from '../utils/emailTransporter.js';
import { contactMsgEmailTemplate } from '../mail/templates/contactMsgEmailTemplate.js';

export class ContactService {
  static async addContactMessages(userId: string, message: string) {
    if (!userId) throw new ApiResponse(404, false, 'User ID is required', null);
    if (!message) throw new ApiResponse(404, false, 'Message is required', null);


    //checking existing user
    // const existingUser = await UserModel.exists({ _id: userId });
    // if (!existingUser) {
    //   throw new ApiResponse(404, false, 'User not found', null);
    // }

    //creating/adding/pushing contact message in the db
    const contactMsg = await ContactModel.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          messages: {
            message,
            status: 'notUpdated',
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    );


    if (!contactMsg) {
      throw new ApiResponse(404, false, 'Failed to send message', null);
    }

    return new ApiResponse(201, true, 'Message sent successfully', contactMsg);
  }

  static async updateContactMessages(userId: string, msgId: string, newMessage: string) {
    if (!userId) throw new ApiResponse(401, false, 'User ID is required.', null);
    if (!msgId) throw new ApiResponse(401, false, 'Message ID is required.', null);

    const updatedContact = await ContactModel.findOneAndUpdate(
      {
        user: userId,
        "messages._id": msgId,
      },
      {
        $set: {
          "messages.$.message": newMessage,
          "messages.$.status": "updated",
        },
      },
      { new: true }
    );

    if (!updatedContact) {
      throw new ApiResponse(404, false, 'Message not found.', null);
    }

    return new ApiResponse(200, true, 'Message updated successfully', updatedContact);
  }

  static async deleteContactMessages(userId: string, msgId: string) {
    if (!userId) throw new ApiResponse(404, false, 'user Id is required.', null);
    if (!msgId) throw new ApiResponse(404, false, 'Invalid ID.', null);

    //deleting msg from the msgs array
    const deletedContactMsg = await ContactModel.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          messages: { _id: msgId },
        },
      },
      { new: true }
    );

    if (!deletedContactMsg) throw new ApiResponse(400, false, 'Message not found.', null);

    return new ApiResponse(200, true, 'Message deleted successfully', deletedContactMsg);
  }

  static async getContactMessages(userId: string) {
    const result = await ContactModel.aggregate([
      { $match: { user: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          messages: { $push: "$messages" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);

    return new ApiResponse(200, true, "User messages fetched successfully", result[0]);
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
