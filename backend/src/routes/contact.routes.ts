import express from "express";
import { contactInfo, updateContactMessage, deleteContactMessage } from "../controllers/contact.controller.ts";
import { contactPostLimiter, contactPutLimiter } from "../middlewares/contact.middleware.ts";

const router = express.Router();

router.post("/message", contactPostLimiter, contactInfo);
router.put("/message", contactPutLimiter, updateContactMessage);
router.delete("/message", deleteContactMessage);


export default router;

