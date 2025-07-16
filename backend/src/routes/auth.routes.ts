import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import {
  isAccessTokenValid,
  registrationLimiter,
  sendOtpLimiter
} from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/authenticateUser', isAccessTokenValid, AuthController.authenticateUser);

// Tracking the ip address of the user
router.get('/get-user-ip-address', (req, res) => {
  res.status(200).json({ ip: req.ip });
});

export default router;
