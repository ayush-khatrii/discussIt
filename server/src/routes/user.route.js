import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import userController from "../controllers/user.controller.js"
import { uploadAvatar } from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile", verifyToken, userController.getProfile);
router.get("/user-profile/:userId", userController.getUserProfile);
router.put("/update/:userId", verifyToken, uploadAvatar, userController.updateProfile);
router.delete("/delete/:userId", verifyToken, userController.deleteProfile);

// Friend Requests route
router.post("/send-request", verifyToken, userController.sendFriendRequest);
router.put("/accept-request", verifyToken, userController.acceptFriendRequest);
router.get("/all-friend-requests", verifyToken, userController.getAllFriendRequests);
router.get("/search", verifyToken, userController.searchUser);

export default router;
