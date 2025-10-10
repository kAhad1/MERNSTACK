import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: "Beneficiary" },
  department: String,
  tokenNumber: { type: String, unique: true },
  status: { type: String, default: "In Progress" }
}, { timestamps: true });

export default mongoose.model("Token", tokenSchema);
