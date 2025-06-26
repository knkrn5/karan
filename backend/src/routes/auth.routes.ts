import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import {
  isAccessTokenValid,
  registrationLimiter,
  sendOtpLimiter
} from '../middlewares/auth.middleware.js';

const router = Router();

// router.post('/register', verifyOTP, registrationLimiter, AuthController.registerUser);
// router.post('/login', AuthController.loginUser);

// router.get('/verify-user', AuthController.verifyUser);
// router.post('/send-email-otp', sendOtpLimiter, AuthController.sendEmailVerificationOTP);
// router.post('/verify-email-otp', AuthController.verifyOTP);

// router.post('/logout', AuthController.logoutUser);
// router.post('/refresh-token', AuthController.refreshAccessToken);
router.get('/authenticateUser', isAccessTokenValid, AuthController.authenticateUser);
// router.post('/verify-password', isAccessTokenValid, AuthController.verifyPassword);

// router.patch('/reset-password', verifyOTP, AuthController.resetPassword);

// Tracking the ip address of the user
router.post('/get-user-ip-address', (req, res) => {
  res.status(200).json({ ip: req.ip });
});

export default router;
