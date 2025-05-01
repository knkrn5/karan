import express from 'express';
import { conactMiddleware } from '../middlewares/contact.middleware.js';
import { ContactController } from '../controllers/contact.controller.js';


const router = express.Router();

router.post('/message', conactMiddleware.ContactPostLimiter, ContactController.addContactMessage);
router.patch('/message', conactMiddleware.ContactPutLimiter, ContactController.updateContactMessages);
router.delete('/message', ContactController.deleteContactMessages);

router.post('/send-contact-msg-copy-email', ContactController.sendContactMsgCopyEmail);

export default router;
