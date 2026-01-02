import { useSelector } from "react-redux";
import { AlertTriangle } from "lucide-react";

export default function AlertsPanel() {
  const { transactions } = useSelector((state) => state.transactions);
  const { darkMode } = useSelector((state) => state.theme);

  const highRiskTx = transactions
    .filter((tx) => tx.riskLevel === "high")
    .slice(0, 5);

  return (
    <div
      className={`p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          High Risk Alerts
        </h3>
      </div>

      <div className="space-y-3">
        {highRiskTx.length === 0 ? (
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No high-risk transactions
          </p>
        ) : (
          highRiskTx.map((tx) => (
            <div
              key={tx._id}
              className={`p-3 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-red-50"
              } border ${darkMode ? "border-red-900" : "border-red-200"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {tx.merchantName}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    ${tx.amount.toLocaleString()}
                  </p>
                </div>
                <span className="text-xs font-semibold text-red-500">
                  {tx.riskScore}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
