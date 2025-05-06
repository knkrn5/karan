import jwt from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express' {
    interface Request {
        user?: any;
    }
}

export const accessTokenRetriever = (req: Request) => {
    try {
        const accessToken = req.cookies?.accessToken;
        if (!accessToken) return null;

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
        req.user = decoded;
        return decoded;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Token verification failed:', error.message);
        } else {
            console.error('Token verification failed:', error);
        }
        return null;
    }
};
