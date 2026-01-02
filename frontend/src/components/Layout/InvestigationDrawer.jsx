import { useSelector, useDispatch } from "react-redux";
import { selectTransaction } from "../../store/slices/transactionSlice";
import { X } from "lucide-react";

export default function InvestigationDrawer() {
  const dispatch = useDispatch();
  const { selectedTransaction } = useSelector((state) => state.transactions);
  const { darkMode } = useSelector((state) => state.theme);

  if (!selectedTransaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div
        className={`w-96 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-6 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Transaction Details
          </h2>
          <button
            onClick={() => dispatch(selectTransaction(null))}
            className="p-2 rounded-lg hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Transaction ID
            </label>
            <p
              className={`font-mono ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {selectedTransaction.transactionId}
            </p>
          </div>
          <div>
            <label
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Merchant
            </label>
            <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
              {selectedTransaction.merchantName}
            </p>
          </div>
          <div>
            <label
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Amount
            </label>
            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              ${selectedTransaction.amount.toLocaleString()}
            </p>
          </div>
          <div>
            <label
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Risk Score
            </label>
            <p className="text-2xl font-bold text-red-500">
              {selectedTransaction.riskScore}
            </p>
          </div>
          <div>
            <label
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              AI Analysis
            </label>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {selectedTransaction.fraudAnalysis}
            </p>
          </div>
          <div>
            <label
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Location
            </label>
            <p className={`${darkMode ? "text-white" : "text-gray-900"}`}>
              {selectedTransaction.location?.country || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
