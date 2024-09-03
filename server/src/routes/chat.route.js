import express from "express";
import chatController from "../controllers/chat.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { uploadAvatar } from "../middlewares/multer.js";

const router = express.Router();

router.get("/my-chats", verifyToken, chatController.getMyChats);
router.get("/:chatId", verifyToken, chatController.getChatDetails);
router.get("/:chatId/messages", verifyToken, chatController.getMessages);
router.delete("/delete/messages/:messageId", verifyToken, chatController.deleteMessage);

router.post("/create-group", verifyToken, chatController.createGroupChat);

router.put("/update/:chatId", verifyToken, uploadAvatar, chatController.updateGroupChat);
router.put("/add-members/:chatId", verifyToken, uploadAvatar, chatController.addGroupMembers);
router.put("/remove-members/:chatId", verifyToken, uploadAvatar, chatController.removeGroupMembers);

router.delete("/delete/:chatId", verifyToken, chatController.deleteGroupChat);
router.delete("/leave-group/:chatId", verifyToken, uploadAvatar, chatController.leaveGroup);
router.delete("/:chatId/messages", verifyToken, chatController.clearChatMessages);

export default router;
