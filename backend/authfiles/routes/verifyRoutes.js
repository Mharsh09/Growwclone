const express = require("express");
const router = express.Router();
const Otp = require("../models/otp"); // make sure this path is correct



router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  console.log("VERIFY REQ BODY:", req.body);

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const record = await Otp.findOne({ email });

    console.log("FOUND RECORD:", record);

    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    if (record.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // ✅ Optional: delete OTP after verification
    await Otp.deleteOne({ email });

    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("VERIFY ERROR:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;