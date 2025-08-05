// src/modules/admin/admin.controller.ts

import { Request, Response } from "express";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";
import { Transaction } from "../transaction/transaction.model";

// ✅ GET /admin/users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json({ users });
};

// ✅ GET /admin/wallets
export const getAllWallets = async (req: Request, res: Response) => {
  const wallets = await Wallet.find().populate("userId", "email role");
  res.json({ wallets });
};

// ✅ GET /admin/transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  const transactions = await Transaction.find()
    .populate("userId", "email")
    .populate("toUser", "email")
    .sort({ createdAt: -1 });
  res.json({ transactions });
};

// ✅ PATCH /admin/wallets/block/:walletId
export const blockWallet = async (req: Request, res: Response) => {
  const wallet = await Wallet.findByIdAndUpdate(
    req.params.walletId,
    { isBlocked: true },
    { new: true }
  );
  if (!wallet) return res.status(404).json({ error: "Wallet not found" });
  res.json({ message: "Wallet blocked", wallet });
};

// ✅ PATCH /admin/wallets/unblock/:walletId
export const unblockWallet = async (req: Request, res: Response) => {
  const wallet = await Wallet.findByIdAndUpdate(
    req.params.walletId,
    { isBlocked: false },
    { new: true }
  );
  if (!wallet) return res.status(404).json({ error: "Wallet not found" });
  res.json({ message: "Wallet unblocked", wallet });
};

// ✅ GET /admin/agents
export const getAllAgents = async (req: Request, res: Response) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.json({ agents });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch agents" });
  }
};

// ✅ PATCH /admin/agents/approve/:agentId
export const approveAgent = async (req: Request, res: Response) => {
  const agent = await User.findOneAndUpdate(
    { _id: req.params.agentId, role: "agent" },
    { isApproved: true },
    { new: true }
  );

  if (!agent) return res.status(404).json({ error: "Agent not found" });
  res.json({ message: "Agent approved", agent });
};

// ✅ PATCH /admin/agents/suspend/:agentId
export const suspendAgent = async (req: Request, res: Response) => {
  const agent = await User.findOneAndUpdate(
    { _id: req.params.agentId, role: "agent" },
    { isApproved: false },
    { new: true }
  );

  if (!agent) return res.status(404).json({ error: "Agent not found" });
  res.json({ message: "Agent suspended", agent });
};
