// src/modules/agent/agent.route.ts

import express from "express";
import { authenticateJWT } from "../../middlewares/authMiddleware";
import { authorizeRoles } from "../../middlewares/authorizeRoles";
import { checkAgentApproval } from "../../middlewares/agentApprovalMiddleware";
import { cashIn, cashOut } from "./agent.controller";

const router = express.Router();

// ✅ Protect routes: only approved agents can proceed
router.use(authenticateJWT, authorizeRoles("agent"), checkAgentApproval);

// ✅ Cash-in and Cash-out endpoints
router.post("/cash-in", cashIn);
router.post("/cash-out", cashOut);

export default router;
