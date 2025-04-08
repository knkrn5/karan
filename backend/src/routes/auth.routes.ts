
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { limiter } from '../utils/limiter.js';
import { isAccessTokenValid } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', limiter, AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/send-otp', AuthController.sendOTPVerificationEmail);
router.post('/logout', AuthController.logoutUser);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/authenticateUser', isAccessTokenValid, AuthController.authenticateUser);

export default router;

