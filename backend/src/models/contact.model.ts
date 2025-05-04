import mongoose, { Schema, Document, Types } from "mongoose";

export interface IContact extends Document {
    user: Types.ObjectId;
    message: string;
    status?: 'notUpdated' | 'updated';
}

const contactMsgSchema = new Schema<IContact>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['notUpdated', 'updated'],
            default: 'notUpdated',
        },
    },
    { timestamps: true }
);

export const ContactModel = mongoose.model<IContact>("Contact", contactMsgSchema);
