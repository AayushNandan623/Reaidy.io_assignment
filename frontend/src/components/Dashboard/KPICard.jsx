import { useSelector } from "react-redux";
import { TrendingUp, AlertTriangle, Activity } from "lucide-react";

export default function KPICard() {
  const { stats } = useSelector((state) => state.transactions);
  const { darkMode } = useSelector((state) => state.theme);

  const cards = [
    {
      title: "Total Transactions",
      value: stats.totalTransactions.toLocaleString(),
      icon: Activity,
      color: "blue",
    },
    {
      title: "High Risk Transactions",
      value: stats.highRiskTransactions.toLocaleString(),
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "Avg Risk Score",
      value: stats.avgRiskScore.toFixed(1),
      icon: TrendingUp,
      color: "yellow",
    },
  ];

  const colorClasses = {
    blue: darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-600",
    red: darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-600",
    yellow: darkMode
      ? "bg-yellow-900 text-yellow-300"
      : "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`p-6 rounded-xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {card.title}
              </p>
              <p
                className={`text-3xl font-bold mt-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[card.color]}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
