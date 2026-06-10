const express = require("express");
const app = express();

const auth = require("./routes/auth");

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", auth);

module.exports = app;