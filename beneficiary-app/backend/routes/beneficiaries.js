import express from "express";
import {
  registerBeneficiary,
  searchBeneficiary,
  updateStatus,
} from "../controllers/beneficiaryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", authMiddleware(["Receptionist", "Admin"]), registerBeneficiary);
router.get("/search", authMiddleware(["Admin", "Receptionist", "Staff"]), searchBeneficiary);
router.put("/update-status/:id", authMiddleware(["Staff", "Admin"]), updateStatus);


export default router;
