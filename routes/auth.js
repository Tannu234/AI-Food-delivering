
const express = require("express");
const router = express.Router();
const { login } = require('../controllers/authController');
const { signupController } = require("../controllers/authController");

router.post("/signup", signupController);
router.post("/login", login);

module.exports = router;

//update:
router.post("/forgetPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.route("/logout").get(authController.logout);

router.route("/me").get(authController.protect, authController.getUserProfile);
router
  .route("/password/update")
  .put(authController.protect, authController.updatePassword);
router
  .route("/me/update")
  .put(authController.protect, authController.updateProfile);


module.exports = router;