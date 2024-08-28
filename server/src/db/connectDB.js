import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// DB URL
const URI = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://127.0.0.1:27017/mern-chat-app";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log(`MongoDB connection successfull!`);
  } catch (error) {
    console.error("Unable to connect to MogngoDB: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
