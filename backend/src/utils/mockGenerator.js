import Transaction from "../models/Transaction.js";
import fraudService from "../services/fraud.service.js";

const merchants = [
  "Amazon India",
  "Flipkart",
  "Myntra",
  "Swiggy",
  "Zomato",
  "BigBasket",
  "Paytm Mall",
  "Croma",
  "Reliance Digital",
  "BookMyShow",
  "MakeMyTrip",
  "Uber",
  "Ola",
  "PhonePe Store",
];

const cities = [
  { city: "Mumbai", country: "IN" },
  { city: "Delhi", country: "IN" },
  { city: "Bangalore", country: "IN" },
  { city: "Hyderabad", country: "IN" },
  { city: "Chennai", country: "IN" },
  { city: "Pune", country: "IN" },
  { city: "New York", country: "US" },
  { city: "Singapore", country: "SG" },
  { city: "London", country: "GB" },
  { city: "Dubai", country: "AE" },
];

const paymentMethods = ["CARD", "UPI", "NETBANKING", "WALLET"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateIPAddress() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

export function generateMockTransaction() {
  // 15% chance of high-risk transaction
  const highRisk = Math.random() > 0.85;

  const location = randomItem(cities);

  return {
    transactionId: `TXN_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)
      .toUpperCase()}`,
    userId: `user_${Math.floor(Math.random() * 1000)}`,
    amount: highRisk
      ? Math.floor(Math.random() * 50000) + 10000 // ₹10,000 - ₹60,000
      : Math.floor(Math.random() * 5000) + 100, // ₹100 - ₹5,100
    currency: "INR",
    merchantName: randomItem(merchants),
    paymentMethod: randomItem(paymentMethods),
    location: {
      city: location.city,
      country: location.country,
    },
    ipAddress: generateIPAddress(),
    deviceId: `device_${Math.random().toString(36).slice(2)}`,
    deviceFingerprint: Math.random().toString(36).slice(2),
  };
}

// In-memory generator state
let generatorInterval = null;
let isGenerating = false;
let generatedCount = 0;

export async function startMockGenerator(intervalMs = 3000) {
  if (isGenerating) {
    console.log("Generator already running");
    return { status: "already_running", count: generatedCount };
  }

  isGenerating = true;
  console.log(`Starting mock transaction generator (every ${intervalMs}ms)`);

  generatorInterval = setInterval(async () => {
    try {
      const mockTx = generateMockTransaction();
      await fraudService.analyzeTransaction(mockTx);
      generatedCount++;
      console.log(
        `Generated transaction #${generatedCount}: ${mockTx.transactionId} - ₹${mockTx.amount}`
      );
    } catch (error) {
      console.error("Generator error:", error.message);
    }
  }, intervalMs);

  return { status: "started", interval: intervalMs };
}

export function stopMockGenerator() {
  if (!isGenerating) {
    return { status: "not_running" };
  }

  clearInterval(generatorInterval);
  generatorInterval = null;
  isGenerating = false;

  const count = generatedCount;
  generatedCount = 0;

  console.log(
    `Stopped mock transaction generator. Generated ${count} transactions.`
  );
  return { status: "stopped", totalGenerated: count };
}

export function getGeneratorStatus() {
  return {
    isRunning: isGenerating,
    totalGenerated: generatedCount,
  };
}
