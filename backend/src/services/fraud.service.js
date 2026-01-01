import Transaction from "../models/Transaction.js";
import geminiService from "./gemini.service.js";
import socketService from "./socket.service.js";

class FraudService {
  async analyzeTransaction(txData) {
    const { riskScore, riskLevel, analysis } = await geminiService.analyzeFraud(
      txData
    );

    const transaction = new Transaction({
      ...txData,
      riskScore,
      riskLevel,
      fraudAnalysis: analysis,
      status: riskLevel === "high" ? "investigating" : "pending",
    });

    await transaction.save();

    socketService.emitNewTransaction(transaction);

    if (riskLevel === "high") {
      socketService.emitHighRiskAlert(transaction);
    }

    return transaction;
  }

  async getTransactions(filters = {}) {
    const query = {};

    if (filters.riskLevel) query.riskLevel = filters.riskLevel;
    if (filters.status) query.status = filters.status;
    if (filters.startDate)
      query.timestamp = { $gte: new Date(filters.startDate) };

    return await Transaction.find(query).sort({ timestamp: -1 }).limit(100);
  }

  async getStats() {
    const total = await Transaction.countDocuments();
    const highRisk = await Transaction.countDocuments({ riskLevel: "high" });

    const avgScore = await Transaction.aggregate([
      { $group: { _id: null, avgRisk: { $avg: "$riskScore" } } },
    ]);

    return {
      totalTransactions: total,
      highRiskTransactions: highRisk,
      avgRiskScore: avgScore[0]?.avgRisk || 0,
    };
  }
}

export default new FraudService();
