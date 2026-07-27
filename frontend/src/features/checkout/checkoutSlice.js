import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastOrder: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutStatus: (state, action) => {
      state.status = action.payload;
    },
    setCheckoutError: (state, action) => {
      state.error = action.payload;
    },
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    },
    resetCheckout: (state) => {
      state.status = "idle";
      state.error = null;
      state.lastOrder = null;
    },
  },
});

export const {
  setCheckoutStatus,
  setCheckoutError,
  setLastOrder,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
