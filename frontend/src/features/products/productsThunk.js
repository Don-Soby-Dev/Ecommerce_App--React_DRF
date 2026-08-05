import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiFetchProducts,
  apiFetchProductBySlug,
  apiFetchCategories,
} from "./productsAPI";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const data = await apiFetchProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load products.",
      );
    }
  },
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const data = await apiFetchProductBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load product details.",
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchCategories();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load categories.",
      );
    }
  },
);
