import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    // fullName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
