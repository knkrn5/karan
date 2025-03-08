import rateLimit from "express-rate-limit";
import { ApiResponse } from "./apiResponse.js";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    standardHeaders: true, 
    legacyHeaders: false,
    message: new ApiResponse(false, 'Too many requests sent...', null),
});

export { limiter };