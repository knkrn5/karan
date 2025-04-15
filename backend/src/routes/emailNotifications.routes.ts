import { Router } from 'express';
import { emailNotificationsController } from '../controllers/emailNotifications.controller.js';

const router = Router();

router.post('/email-user-agent-data', emailNotificationsController.emailUserAgentData);

export default router;
