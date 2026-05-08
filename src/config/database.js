const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sourav-ghosh:rDO7ta8cTBKgm9CT@namastenodejs.hshd5dk.mongodb.net/devTinderDB",
  );
};

module.exports = connectDB;
