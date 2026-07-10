const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllRestaurants,
  createRestaurant,
  getRestaurant,
  deleteRestaurant,
  createOrUpdateReview,
  getReviews,
  deleteReview,
} = require("../controllers/restaurantController");

const { protect } = require("../controllers/authController");
const { authorizeRoles } = require("../middlewares/authorizeRoles");

const menuRoutes = require("./menu");

router
  .route("/")
  .get(getAllRestaurants)
  .post(protect, authorizeRoles("admin"), createRestaurant);

router
  .route("/:storeId")
  .get(getRestaurant)
  .delete(protect, authorizeRoles("admin"), deleteRestaurant);

// Reviews
router
  .route("/:storeId/reviews")
  .get(getReviews)
  .put(protect, createOrUpdateReview);

router.route("/:storeId/reviews/:reviewId").delete(protect, deleteReview);

router.use("/:storeId/menus", menuRoutes);

module.exports = router;