import rateLimit from "express-rate-limit";
import { apiResponse } from "./apiResponse.js";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    standardHeaders: true, 
    legacyHeaders: false,
    message: new apiResponse(false, 'Too many requests sent...', null),
});

export { limiter };