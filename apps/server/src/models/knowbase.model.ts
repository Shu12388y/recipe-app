import mongoose from "mongoose";

const KnowbaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "auth",
    },
    contentType: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      default: undefined,
    },
  },
  { timestamps: true }
);

export const Knowbase =
  mongoose.models.knowbase || mongoose.model("knowbase", KnowbaseSchema);
