import { useSelector, useDispatch } from "react-redux";
import {
  selectTransaction,
  fetchTransactions,
  fetchStats,
} from "../../store/slices/transactionSlice";
import { Search, CheckCircle, XCircle } from "lucide-react";
import api from "../../utils/api";

export default function TransactionsTable() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const { darkMode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);

  // Helper to check permissions
  const canManage = ["admin", "analyst"].includes(user?.role);

  const handleStatusUpdate = async (id, status, e) => {
    e.stopPropagation(); // Prevent row click event
    try {
      await api.patch(`/transactions/${id}/status`, { status });
      // Refresh local data to reflect change immediately
      dispatch(fetchTransactions());
      dispatch(fetchStats());
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update transaction status");
    }
  };

  const getRiskBadge = (level) => {
    const colors = {
      low: darkMode
        ? "bg-green-900 text-green-300 border border-green-700"
        : "bg-green-100 text-green-800 border border-green-200",
      medium: darkMode
        ? "bg-yellow-900 text-yellow-300 border border-yellow-700"
        : "bg-yellow-100 text-yellow-800 border border-yellow-200",
      high: darkMode
        ? "bg-red-900 text-red-300 border border-red-700"
        : "bg-red-100 text-red-800 border border-red-200",
    };
    return colors[level] || colors.low;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      case "investigating":
        return "text-orange-500";
      default:
        return darkMode ? "text-gray-400" : "text-gray-500";
    }
  };

  return (
    <div
      className={`rounded-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg overflow-hidden`}
    >
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Transactions
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={darkMode ? "bg-gray-700/50" : "bg-gray-50"}>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                ID
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Merchant
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Amount
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Risk
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-right text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } uppercase tracking-wider`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            {transactions.slice(0, 10).map((tx) => (
              <tr
                key={tx._id}
                className={`transition-colors ${
                  darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                }`}
              >
                <td
                  className={`px-6 py-4 text-sm font-mono ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {tx.transactionId.slice(0, 8)}...
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tx.merchantName}
                </td>
                <td
                  className={`px-6 py-4 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-900"
                  }`}
                >
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadge(
                      tx.riskLevel
                    )}`}
                  >
                    {tx.riskLevel.toUpperCase()} ({tx.riskScore})
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm capitalize font-medium ${getStatusColor(
                      tx.status
                    )}`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {/* View Details Button (Available to Everyone) */}
                    <button
                      onClick={() => dispatch(selectTransaction(tx))}
                      className={`p-1.5 rounded-md transition-colors ${
                        darkMode
                          ? "text-gray-400 hover:text-white hover:bg-gray-600"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      title="View Details"
                    >
                      <Search className="w-4 h-4" />
                    </button>

                    {/* Action Buttons (Only for Admin & Analyst) */}
                    {canManage && tx.status === "pending" && (
                      <>
                        <button
                          onClick={(e) =>
                            handleStatusUpdate(tx._id, "approved", e)
                          }
                          className={`p-1.5 rounded-md transition-colors ${
                            darkMode
                              ? "text-green-400 hover:bg-green-900/30"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) =>
                            handleStatusUpdate(tx._id, "rejected", e)
                          }
                          className={`p-1.5 rounded-md transition-colors ${
                            darkMode
                              ? "text-red-400 hover:bg-red-900/30"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
