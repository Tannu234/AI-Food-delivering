<<<<<<< HEAD
const app = require("./app");
const connectDatabase = require("./config/database");

// const dotenv = require("dotenv");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const { setDriver } = require("mongoose");

//Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

//setting up config file
dotenv.config({ path: "./config/config.env" });

//connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
=======
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const app = require('./app');
const connectDatabase = require('./config/database');

connectDatabase();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897
