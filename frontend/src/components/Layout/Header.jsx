import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { toggleDarkMode } from "../../store/slices/themeSlice";
import { Moon, Sun, LogOut, Shield } from "lucide-react";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <header
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Fraud Monitor
            </h1>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Real-time Transaction Analysis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-yellow-400"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div
              className={`text-sm ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              <div className="font-semibold">{user?.name}</div>
              <div
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } capitalize`}
              >
                {user?.role}
              </div>
            </div>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
