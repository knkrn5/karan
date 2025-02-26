import mongoose from "mongoose";

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


export const Contact = mongoose.model("Contact", blogSchema);