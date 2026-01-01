import { z } from "zod";
import fraudService from "../services/fraud.service.js";
import Transaction from "../models/Transaction.js";

// Updated schema to support both formats
export const transactionSchema = z.object({
  transactionId: z.string().optional(),
  userId: z.string(),
  amount: z.number().positive(),
  merchantName: z.string().optional(),
  currency: z.string().optional(),
  paymentMethod: z.string().optional(),
  location: z.union([
    z.string(),
    z.object({
      country: z.string(),
      city: z.string().optional(),
    })
  ]).optional(),
  ipAddress: z.string().optional(),
  deviceFingerprint: z.string().optional(),
  deviceId: z.string().optional(),
});

export const createTransaction = async (req, res) => {
  try {
    // Generate transaction ID if not provided
    const transactionId = req.body.transactionId || 
      `TX${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Handle location format (string or object)
    let locationObj = {};
    if (typeof req.body.location === 'string') {
      locationObj = { country: req.body.location };
    } else if (req.body.location) {
      locationObj = req.body.location;
    }

    const txData = {
      transactionId,
      userId: req.body.userId,
      amount: req.body.amount,
      currency: req.body.currency || "USD",
      merchantName: req.body.merchantName || `Merchant-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      paymentMethod: req.body.paymentMethod,
      location: locationObj,
      ipAddress: req.body.ipAddress,
      deviceFingerprint: req.body.deviceFingerprint,
      deviceId: req.body.deviceId || req.body.deviceFingerprint,
    };

    const transaction = await fraudService.analyzeTransaction(txData);
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({ error: "Failed to process transaction" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await fraudService.getTransactions(req.query);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await fraudService.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const updateTransactionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};
