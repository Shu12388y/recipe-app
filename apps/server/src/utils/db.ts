import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("connected");
  } catch (error) {
    throw new Error(error as string);
  }
};
