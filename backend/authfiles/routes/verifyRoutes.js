const express = require("express");
const router = express.Router();
const User = require("../models/User"); 
const Otp = require("../models/otp"); 
const bcrypt = require("bcrypt");


// Verifing OTPs
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

// 🔐 User Login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

  const jwt = require("jsonwebtoken");
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token
  });  
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;