import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCheckout, apiFetchOrders, apiFetchOrderDetail } from "./checkoutAPI";
import { fetchCart } from "../cart/cartThunk";

export const checkoutCart = createAsyncThunk(
  "checkout/checkoutCart",
  async ({ cartId } = {}, { dispatch, rejectWithValue }) => {
    try {
      const data = await apiCheckout({ cartId });
      dispatch(fetchCart());
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          error.response?.data?.detail ||
          error.message ||
          "Failed to process order.",
      );
    }
  },
);

export const fetchOrders = createAsyncThunk(
  "checkout/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchOrders();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          error.response?.data?.detail ||
          error.message ||
          "Failed to load orders.",
      );
    }
  },
);

export const fetchOrderDetail = createAsyncThunk(
  "checkout/fetchOrderDetail",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await apiFetchOrderDetail(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          error.response?.data?.detail ||
          error.message ||
          "Failed to load order details.",
      );
    }
  },
);
