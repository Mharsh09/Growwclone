const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const verifyRoutes = require("./routes/verifyRoutes");

dotenv.config();

const otpRoutes = require("./routes/otpRoutes");
const connectDB = require("./config/db");

// Middleware

app.use(cors());
app.use(express.json());
app.use("/api", otpRoutes);
app.use("/api", verifyRoutes);

connectDB();


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});