import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// ✅ Route imports
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

export default app;
