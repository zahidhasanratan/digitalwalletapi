import { Request, Response } from "express";
import { Transaction } from "./transaction.model";

export const getMyTransactions = async (req: any, res: Response) => {
  const userId = req.user.userId;

  const transactions = await Transaction.find({ userId })
    .sort({ createdAt: -1 })
    .populate("toUser", "email")
    .lean();

  res.json({ transactions });
};
