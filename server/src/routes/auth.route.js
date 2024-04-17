import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.handleSignUp);
router.post("/login", authController.handleSignIn);
router.post("/logout", authController.handleLogout);

export default router;
