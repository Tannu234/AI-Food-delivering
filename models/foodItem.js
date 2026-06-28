const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter foodItem name"],
        trim:true,
        maxlength:[100, "FoodItem name cannot be more than 100 characters"]
    },
    price:{
        type:Number,
        required:[true,"please enter price"],
        maxLength:[5,"FoodItem price cannot more than 5"],
        default:0.0

    },
    description:{
        type:String,
        required:[true,"please enter desc"],
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    menu : {
        type:mongoose.Schema.ObjectId,
        ref:"Menu"
    },
    stock:{
        type:Number,
        required:[true,"please enter foodItem stock"],
        maxLength:[5, "foodItem stocks cannot be more than 5"],
        default:0
    },
    restaurant:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"Restaurant"
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("FoodItem",foodSchema)
module.exports = Menu