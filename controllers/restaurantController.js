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

