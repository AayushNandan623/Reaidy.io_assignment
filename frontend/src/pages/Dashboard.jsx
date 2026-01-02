import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  fetchStats,
} from "../store/slices/transactionSlice";
import { useSocket } from "../hooks/useSocket";
import Header from "../components/Layout/Header";
import KPICard from "../components/Dashboard/KPICard";
import TransactionsTable from "../components/Dashboard/TransactionsTable";
import RiskChart from "../components/Dashboard/RiskChart";
import AlertsPanel from "../components/Dashboard/AlertsPanel";
import InvestigationDrawer from "../components/Layout/InvestigationDrawer";
// ADDED: Import new component
import AdminPanel from "../components/Dashboard/AdminPanel";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  // ADDED: Get user to check role
  const { user } = useSelector((state) => state.auth);

  useSocket();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchStats());
    const interval = setInterval(() => {
      dispatch(fetchStats());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* ADDED: Only render AdminPanel for admins */}
        {user?.role === "admin" && <AdminPanel />}

        <KPICard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionsTable />
          </div>
          <div className="space-y-6">
            <RiskChart />
            <AlertsPanel />
          </div>
        </div>
      </main>
      <InvestigationDrawer />
    </div>
  );
}
