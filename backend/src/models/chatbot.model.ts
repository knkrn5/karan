import mongoose, { Schema, Document } from "mongoose";


export interface IChatbotMessage {
    user: string;
    role: string;
    content: string;
}

export interface IChatbot extends Document {
    user: string;
    message: IChatbotMessage[];
}

const chatbotMsgSchema = new Schema<IChatbot>(
    {
        user: {
            type: String,
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
    {
        timestamps: true,
    }
);

export const ChatbotModel = mongoose.model<IChatbot>("Chatbot", chatbotMsgSchema);
