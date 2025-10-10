import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Admin", "Receptionist", "Staff"], default: "Staff" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
