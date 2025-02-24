import mongoose from "mongoose";

import { Schema } from "mongoose";

const blogSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const Contact = mongoose.model("Contact", blogSchema);