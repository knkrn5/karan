import { model, Schema, Document, Types } from "mongoose";

export interface Project extends Document {
    user: Types.ObjectId;
    projectId: string;
    likeDislike: "like" | "dislike" | null;
}

const projectSchema = new Schema<Project>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        projectId: {
            type: String,
            required: true,
        },
        likeDislike: {
            type: String,
            enum: ["like", "dislike", null],
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// Uncomment this to prevent duplicate like/dislike per user/project
// projectSchema.index({ user: 1, projectId: 1 }, { unique: true });

export const ProjectModel = model<Project>("Project", projectSchema);
