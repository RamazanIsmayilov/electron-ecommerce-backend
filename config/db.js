const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDb connect is successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDb;
