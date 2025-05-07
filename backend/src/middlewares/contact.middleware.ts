import rateLimit from 'express-rate-limit';
import { ApiResponse } from '../utils/apiResponse.js';

export class ConactMiddleware {
  static ContactPostLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: new ApiResponse(429, false, 'Too many requests sent...', null),
    skipFailedRequests: true
  });

  static ContactPutLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: new ApiResponse(429, false, 'Too many requests sent...', null),
    skipFailedRequests: true
  });
}
