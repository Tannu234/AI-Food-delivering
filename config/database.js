const mongoose = require("mongoose");

<<<<<<< HEAD
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST:${con.connection.host}`
      );
    });
};
module.exports = connectDatabase;
=======
const connectDatabase =  () => {

   mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`MongoDB Connected with HOST: ${conn.connection.host}`);
   })
  }
  
  module.exports = connectDatabase;
>>>>>>> 10383afece3d9e043e08a3473b80fb0d32bd2897
