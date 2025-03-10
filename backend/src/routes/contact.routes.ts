import express from "express";
import { contactPostLimiter, contactPutLimiter } from "../middlewares/contact.middleware.js";
import { ContactController } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/message", contactPostLimiter, ContactController.addContactMessage);
router.put("/message", contactPutLimiter, ContactController.updateContactMessages);
router.delete("/message", ContactController.deleteContactMessages);


export default router;

