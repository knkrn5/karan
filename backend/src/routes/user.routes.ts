import { Router } from "express";
import { registerUser, loginUser, getProfile, logoutUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/user.middleware.js";
import { limiter } from "../utils/limiter.js";

const router = Router();


router.post("/register", limiter, registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyToken, getProfile);

router.post("/logout", logoutUser);

export default router;
