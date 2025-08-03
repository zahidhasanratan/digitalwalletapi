import express from "express";
import { authenticateJWT } from "../../middlewares/authMiddleware";
import { deposit, withdraw, sendMoney, getBalance } from "./wallet.controller";

const router = express.Router();

router.use(authenticateJWT); // All routes below are protected

router.get("/balance", getBalance);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/send", sendMoney);

export default router;
