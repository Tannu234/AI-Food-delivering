const mongoose = require("mongoose");

const connectDatabase =  () => {

   mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`MongoDB Connected with HOST: ${conn.connection.host}`);
   })
  }
  
  module.exports = connectDatabase;