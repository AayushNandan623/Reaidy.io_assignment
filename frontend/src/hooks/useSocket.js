import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  addTransaction,
  updateStats,
  fetchStats,
} from "../store/slices/transactionSlice";

export const useSocket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    const socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"
    );

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("join-role", user.role);
    });

    socket.on("new-transaction", (transaction) => {
      dispatch(addTransaction(transaction));
      dispatch(fetchStats());
    });

    socket.on("high-risk-alert", (transaction) => {
      console.log("High risk alert:", transaction);
    });

    return () => socket.disconnect();
  }, [user, dispatch]);
};
