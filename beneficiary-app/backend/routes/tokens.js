import express from "express";
import { getToken, updateTokenStatus } from "../controllers/tokenController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/:tokenNumber", authMiddleware(["Staff", "Admin"]), getToken);
router.put("/:tokenNumber", authMiddleware(["Staff", "Admin"]), updateTokenStatus);

export default router;
