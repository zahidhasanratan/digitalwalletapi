import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "agent", "admin"], default: "user" },
  isBlocked: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema);
