const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const restaurant = require("./routes/restaurant");


console.log("authRoutes:", authRoutes);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);  // ✅ auth
app.use("/api/v1/eats/stores", restaurant)
module.exports = app;