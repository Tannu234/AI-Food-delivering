const Restaurant = require("../models/restaurant");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Restaurant.find(), req.query)
        .search()
        .sort();

    const restaurants = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: restaurants.length,
        restaurants: restaurants,
    });
});

// Create restaurant
exports.createRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
        success: true,
        data: restaurant,
    });
});

// Get restaurant by ID
exports.getRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.storeId);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
        success: true,
        data: restaurant,
    });
});

// Delete restaurant
exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.storeId);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Restaurant deleted successfully",
    });
});

// Create or update a review — logged-in user only, one review per user per restaurant
exports.createOrUpdateReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return next(new ErrorHandler("Please provide a rating and a comment", 400));
    }

    const restaurant = await Restaurant.findById(req.params.storeId);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        Comment: comment,
        createdAt: Date.now(),
    };

    const existingReview = restaurant.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
        existingReview.rating = review.rating;
        existingReview.Comment = review.Comment;
        existingReview.createdAt = review.createdAt;
    } else {
        restaurant.reviews.push(review);
    }

    restaurant.numOfReviews = restaurant.reviews.length;
    restaurant.ratings =
        restaurant.reviews.reduce((acc, r) => acc + r.rating, 0) /
        restaurant.reviews.length;

    await restaurant.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: existingReview ? "Review updated" : "Review submitted",
        reviews: restaurant.reviews,
        ratings: restaurant.ratings,
        numOfReviews: restaurant.numOfReviews,
    });
});

// Get all reviews for a restaurant
exports.getReviews = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.storeId);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: restaurant.reviews,
        ratings: restaurant.ratings,
        numOfReviews: restaurant.numOfReviews,
    });
});

// Delete own review (or admin can delete any)
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.storeId);

    if (!restaurant) {
        return next(new ErrorHandler("Restaurant not found", 404));
    }

    const review = restaurant.reviews.find(
        (r) => r._id.toString() === req.params.reviewId
    );

    if (!review) {
        return next(new ErrorHandler("Review not found", 404));
    }

    if (
        review.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ) {
        return next(new ErrorHandler("Not authorized to delete this review", 403));
    }

    restaurant.reviews = restaurant.reviews.filter(
        (r) => r._id.toString() !== req.params.reviewId
    );

    restaurant.numOfReviews = restaurant.reviews.length;
    restaurant.ratings =
        restaurant.reviews.length > 0
            ? restaurant.reviews.reduce((acc, r) => acc + r.rating, 0) /
              restaurant.reviews.length
            : 0;

    await restaurant.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review deleted",
        reviews: restaurant.reviews,
        ratings: restaurant.ratings,
        numOfReviews: restaurant.numOfReviews,
    });
});