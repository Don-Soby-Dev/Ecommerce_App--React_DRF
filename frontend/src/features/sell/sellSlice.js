import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const sellSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {
    setSellStatus: (state, action) => {
      state.status = action.payload;
    },
    setSellError: (state, action) => {
      state.error = action.payload;
    },
    resetSellState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { setSellStatus, setSellError, resetSellState } = sellSlice.actions;
export default sellSlice.reducer;
