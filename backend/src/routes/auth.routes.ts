
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { limiter } from '../utils/limiter.js';

const router = Router();

router.post('/register', limiter, AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.logoutUser);
router.post('/refresh-token', AuthController.refreshToken);


import { ProfileController } from '../controllers/profile.controller.js';

router.get('/profile', verifyToken, ProfileController.getProfile);

/* router.put('/', verifyToken, ProfileController.updateProfile);
router.delete('/', verifyToken, ProfileController.deleteAccount); */

export default router;

