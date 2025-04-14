import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import {
  isAccessTokenValid,
  registrationLimiter,
  sendOtpLimiter,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registrationLimiter, AuthController.registerUser);
router.post('/login', AuthController.loginUser);

router.post('/verify-user', AuthController.verifyUser);
router.post('/send-otp', sendOtpLimiter, AuthController.sendEmailVerificationOTP);
router.post('/verify-otp', AuthController.verifyOTP);

router.post('/logout', AuthController.logoutUser);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/authenticateUser', isAccessTokenValid, AuthController.authenticateUser);
router.post('/verify-password', isAccessTokenValid, AuthController.verifyPassword);

export default router;
