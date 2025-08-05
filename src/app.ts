// src/app.ts

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// ✅ Route imports
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import walletRoutes from "./modules/wallet/wallet.route";
import agentRoutes from "./modules/agent/agent.route";
import transactionRoutes from "./modules/transaction/transaction.route";
import adminRoutes from "./modules/admin/admin.route";

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ✅ Mount API routes
app.use("/api/auth", authRoutes); // Register, Login
app.use("/api/users", userRoutes); // User Profile
app.use("/api/wallet", walletRoutes); // Deposit, Withdraw, Send Money, Balance
app.use("/api/transactions", transactionRoutes); // User Transactions
app.use("/api/agent", agentRoutes); // Agent: Cash-in, Cash-out
app.use("/api/admin", adminRoutes); // Admin: Manage users, wallets, transactions

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

export default app;
