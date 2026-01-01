import express from "express";
import {
  createTransaction,
  getTransactions,
  getStats,
  updateTransactionStatus,
  transactionSchema,
} from "../controllers/transaction.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  startMockGenerator,
  stopMockGenerator,
  getGeneratorStatus,
} from "../utils/mockGenerator.js";

const router = express.Router();

// Transaction CRUD endpoints
router.post("/", authenticate, validate(transactionSchema), createTransaction);
router.get("/", authenticate, getTransactions);
router.get("/stats", authenticate, getStats);
router.patch(
  "/:id/status",
  authenticate,
  authorize("admin", "analyst"),
  updateTransactionStatus
);

// Mock generator endpoints (admin only)
router.post(
  "/generator/start",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      const interval = req.body.interval || 3000; // Default 3 seconds
      const result = await startMockGenerator(interval);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/generator/stop", authenticate, authorize("admin"), (req, res) => {
  try {
    const result = stopMockGenerator();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/generator/status", authenticate, (req, res) => {
  try {
    const status = getGeneratorStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
