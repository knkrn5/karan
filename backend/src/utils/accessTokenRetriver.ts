import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { JWTPayload } from '../middlewares/auth.middleware.js';

export const accessTokenRetriever = (req: Request) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if (!accessToken) return null;

        const decodedPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as JWTPayload;
        req.payload = decodedPayload;

        return decodedPayload;

    } catch (error) {
        if (error instanceof Error) {
            console.error('Token verification failed:', error.message);
        } else {
            console.error('Token verification failed:', error);
        }
        return null;
    }
};
