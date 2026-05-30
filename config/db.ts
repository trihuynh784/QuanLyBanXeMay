import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB connected!");
  } catch (err: any) {
    console.error(err.message);
    console.log("MongoDB connection failed!");
    process.exit(1);
  }
};
