import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema({
  cnic: { type: String, unique: true },
  name: String,
  phone: String,
  address: String,
  department: { type: String, required: true },
  purpose: String,
  history: [
    { department: String, status: String, remarks: String, date: { type: Date, default: Date.now } }
  ]
}, { timestamps: true });

export default mongoose.model("Beneficiary", beneficiarySchema);
