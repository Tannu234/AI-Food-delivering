const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


// create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Your password must be at least 8 characters long'],
        select: false
    }, 
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords do not match'
        }
    }, 
    phoneNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    role: {
        type: String,
        enum: ['users', 'admin'],
        default: 'users'
    },
    avatar: {
        public_id: String,
        url: String,
        },
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpire: Date
},
{timestamps: true}
);

//hash password 
//pre save=>runs before data is saved
userSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    });
    //pass Comapare

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);

}

//c check whether the user pass was changed after the token
//if yes , the old token will be invalid and user must log in again

userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangeAt) {
        const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
}
    return false;
}

// custom method to generate token 

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id}, 
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRE}

    )
}
module .exports = mongoose.model('User', userSchema);

