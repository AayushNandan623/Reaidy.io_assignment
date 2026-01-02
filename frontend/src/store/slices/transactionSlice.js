import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  transactions: [],
  stats: { totalTransactions: 0, highRiskTransactions: 0, avgRiskScore: 0 },
  selectedTransaction: null,
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async () => {
    const response = await api.get("/transactions");
    return response.data;
  }
);

export const fetchStats = createAsyncThunk("transactions/stats", async () => {
  const response = await api.get("/transactions/stats");
  return response.data;
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions = [action.payload, ...state.transactions].slice(
        0,
        100
      );
    },
    selectTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
    updateStats: (state, action) => {
      state.stats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { addTransaction, selectTransaction, updateStats } =
  transactionSlice.actions;
export default transactionSlice.reducer;
