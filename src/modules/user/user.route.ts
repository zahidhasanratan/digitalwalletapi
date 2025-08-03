import express from "express";

const router = express.Router();

// Add dummy test route to make it a module
router.get("/", (req, res) => {
  res.send("User route works");
});

export default router;
