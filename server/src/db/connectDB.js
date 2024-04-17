import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// DB URL
const URI = process.env.MONGODB_URI;

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
