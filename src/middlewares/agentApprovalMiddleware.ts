// src/middlewares/agentApprovalMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { User } from "../modules/user/user.model";

export const checkAgentApproval = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user.userId);
  if (!user || user.role !== "agent" || !user.isApproved) {
    return res
      .status(403)
      .json({ error: "Agent not approved or unauthorized" });
  }
  next();
};
