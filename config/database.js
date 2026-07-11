const mongoose = require("mongoose");


const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      serverSelectionTimeoutMS: 15000, // fail fast (15s) instead of hanging
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST:${con.connection.host}`
      );
    })
    .catch((err) => {
      // Without this, a bad/unreachable URI fails silently and every
      // request that touches the DB hangs forever waiting on a
      // connection that will never happen.
      console.log(`ERROR connecting to MongoDB: ${err.message}`);
    });
};
module.exports = connectDatabase;