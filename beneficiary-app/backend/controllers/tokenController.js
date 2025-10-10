import Token from "../models/Token.js";

export const getToken = async (req, res) => {
  try {
    const { tokenNumber } = req.params;
    const token = await Token.findOne({ tokenNumber }).populate("beneficiaryId");
    if (!token) return res.status(404).json({ msg: "Token not found" });
    res.json(token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTokenStatus = async (req, res) => {
  try {
    const { tokenNumber } = req.params;
    const { status, remarks } = req.body;

    const token = await Token.findOneAndUpdate(
      { tokenNumber },
      { status },
      { new: true }
    ).populate("beneficiaryId");

    if (!token) return res.status(404).json({ msg: "Token not found" });

    token.beneficiaryId.history.push({
      department: token.department,
      status,
      remarks,
      date: new Date()
    });
    await token.beneficiaryId.save();

    res.json({ msg: "Token updated", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
