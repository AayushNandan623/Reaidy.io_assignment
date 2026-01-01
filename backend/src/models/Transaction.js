import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  merchantName: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["CARD", "UPI", "NETBANKING", "WALLET", "CASH", null],
    default: null,
  },
  category: String,
  ipAddress: String,
  deviceId: String,
  deviceFingerprint: String,
  location: {
    country: String,
    city: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  riskScore: {
    type: Number,
    default: 0,
  },
  riskLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  fraudAnalysis: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "investigating"],
    default: "pending",
  },
});
export default mongoose.model("Transaction", transactionSchema);
