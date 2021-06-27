import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: "ID is required!",
    },
    url: {
      type: String,
      required: "Url is Required",
    },
    customAlias: {
      type: String,
    },
    expiration: {
      type: Date,
      required: "Expiration time Required",
    },
    visitors: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Url", urlSchema);
