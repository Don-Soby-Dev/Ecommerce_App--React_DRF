import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart, fetchOrders, fetchOrderDetail } from "./checkoutThunk";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastOrder: null,
  orders: [],
  ordersStatus: "idle",
  ordersError: null,
  selectedOrder: null,
  selectedOrderStatus: "idle",
  selectedOrderError: null,
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
      state.selectedOrder = null;
      state.selectedOrderStatus = "idle";
      state.selectedOrderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrder = action.payload;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.ordersStatus = "loading";
        state.ordersError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersStatus = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.ordersStatus = "failed";
        state.ordersError = action.payload;
      })
      .addCase(fetchOrderDetail.pending, (state) => {
        state.selectedOrderStatus = "loading";
        state.selectedOrderError = null;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.selectedOrderStatus = "succeeded";
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.selectedOrderStatus = "failed";
        state.selectedOrderError = action.payload;
      });
  },
});

export const {
  setCheckoutStatus,
  setCheckoutError,
  setLastOrder,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
