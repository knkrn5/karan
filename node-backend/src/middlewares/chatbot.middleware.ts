import rateLimit from "express-rate-limit";
import { ApiResponse } from "../utils/apiResponse.js";
import { Request, Response } from "express";

//sendOpt limiter
export const cbMsgLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req: Request, res: Response) => res.status(429).json(new ApiResponse(429, false, 'Too many requests sent...', null)),
    skipFailedRequests: true
});
