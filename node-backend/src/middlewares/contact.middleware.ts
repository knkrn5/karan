import rateLimit from 'express-rate-limit';
import { ApiResponse } from '../utils/apiResponse.js';

export class ContactMiddleware {
  static readonly ContactPostLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: new ApiResponse(429, false, 'Too many requests sent...', null),
    skipFailedRequests: true
  });

  static readonly ContactPutLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: new ApiResponse(429, false, 'Too many requests sent...', null),
    skipFailedRequests: true
  });
}
