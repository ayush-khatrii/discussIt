import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import userController from "../controllers/user.controller.js"

import { uploadAvatar } from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile", verifyToken, userController.getProfile);
router.get("/", verifyToken, userController.getAllUsers);
router.put("/update/:userId", verifyToken, uploadAvatar, userController.updateProfile);
router.delete("/delete/:userId", verifyToken, userController.deleteProfile);

export default router;
