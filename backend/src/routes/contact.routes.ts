import express from 'express';
import { conactMiddleware } from '../middlewares/contact.middleware.js';
import { ContactController } from '../controllers/contact.controller.js';

const router = express.Router();

const contactPutLimiter = conactMiddleware.ContactPutLimiter;
router.post('/message', conactMiddleware.ContactPostLimiter, ContactController.addContactMessage);
router.put('/message', contactPutLimiter, ContactController.updateContactMessages);
router.delete('/message', ContactController.deleteContactMessages);

router.post('/send-contact-msg-copy-email', ContactController.sendContactMsgCopyEmail);

export default router;
