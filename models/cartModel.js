const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"User"
    
    },
    restuarant:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"Restaurant"
    },
    items:[
        {
            foodItems:{
                type:mongoose.Schema.Type.ObjectId,
                ref:"FoodItem"
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
                min:1
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart;