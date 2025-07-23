import { Router } from 'express';
import { EmailNotificationsController } from '../controllers/emailNotifications.controller.js';

const router = Router();

router.post('/email-user-agent-data', EmailNotificationsController.emailUserAgentData);

export default router;
