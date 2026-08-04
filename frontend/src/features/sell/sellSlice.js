import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./sellThunks";

const initialState = {
  myProducts: [],
  filterStatus: "all", // "all" | "unsold" | "sold"
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  actionStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const sellSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    resetSellState: (state) => {
      state.status = "idle";
      state.actionStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user's products
      .addCase(fetchMyProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myProducts = action.payload;
      })
      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.myProducts.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        const index = state.myProducts.findIndex(
          (p) => p.slug === action.payload.slug
        );
        if (index !== -1) {
          state.myProducts[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.myProducts = state.myProducts.filter(
          (p) => p.slug !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilterStatus, resetSellState } = sellSlice.actions;
export default sellSlice.reducer;
