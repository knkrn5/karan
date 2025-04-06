// import { createClient } from 'contentful';
import * as contentful from 'contentful';
import dotenv from 'dotenv';
import { ApiResponse } from '../utils/apiResponse.js';
dotenv.config();

var client = contentful.createClient({
  space:
    process.env.CONTENTFUL_SPACE_ID ||
    (() => {
      throw new Error('CONTENTFUL_SPACE_ID is not defined');
    })(),
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    (() => {
      throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined');
    })(),
});

export class BlogService {
  static async getBlogPosts() {
    const blogData = await client.getEntries();

    if (blogData) {
      /*  blogData.items.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, item);
      }); */
      return new ApiResponse(200, true, 'Blog data fetched successfully', blogData.items);
    } else {
      return new ApiResponse(404, false, 'Blog data not found', null);
    }
  }
}
