import mongoose from "mongoose";
import { ProjectModel } from "../models/projects.models.js";
import { ApiResponse } from "../utils/apiResponse.js";


export class ProjectsService {
    static async addProjectsLikeDislikeInteraction(userId: string, projectId: string, likeDislike: string) {
        if (!userId) throw new ApiResponse(400, false, 'User is required', null);
        if (!projectId) throw new ApiResponse(400, false, 'Project Id is required', null);
        if (!likeDislike) throw new ApiResponse(400, false, 'Like Dislike is required', null);

        const project = await ProjectModel.findOneAndUpdate(
            { user: userId, projectId },
            { likeDislike },
            { upsert: true, new: true }
        );

        return new ApiResponse(200, true, 'Added Like/Dislike  to Project successfully', project);
    }

    static async getUserProjectsLikeDislikeInteraction(userId: string) {
        if (!userId) throw new ApiResponse(400, false, 'User is required', null);
        // const projectsLikeDislike = await ProjectModel.find({ user: userId }).select('projectId likeDislike');
        const userProjectsLikeDislike = await ProjectModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $project: {
                    _id: 0,
                    projectId: 1,
                    likeDislike: 1,
                }
            }
        ]);
        return new ApiResponse(200, true, 'Projects Like/Dislike retrieved successfully', userProjectsLikeDislike);
    }


    static async getAllProjectsLikeDislikeInteraction() {

        const allProjectsLikeDislikeSummary = await ProjectModel.aggregate([
            {
                $group: {
                    _id: "$projectId",
                    likeCount: {
                        $sum: { $cond: [{ $eq: ["$likeDislike", "like"] }, 1, 0] }
                    },
                    dislikeCount: {
                        $sum: { $cond: [{ $eq: ["$likeDislike", "dislike"] }, 1, 0] }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    projectId: "$_id",
                    likeCount: 1,
                    dislikeCount: 1
                }
            }
        ]);

        return new ApiResponse(200, true, 'Projects Like/Dislike retrieved successfully', allProjectsLikeDislikeSummary);
    }
}

