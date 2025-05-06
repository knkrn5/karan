import mongoose, { Schema, Document, Types } from "mongoose";


export interface IChatbotMessage {
    role: string;
    content: string;
}

export interface IChatbot extends Document {
    user: Types.ObjectId;
    message: IChatbotMessage[];
}

const chatbotMsgSchema = new Schema<IChatbot>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: [
            {
                role: {
                    type: String,
                    required: true,
                },
                content: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

export const ChatbotModel = mongoose.model<IChatbot>("Chatbot", chatbotMsgSchema);
