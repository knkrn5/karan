// import { createClient } from 'contentful';
import * as contentful from 'contentful';
import dotenv from 'dotenv';
import { ApiResponse } from '../utils/apiResponse.js';
dotenv.config();

var client = contentful.createClient({
  space:
    process.env.CONTENTFUL_SPACE_ID ??
    (() => {
      throw new Error('CONTENTFUL_SPACE_ID is not defined');
    })(),
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ??
    (() => {
      throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined');
    })(),
});

export class BlogService {
  static async getBlogPosts() {
    const blogData = await client.getEntries({
      content_type: '7HqIg9Mb3tyFbPpB1ZxD8B',
      order: ['-fields.publishedDate'],
    });

    if (blogData) {
      return new ApiResponse(200, true, 'Blog data fetched successfully', blogData.items);
    } else {
      return new ApiResponse(404, false, 'Blog data not found', null);
    }
  }
}
