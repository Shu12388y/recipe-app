import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "auth",
  },
  platform: {
    type: String,
    required: true,
  },
  contentmetainfo: {
    type: String,
    required: true,
  },
  totalPostsDaily: {
    type: Number,
    required: true,
    default: 5,
  },
  generateContent: {
    type: String,
    requried: true,
    default: "daily",
  },
});

export const userInfo =
  mongoose.models.userinfo || mongoose.model("userinfo", UserInfoSchema);
