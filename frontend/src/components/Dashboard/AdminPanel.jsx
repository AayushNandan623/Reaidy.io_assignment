import { useState, useEffect } from "react";
import { Play, Square, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

export default function AdminPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { darkMode } = useSelector((state) => state.theme);

  // Check initial status on load
  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await api.get("/transactions/generator/status");
      setIsRunning(res.data.isRunning);
    } catch (error) {
      console.error("Failed to fetch generator status");
    }
  };

  const toggleGenerator = async () => {
    setLoading(true);
    try {
      if (isRunning) {
        await api.post("/transactions/generator/stop");
        setIsRunning(false);
      } else {
        // Default to 2 seconds interval
        await api.post("/transactions/generator/start", { interval: 2000 });
        setIsRunning(true);
      }
    } catch (error) {
      console.error("Generator error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg mb-6 border-l-4 border-indigo-500`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              darkMode ? "bg-indigo-900" : "bg-indigo-50"
            }`}
          >
            <Settings className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h3
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Admin Controls
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage AI Traffic Simulation
            </p>
          </div>
        </div>

        <button
          onClick={toggleGenerator}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all ${
            isRunning
              ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 shadow-lg"
              : "bg-green-600 hover:bg-green-700 text-white shadow-green-600/20 shadow-lg"
          } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            "Processing..."
          ) : isRunning ? (
            <>
              <Square className="w-4 h-4 fill-current" /> Stop Simulation
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Start Simulation
            </>
          )}
        </button>
      </div>
    </div>
  );
}
