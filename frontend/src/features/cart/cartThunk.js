import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiFetchCart,
  apiAddCartItem,
  apiRemoveCartItem,
  apiClearCart,
} from "./cartAPI";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchCart();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load cart.",
      );
    }
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await apiAddCartItem(productId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.product_id?.[0] ||
          "Failed to add item to cart.",
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, { rejectWithValue }) => {
    try {
      await apiRemoveCartItem(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to remove item from cart.",
      );
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await apiClearCart();
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to clear cart.",
      );
    }
  },
);
