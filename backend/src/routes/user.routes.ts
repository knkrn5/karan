import { Router } from "express";
import { registerUser, loginUser, getProfile, logoutUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyToken, getProfile);

router.post("/logout", logoutUser);

export default router;
