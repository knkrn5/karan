import { Request, Response } from 'express';
import { Contact } from '../models/contact.model.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Adding Contact information in db
const contactInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name = '', email = '', message = '' } = req.body;

    const isFieldEmpty: boolean = [name, email, message].some(field => field.trim().length === 0);

    if (isFieldEmpty) {
      res.status(400).json(new ApiResponse(false, 'All fields are required', req.body));
      return;
    }

    const contactMsg = await Contact.create({
      name: name,
      email: email,
      message: message,
      status: 'unread',
    });

    res.status(201).json(new ApiResponse(true, 'Message sent successfully', contactMsg));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';

    res.status(500).json(new ApiResponse(false, 'Failed to send message', errorMessage));
  }
};

// Update contact message
const updateContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, message } = req.body;

    // prettier-ignore
    if (!id) {
      res.status(400).json(
        new ApiResponse(
          false, 
          'Invalid ID.',
          null
        ));
      return;
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: { message: message, status: 'updated' } },
      { new: true }
    );

    if (!updatedContact) {
      res.status(404).json(new ApiResponse(false, 'Message not found.', null));
      return;
    }

    res.status(200).json(new ApiResponse(true, 'Message updated successfully', updatedContact));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';

    res.status(500).json(new ApiResponse(false, 'Failed to update message.', errorMessage));
  }
};

//Delete contact message
const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json(new ApiResponse(false, 'Invalid ID.', null));
      return;
    }

    const deletedContactMsg = await Contact.findByIdAndDelete(id);

    if (!deletedContactMsg) {
      res.status(404).json(new ApiResponse(false, 'Message not found.', null));
      return;
    }

    res.status(200).json(new ApiResponse(true, 'Message deleted successfully', deletedContactMsg));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';

    res.status(500).json(new ApiResponse(false, 'Failed to delete message.', errorMessage));
  }
};

export { contactInfo, updateContactMessage, deleteContactMessage };
