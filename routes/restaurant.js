const express = require("express");
const router = express.Router();

const {getAllRestaurants,getRestaurant} = require("../controllers/restaurantController");

router.route("/").get(getAllRestaurants);
router.route("/:storedId").get(getRestaurant);




module.exports = router;