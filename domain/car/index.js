import mongoose from "mongoose";
import NotFoundError from "./errors/not-found";

const { Schema } = mongoose;

const options = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};

const carSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  options
);

export default carSchema;
export { NotFoundError };
