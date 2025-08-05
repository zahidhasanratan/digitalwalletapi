// src/modules/agent/agent.controller.ts

import { Request, Response } from "express";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";
import { Transaction } from "../transaction/transaction.model";

// ✅ POST /api/agent/cash-in
export const cashIn = async (req: any, res: Response) => {
  try {
    const { userEmail, amount } = req.body;

    if (!userEmail || !amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid user email or amount" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    const wallet = await Wallet.findOne({ userId: user._id });
    if (!wallet || wallet.isBlocked)
      return res.status(403).json({ error: "Wallet blocked or not found" });

    wallet.balance += amount;
    await wallet.save();

    await Transaction.create({
      userId: user._id,
      fromUser: req.user.userId,
      type: "cash-in",
      amount,
      description: `Cash-in by agent (${req.user.userId})`,
    });

    res.status(200).json({
      message: "Cash-in successful",
      userEmail,
      balance: wallet.balance,
    });
  } catch (err) {
    console.error("Cash-in Error:", err);
    res.status(500).json({ error: "Server error during cash-in" });
  }
};

// ✅ POST /api/agent/cash-out
export const cashOut = async (req: any, res: Response) => {
  try {
    const { userEmail, amount } = req.body;

    if (!userEmail || !amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid user email or amount" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    const wallet = await Wallet.findOne({ userId: user._id });
    if (!wallet || wallet.isBlocked)
      return res.status(403).json({ error: "Wallet blocked or not found" });

    if (wallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    wallet.balance -= amount;
    await wallet.save();

    await Transaction.create({
      userId: user._id,
      fromUser: req.user.userId,
      type: "cash-out",
      amount,
      description: `Cash-out by agent (${req.user.userId})`,
    });

    res.status(200).json({
      message: "Cash-out successful",
      userEmail,
      balance: wallet.balance,
    });
  } catch (err) {
    console.error("Cash-out Error:", err);
    res.status(500).json({ error: "Server error during cash-out" });
  }
};
