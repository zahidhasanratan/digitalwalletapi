import express from "express";
import { authenticateJWT } from "../../middlewares/authMiddleware";

const router = express.Router();

/**
 * @route   GET /api/users/me
 * @desc    Get current authenticated user's info
 * @access  Protected (JWT)
 */
router.get("/me", authenticateJWT, (req: any, res) => {
  res.json({
    message: "Welcome to your dashboard",
    user: req.user, // contains userId and role from the JWT payload
  });
});

export default router;
