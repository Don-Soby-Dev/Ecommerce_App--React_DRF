import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addCartItem, removeCartItem, clearCart } from "./cartThunk";

const initialState = {
  cartId: null,
  items: [], // Array of CartItem objects with nested product data
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  actionStatus: "idle", // For add/remove/clear operations
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartId = action.payload.id;
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add item
      .addCase(addCartItem.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      // Remove item
      .addCase(removeCartItem.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.actionStatus = "succeeded";
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetCartError } = cartSlice.actions;
export default cartSlice.reducer;
