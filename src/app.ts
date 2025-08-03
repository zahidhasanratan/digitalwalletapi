import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
