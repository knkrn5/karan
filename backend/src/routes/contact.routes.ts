import express from "express";
import { contactInfo, updateContactMessage, deleteContactMessage } from "../controllers/contact.controller.js";
import { contactPostLimiter, contactPutLimiter } from "../middlewares/contact.middleware.js";

const router = express.Router();

router.post("/message", contactPostLimiter, contactInfo);
router.put("/message", contactPutLimiter, updateContactMessage);
router.delete("/message", deleteContactMessage);


export default router;

