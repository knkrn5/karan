import { ProjectModel } from "../models/projects.models.js";
import { ApiResponse } from "../utils/apiResponse.js";


export class ProjectsService {
    static async projectsLikeDislikeInteraction(userId: string, projectId: string, likeDislike: string) {
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
}