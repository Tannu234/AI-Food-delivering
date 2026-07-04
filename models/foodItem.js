<<<<<<< HEAD
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter FoodItem name"],
    trim: true, //to remove whitespace
    maxLength: [100, "FoodItem name cannot exceed 100 characters "],
  },
  price: {
    type: Number,
    required: [true, "Please enter FoodItem price"],
    maxLength: [5, "FoodItem name cannot exceed 5 characters "],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter FoodItem description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  //images are array of an object and each object contains two things, 1. id of that img and 2. url of that img.
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
  stock: {
    type: Number,
    required: [true, "Please enter foodItem stock"],
    maxLength: [5, "foodItems can't exceed 5 characters"],
    default: 0,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      Comment: {
        type: String,
        required: true,
      },
    },
  ],
  ///////////ai///////////////////////
    aiDescription: {
    type: String,
    default: "",
  },
  aiTags: {
    type: [String],
    default: [],
  },
  aiAllergens: {
    type: [String],
    default: [],
  },

  aiServes: {
  type: String,
  default: ""
  },

  aiBestFor: {
  type: [String],
  default: []
  },
   ///////////ai///////////////////////
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FoodItem", foodSchema);
=======
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
>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897
