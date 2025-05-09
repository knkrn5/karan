import { Router } from "express";

const router = Router();

import { isAccessTokenValid } from "../middlewares/auth.middleware.js";
import { ProjectsController } from "../controllers/projects.controller.js";


router.post('/projects-like-dislike-interaction', ProjectsController.projectsLikeDislikeInteraction);
// router.get('/get-projects', isAccessTokenValid, ProjectController.getProjects);
// router.get('/get-project', isAccessTokenValid, ProjectController.getProject);
// router.patch('/update-project', isAccessTokenValid, ProjectController.updateProject);
// router.delete('/delete-project', isAccessTokenValid, ProjectController.deleteProject);

export default router;