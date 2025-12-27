import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "auth",
    },
    platformInfo: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Content =
  mongoose.models.content || mongoose.model("content", ContentSchema);
