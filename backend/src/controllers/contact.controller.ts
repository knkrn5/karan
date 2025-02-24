import { Request, Response } from "express";
import { Contact } from "../models/contact.model.js";

// Adding Contact information
const contactInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    const contactMsg = await Contact.create({
      Name: name,
      Email: email,
      Message: message,
      status: "unread",
    });

    res.status(201).json({
      success: true,
      status: "Message sent successfully",
      data: contactMsg,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    res.status(500).json({
      success: false,
      status: "Something went wrong.",
      message: errorMessage,
      data: req.body,
    });
  }
};

// Update contact message
const updateContactMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, message } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: { Message: message, status: "updated" } },
      { new: true }
    );

    if (!updatedContact) {
      res.status(404).json({ success: false, status: "Message not found." });
    }

    res.status(200).json({
      success: true,
      status: "Message updated successfully",
      data: updatedContact,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    res.status(500).json({
      success: false,
      status: "Failed to update message.",
      message: errorMessage,
    });
  }
};

//Delete contact message
const deleteContactMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      res.status(404).json({ success: false, status: "Message not found." });
    }

    res.status(200).json({
      success: true,
      status: "Message deleted successfully",
      data: deletedContact,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    res.status(500).json({
      success: false,
      status: "Failed to delete message.",
      message: errorMessage,
    });
  }
};

export { contactInfo, updateContactMessage, deleteContactMessage };
