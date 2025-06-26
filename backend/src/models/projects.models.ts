import { model, Schema, Document, Types } from "mongoose";

interface LikeDislikeTypeProps extends Document {
    user: string;
    likeDislike: "like" | "dislike" | null;
}

export interface ProjectTypeProps extends Document {
    projectId: string;
    likeDislikeInteractions: LikeDislikeTypeProps[];
}


const likeDislikeSchema = new Schema<LikeDislikeTypeProps>({
    user: {
        type: String,
        required: true,
    },
    likeDislike: {
        type: String,
        enum: ["like", "dislike", null],
        required: true,
    }
}, {
    timestamps: true,
    _id: false
});

const projectSchema = new Schema<ProjectTypeProps>(
    {
        projectId: {
            type: String,
            required: true,
        },
        likeDislikeInteractions: [likeDislikeSchema],
    },
    {
        timestamps: true
    }
);


export const ProjectModel = model<ProjectTypeProps>("Project", projectSchema);