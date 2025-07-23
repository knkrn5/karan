import express from 'express';
import { ContactMiddleware } from '../middlewares/contact.middleware.js';
import { ContactController } from '../controllers/contact.controller.js';
import { isAccessTokenValid } from '../middlewares/auth.middleware.js';



const router = express.Router();

router.post('/send-message', isAccessTokenValid, ContactMiddleware.ContactPostLimiter, ContactController.addContactMessage);
router.patch('/edit-message', isAccessTokenValid, ContactMiddleware.ContactPutLimiter, ContactController.updateContactMessages);
router.delete('/delete-message', isAccessTokenValid, ContactController.deleteContactMessages);
router.get('/get-message', isAccessTokenValid, ContactController.getContactMessages);

router.post('/send-contact-msg-copy-email', ContactController.sendContactMsgCopyEmail);

export default router;
