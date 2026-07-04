const mongoose = require("mongoose");
<<<<<<< HEAD
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: false,
  },
  items: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1, min: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
=======

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
>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897
