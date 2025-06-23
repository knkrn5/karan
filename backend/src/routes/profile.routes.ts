
import { Router } from 'express';

import { isAccessTokenValid, verifyPassword, verifyOTP } from '../middlewares/auth.middleware.js';
import { ProfileController } from '../controllers/profile.controller.js';


const router = Router();


// router.get('/details', isAccessTokenValid, ProfileController.getProfile);
//  router.put('/', isAccessTokenValid, ProfileController.updateProfile);
router.delete('/delete-account', verifyPassword, verifyOTP, isAccessTokenValid, ProfileController.deleteAccount);


export default router;

