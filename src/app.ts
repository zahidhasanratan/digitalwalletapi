import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

// ✅ Import your auth route
import authRoutes from "./modules/auth/auth.route";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ✅ Mount the /api/auth route
app.use("/api/auth", authRoutes);

// ✅ Optional: health check route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

export default app;
