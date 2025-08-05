import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw", "send", "cash-in", "cash-out"], // ✅ updated enum
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // used for send, cash-in, and cash-out
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // ✅ Automatically manage createdAt and updatedAt
  }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
