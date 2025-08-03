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
      enum: ["deposit", "withdraw", "send"],
      required: true,
    },
    amount: { type: Number, required: true },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // for send
    description: { type: String },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
