const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");

console.log("authRoutes:", authRoutes);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);  // ✅ auth
module.exports = app;