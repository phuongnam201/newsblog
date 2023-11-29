import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI_LOCAL);
    console.log("Database is connected...");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
