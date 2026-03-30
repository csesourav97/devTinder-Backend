const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sourav-ghosh:4WjayosXnB0ZiwEv@namastenodejs.hshd5dk.mongodb.net/devTinderDB",
  );
};

module.exports = connectDB;
