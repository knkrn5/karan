import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage {
    message: string;
    status?: 'notUpdated' | 'updated';
}

export interface IContact extends Document {
    user: Types.ObjectId;
    messages: IMessage[];
}

// Define the subdocument schema correctly
const messageSchema = new Schema<IMessage>(
    {
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ['notUpdated', 'updated'],
            default: 'notUpdated',
        },
    },
    {
        timestamps: true,
        _id: true,
    }
);

// Main contact schema
const contactMsgSchema = new Schema<IContact>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        messages: [messageSchema],
    },
    { timestamps: true }
);

export const ContactModel = mongoose.model<IContact>("Contact", contactMsgSchema);
