const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Otp = require("../models/otp"); // your Mongoose schema

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = generateOTP();
  console.log("Generated OTP:", otp);

  try {
    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Growvest OTP" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Growvest OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    });

    // ✅ Save or update the OTP in MongoDB
    await Otp.findOneAndUpdate(
      { email },
      { email, otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

module.exports = router;