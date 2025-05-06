import { Router } from "express";
import { ChatbotController } from "../controllers/chatbot.controller.js";


const router = Router();

router.post('/send-msg-to-chatbot', ChatbotController.getChatbotResponse);
router.get('/get-msgs-from-db', ChatbotController.getChatbotMsgsFromDb);

export default router;