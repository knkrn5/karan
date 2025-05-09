import { model, Schema } from "mongoose";

const projectSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        projecId: {
            type: String,
            required: true,
        },
        likeDislike: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const ProjectModel = model("Project", projectSchema);