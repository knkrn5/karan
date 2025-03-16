
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { ProfileController } from '../controllers/profile.controller.js';


const router = Router();


router.get('/details', verifyToken, ProfileController.getProfile);

/* router.put('/', verifyToken, ProfileController.updateProfile);
router.delete('/', verifyToken, ProfileController.deleteAccount); */

export default router;

