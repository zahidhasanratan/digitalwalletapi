import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// ✅ Route imports
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import walletRoutes from "./modules/wallet/wallet.route"; // ✅ Added wallet routes

import transactionRoutes from "./modules/transaction/transaction.route";

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ✅ Mount API routes
app.use("/api/auth", authRoutes); // login, register
app.use("/api/users", userRoutes); // /me
app.use("/api/wallet", walletRoutes); // deposit, withdraw, send, balance
app.use("/api/transactions", transactionRoutes);
// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

export default app;
