// src/modules/admin/admin.route.ts

import express from "express";
import { authenticateJWT } from "../../middlewares/authMiddleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import {
  getAllUsers,
  getAllWallets,
  getAllTransactions,
  blockWallet,
  unblockWallet,
  getAllAgents,
  approveAgent,
  suspendAgent,
} from "./admin.controller";

const router = express.Router();

// ✅ Apply Auth & Admin Role Middleware
router.use(authenticateJWT, authorizeRoles("admin"));

// ✅ Admin Routes
router.get("/users", getAllUsers);
router.get("/wallets", getAllWallets);
router.get("/transactions", getAllTransactions);
router.get("/agents", getAllAgents);

// ✅ Wallet Block/Unblock
router.patch("/wallets/block/:walletId", blockWallet);
router.patch("/wallets/unblock/:walletId", unblockWallet);

// ✅ Agent Approval/Suspension
router.patch("/agents/approve/:agentId", approveAgent);
router.patch("/agents/suspend/:agentId", suspendAgent);

export default router;
