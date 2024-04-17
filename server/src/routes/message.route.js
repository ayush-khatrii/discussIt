import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/send-message/:id", verifyToken, handleSendMessage);

export default router;
