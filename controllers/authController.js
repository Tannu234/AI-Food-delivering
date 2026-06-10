//import req packages,files
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const cloudinary = require('../cloudinary');

//singup
exports.signup = catchAsyncErrors(async (req, res, next) =>{
    const {name, email, passwordConfirm, phoneNumber} = req.body;

    let avatar=[]
    //avatear not provided
    if(!req.body.avatar || req.body.avatar === "/images/images.png"){
        avatar = {
            public_id: "default",
            url: "/images/images.png"
        }
    }else{
        const result = await cloudinary.uploadsteam(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
        avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.create({
        name,
        email,
        passwordConfirm,
        phoneNumber,
        avatar
    });
sendToken(user, 200, res);


});

     