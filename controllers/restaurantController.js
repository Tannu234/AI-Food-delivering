<<<<<<< HEAD
const Restaurant = require("../models/restaurant");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Restaurant.find(), req.query)
    .search()
    .sort();
  const restaurants = await apiFeatures.query;
  res.status(200).json({
    status: "success",
    count: restaurants.length,
    restaurants: restaurants,
  });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
=======
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const Restaurant = require('../models/restaurant');

//get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Restaurant.find(), req.query)
        .search().sort();
    
    const restaurants = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: restaurants.length,
        restaurant: restaurants
    })
})

//get retaurants by its id
exports.getRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.storedId); 
    if (!restaurant) 
        return next(new ErrorHandler('Restaurant not found', 404));

    res.status(200).json({
        success: true,
        data: restaurant
    });
});

//update

exports.createRestaurant = catchAsyncErrors(async (req, res, next) => {
>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: "success",
    data: restaurant,
  });
});

<<<<<<< HEAD
//Get restaurant by id
exports.getRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.storeId);

  if (!restaurant)
    return next(new ErrorHandler("No Restaurant found with that ID", 404));

  res.status(200).json({
=======
//update

exports.createRestaurant = catchAsyncErrors(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897
    status: "success",
    data: restaurant,
  });
});
<<<<<<< HEAD

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
=======
//update......
exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897
  const restaurant = await Restaurant.findByIdAndDelete(req.params.storeId);

  if (!restaurant)
    return next(new ErrorHandler("No document found with that ID", 404));

  res.status(204).json({
    status: "success",
  });
});
