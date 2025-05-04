import mongoose, { Schema } from "mongoose";

export interface IContact {
    name: string;
    email: string;
    message: string;
}


const contactMsgSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const ContactModel = mongoose.model<IContact>("Contact", contactMsgSchema);