import express from "express";
import { authenticateJWT } from "../../middlewares/authMiddleware";
import { getMyTransactions } from "./transaction.controller";

const router = express.Router();

router.use(authenticateJWT);
router.get("/me", getMyTransactions);

export default router;
