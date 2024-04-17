import express from "express";
import chatController from "../controllers/chat.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadAvatar } from "../middlewares/multer.js";

const router = express.Router();

router.post("/create-group", verifyToken, chatController.createGroupChat);
router.get("/mychats", verifyToken, chatController.getMyChats);
router.delete("/delete/:chatId", verifyToken, chatController.deleteGroupChat);
router.put("/update/:chatId", verifyToken, uploadAvatar, chatController.updateGroupChat);

export default router;
