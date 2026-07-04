const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const {
  processPayment,
<<<<<<< HEAD
  sendStripApi,
  // paymentDetails,
} = require("../controllers/paymentController");

router.route("/payment/process").post(authController.protect, processPayment);
router.route("/stripeapi").get(authController.protect, sendStripApi);
// router.route("/retrieveUser").get(paymentDetails);
=======
  sendStripeApi,
} = require("../controllers/paymentController");

router.route("/payment/process").post(authController.protect, processPayment);
router.route("/stripeapi").get(authController.protect, sendStripeApi);

>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897

module.exports = router;
