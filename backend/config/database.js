
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI is missing from .env");
  }

  await mongoose.connect(mongoURI);
  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
