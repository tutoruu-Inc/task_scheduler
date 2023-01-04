import { model, Schema, Types } from "mongoose";

export default model(
  "Post",
  new Schema({
    endpoint: {
      type: String,
      required: true,
    },
    headers: Object,
    method: {
        type: String,
        enum: ["GET", "POST", "PATCH", "DELETE"],
        default: "POST",
    },
    failed: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    data: Object,
    at: {
      type: Date,
      required: true,
    },
    identifier: {
      unique: true,
      required: true,
      type: String,
    },
  })
);
