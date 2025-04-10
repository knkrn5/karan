
import { Router } from 'express';
import { isAccessTokenValid } from '../middlewares/auth.middleware.js';
import { ProfileController } from '../controllers/profile.controller.js';


const router = Router();


router.get('/details', isAccessTokenValid, ProfileController.getProfile);
//  router.put('/', isAccessTokenValid, ProfileController.updateProfile);
router.delete('/delete-account', isAccessTokenValid, ProfileController.deleteAccount); 


export default router;  

