// src/middlewares/authorizeRoles.ts

import { Request, Response, NextFunction } from "express";

/**
 * Middleware to allow only specific user roles (admin, agent, etc.)
 * @param roles List of allowed roles (e.g., ['admin'], ['agent', 'admin'])
 */
export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied: unauthorized role" });
    }
    next();
  };
};
