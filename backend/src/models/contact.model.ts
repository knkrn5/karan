import mongoose from "mongoose";

export interface IContact {
    name: string;
    email: string;
    message: string;
}

import { Schema } from "mongoose";

const blogSchema = new Schema({
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


export const Contact = mongoose.model<IContact>("Contact", blogSchema);