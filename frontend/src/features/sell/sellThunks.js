import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiFetchMyProducts,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
} from "./sellAPI";

export const fetchMyProducts = createAsyncThunk(
  "sell/fetchMyProducts",
  async (params, { rejectWithValue }) => {
    try {
      const data = await apiFetchMyProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load your products."
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "sell/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const data = await apiCreateProduct(productData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create product listing."
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "sell/updateProduct",
  async ({ slug, productData }, { rejectWithValue }) => {
    try {
      const data = await apiUpdateProduct(slug, productData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update product listing."
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "sell/deleteProduct",
  async (slug, { rejectWithValue }) => {
    try {
      await apiDeleteProduct(slug);
      return slug;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to delete product."
      );
    }
  }
);
