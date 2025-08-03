import { Request, Response } from "express";
import { Wallet } from "./wallet.model";
import { User } from "../user/user.model";
import { Transaction } from "../transaction/transaction.model";

// GET /wallet/balance
export const getBalance = async (req: any, res: Response) => {
  const wallet = await Wallet.findOne({ userId: req.user.userId });
  if (!wallet) return res.status(404).json({ error: "Wallet not found" });
  res.json({ balance: wallet.balance });
};

// POST /wallet/deposit
export const deposit = async (req: any, res: Response) => {
  const { amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }

  const wallet = await Wallet.findOne({ userId: req.user.userId });
  if (!wallet || wallet.isBlocked)
    return res.status(403).json({ error: "Wallet is blocked or not found" });

  wallet.balance += amount;
  await wallet.save();

  // ✅ Log transaction
  await Transaction.create({
    userId: req.user.userId,
    type: "deposit",
    amount,
    description: "Money deposited",
  });

  res.json({ message: "Deposit successful", balance: wallet.balance });
};

// POST /wallet/withdraw
export const withdraw = async (req: any, res: Response) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ userId: req.user.userId });
  if (!wallet || wallet.isBlocked)
    return res.status(403).json({ error: "Wallet is blocked or not found" });

  if (wallet.balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  wallet.balance -= amount;
  await wallet.save();

  // ✅ Log transaction
  await Transaction.create({
    userId: req.user.userId,
    type: "withdraw",
    amount,
    description: "Money withdrawn",
  });

  res.json({ message: "Withdraw successful", balance: wallet.balance });
};

// POST /wallet/send
export const sendMoney = async (req: any, res: Response) => {
  const { recipientEmail, amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }

  const senderWallet = await Wallet.findOne({ userId: req.user.userId });
  const recipient = await User.findOne({ email: recipientEmail });
  if (!recipient) return res.status(404).json({ error: "Recipient not found" });

  const recipientWallet = await Wallet.findOne({ userId: recipient._id });
  if (
    !senderWallet ||
    !recipientWallet ||
    senderWallet.isBlocked ||
    recipientWallet.isBlocked
  ) {
    return res
      .status(403)
      .json({ error: "One or both wallets are blocked or not found" });
  }

  if (senderWallet.balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  // Simulate atomic transfer
  senderWallet.balance -= amount;
  recipientWallet.balance += amount;

  await senderWallet.save();
  await recipientWallet.save();

  // ✅ Log transaction
  await Transaction.create({
    userId: req.user.userId,
    type: "send",
    amount,
    toUser: recipient._id,
    description: `Sent to ${recipient.email}`,
  });

  res.json({
    message: "Transfer successful",
    senderBalance: senderWallet.balance,
  });
};
