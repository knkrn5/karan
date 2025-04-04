import { BlogService } from '../services/blog.service.js';
import { Response, Request } from 'express';

export class BlogController {
  static async getBlogPosts(req: Request, res: Response): Promise<void> {
    try {
      const response = await BlogService.getBlogPosts();
      if (response) {
        res.status(response.statusCode).json(response);
      }
    } catch (error: unknown) {
      res
        .status(500)
        .json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
}
