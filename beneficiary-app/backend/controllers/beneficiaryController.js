import Beneficiary from "../models/Beneficiary.js";
import Token from "../models/Token.js";

export const registerBeneficiary = async (req, res) => {
  try {
    const { cnic, name, phone, address, purpose, department } = req.body;

    let beneficiary = await Beneficiary.findOne({ cnic });
    if (!beneficiary) {
      beneficiary = new Beneficiary({ cnic, name, phone, address, department, purpose });
      await beneficiary.save();
    }

    const token = new Token({
      beneficiaryId: beneficiary._id,
      department,
      tokenNumber: "T-" + Date.now()
    });
    await token.save();

    res.json({ msg: "Beneficiary registered", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchBeneficiary = async (req, res) => {
  try {
    const { cnic } = req.query;

    // ✅ 1. Find beneficiary by CNIC
    const beneficiary = await Beneficiary.findOne({ cnic });

    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    // ✅ 2. Find their token by beneficiaryId
    const token = await Token.findOne({ beneficiaryId: beneficiary._id });

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    // ✅ 3. Combine both for frontend
    res.json({
      ...beneficiary.toObject(),
      tokenId: token._id,
      tokenNumber: token.tokenNumber,
      status: token.status,
      department: token.department || beneficiary.department,
    });
  } catch (err) {
    console.error("❌ Error searching beneficiary:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params; // token ID
    const { status } = req.body;

    console.log("🟢 Updating token:", id, "→", status);

    const updatedToken = await Token.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedToken) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.status(200).json({
      message: "Status updated successfully",
      token: updatedToken,
    });
  } catch (err) {
    console.error("❌ Error updating token:", err);
    res.status(500).json({ message: "Failed to update token status" });
  }
};
