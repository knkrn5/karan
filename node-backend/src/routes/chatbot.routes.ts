import { Router } from "express";
import { ChatbotController } from "../controllers/chatbot.controller.js";
import { isAccessTokenValid } from "../middlewares/auth.middleware.js";
import { cbMsgLimiter } from "../middlewares/chatbot.middleware.js";


const router = Router();


router.post('/send-msg-to-chatbot', cbMsgLimiter, ChatbotController.getChatbotResponse);
router.get('/get-msgs-from-db', isAccessTokenValid, ChatbotController.getChatbotMsgsFromDb);

export default router;