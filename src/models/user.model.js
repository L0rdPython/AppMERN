import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: "string", trim: true, required: true },
    email: { type: "string", trim: true, unique: true, required: true },
    password: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
