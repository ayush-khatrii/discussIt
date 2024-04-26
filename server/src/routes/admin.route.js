import express from "express";
import adminController from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();


router.post("/login", verifyAdmin, adminController.adminLogin);
router.post("/logout", verifyAdmin, adminController.adminLogout);

export default router;
