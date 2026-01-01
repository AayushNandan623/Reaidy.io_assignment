import { GoogleGenAI } from "@google/genai";

class GeminiService {
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
  }
  async analyzeFraud(transaction) {
    try {
      const prompt = `Analyze this transaction for fraud risk:
      Amount: $${transaction.amount}
      Merchant: ${transaction.merchantName}
      Location: ${transaction.location?.country || "Unknown"}
      IP: ${transaction.ipAddress || "Unknown"}
      
      Provide:
      1. Risk score (0-100)
      2. Risk level (low/medium/high)
      3. Brief analysis (max 100 words)
      
      Format: {"riskScore": number, "riskLevel": "low/medium/high", "analysis": "text"}`;

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const result = JSON.parse(text);

      return {
        riskScore: Math.min(100, Math.max(0, result.riskScore)),
        riskLevel: result.riskLevel,
        analysis: result.analysis,
      };
    } catch (error) {
      console.error("Gemini API error:", error.message);
      return this.fallbackAnalysis(transaction);
    }
  }

  fallbackAnalysis(transaction) {
    let score = 0;
    if (transaction.amount > 5000) score += 30;
    if (transaction.amount > 10000) score += 20;
    if (!transaction.ipAddress) score += 15;
    if (!transaction.location?.country) score += 10;

    score = Math.min(100, score + Math.floor(Math.random() * 15));

    return {
      riskScore: score,
      riskLevel: score < 30 ? "low" : score < 70 ? "medium" : "high",
      analysis:
        "Automated analysis based on transaction patterns and thresholds.",
    };
  }
}

export default new GeminiService();
