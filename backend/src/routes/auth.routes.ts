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
router.post('/send-email-otp', sendOtpLimiter, AuthController.sendEmailVerificationOTP);
router.post('/verify-email-otp', AuthController.verifyOTP);

router.post('/logout', AuthController.logoutUser);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/authenticateUser', isAccessTokenValid, AuthController.authenticateUser);
router.post('/verify-password', isAccessTokenValid, AuthController.verifyPassword);

router.patch('/reset-password', AuthController.changePassword);

// Tracking the ip address of the user
router.post('/get-user-ip-address', (req, res) => {
  const xForwardedFor = Array.isArray(req.headers['x-forwarded-for'])
    ? req.headers['x-forwarded-for'][0]
    : req.headers['x-forwarded-for'];
  const ip = req.ip ?? xForwardedFor?.split(',')[0] ?? req.socket.remoteAddress;
  res.status(200).json({ ip });
});

export default router;
