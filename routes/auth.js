
const express = require("express");
const router = express.Router();
const { login } = require('../controllers/authController');
const { signupController } = require("../controllers/authController");

router.post("/signup", signupController);
router.post("/login", login);

module.exports = router;