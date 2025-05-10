import { Router } from "express";

const router = Router();

import { isAccessTokenValid } from "../middlewares/auth.middleware.js";
import { ProjectsController } from "../controllers/projects.controller.js";


router.post('/add-projects-like-dislike-interaction', isAccessTokenValid, ProjectsController.addProjectsLikeDislikeInteraction);
router.get('/get-user-projects-like-dislike-interaction', isAccessTokenValid, ProjectsController.getUserProjectsLikeDislikeInteraction);
router.get('/get-all-projects-like-dislike-interaction', ProjectsController.getAllProjectsLikeDislikeInteraction);

export default router;