import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: Number, default: 50 },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Wallet = mongoose.model("Wallet", walletSchema);
