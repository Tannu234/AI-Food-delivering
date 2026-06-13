
const express = require("express");
const router = express.Router();

const { signupController } = require("../controllers/authController");

router.post("/signup", signupController);

module.exports = router;