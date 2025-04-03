import { BlogService } from '../services/blog.service';

class BlogController {
  static async getBlogData() {
    const msg = 'testing';
    const response = await BlogService.getBlogData(msg);
  }
}
