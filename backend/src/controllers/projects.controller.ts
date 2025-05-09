import { Request, Response } from "express";
import { ProjectsService } from "../services/projects.service.js";
import { ApiResponse } from "../utils/apiResponse.js";


export class ProjectsController {
    static async addProjectsLikeDislikeInteraction(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user.userId;
            const { projectId, likeDislike } = req.body;
            const response = await ProjectsService.addProjectsLikeDislikeInteraction(userId, projectId, likeDislike);
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            if (error instanceof ApiResponse) {
                res.status(error.statusCode).json(error);
                return;
            }
            res.status(500).json({
                success: false,
                message: 'Failed to get projects',
                error: error instanceof Error ? error.message : 'An unknown error occurred.',
            });
        }
    }
}