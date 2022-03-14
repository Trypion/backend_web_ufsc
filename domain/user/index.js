import mongoose from "mongoose";
import NotFoundError from "./errors/not-found";
import EmailNotAvailableError from "./errors/email-not-available";

const { Schema } = mongoose;

const options = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  options
);

export default userSchema;
export { NotFoundError, EmailNotAvailableError };
