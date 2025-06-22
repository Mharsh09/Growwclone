const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const otpRoutes = require("./routes/otpRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const stockRoutes = require("./routes/stockspath");
const connectDB = require("./config/db");

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", otpRoutes);
app.use("/api", verifyRoutes);
app.use("/api", stockRoutes);

// DB Connection
connectDB();

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});