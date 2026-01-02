import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function RiskChart() {
  const { transactions } = useSelector((state) => state.transactions);
  const { darkMode } = useSelector((state) => state.theme);

  const last20 = transactions.slice(0, 20).reverse();

  const data = {
    labels: last20.map((_, i) => i + 1),
    datasets: [
      {
        label: "Risk Score",
        data: last20.map((tx) => tx.riskScore),
        borderColor: darkMode ? "#60a5fa" : "#3b82f6",
        backgroundColor: darkMode
          ? "rgba(96, 165, 250, 0.1)"
          : "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: darkMode ? "#9ca3af" : "#6b7280" },
        grid: { color: darkMode ? "#374151" : "#e5e7eb" },
      },
      x: {
        ticks: { color: darkMode ? "#9ca3af" : "#6b7280" },
        grid: { color: darkMode ? "#374151" : "#e5e7eb" },
      },
    },
  };

  return (
    <div
      className={`p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Risk Score Trend
      </h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
