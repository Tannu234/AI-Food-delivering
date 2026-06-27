// ✅ Pehle yeh sab imports
const User = require('../models/User');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/sendToken');
const cloudinary = require('cloudinary').v2;

// ✅ Phir controller
exports.signupController = catchAsyncErrors(async (req, res, next) => {
    console.log("=== NEW CODE CHAL RAHA HAI ===");
    console.log(req.body);

    const { name, email, password, passwordConfirm, phoneNumber } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Please enter your password" });
    }

    if (password !== passwordConfirm) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    let avatar = {};

    if (!req.body.avatar || req.body.avatar === "/images/images.png") {
        avatar = {
            public_id: "default",
            url: "/images/images.png"
        };
    } else {
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: "avatars"
        });
        avatar = {
            public_id: result.public_id,
            url: result.secure_url
        };
    }

    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        avatar
    });

    sendToken(user, 200, res);
});
//login

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new Error("Please enter email and password", 400));
    }

   const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new Error("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password, user.password);

    if (!isPasswordMatched){
        return next(new errorHandler("invalid email or password",401))

    }
    sendToken(user, 200, res);
    
    const isMatch = await user.comparePassword(req.body.password);
});