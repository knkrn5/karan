import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller.js';

const router = Router();

router.get('/blog-posts', BlogController.getBlogPosts);


export default router;