import rateLimit from 'express-rate-limit';
import { apiResponse } from '../utils/apiResponse.js';

const contactPostLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: new apiResponse(false, 'Too many requests sent...', null),
});

const contactPutLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  message: new apiResponse(false, 'Too many requests sent...', null),
});

export { contactPostLimiter, contactPutLimiter };
