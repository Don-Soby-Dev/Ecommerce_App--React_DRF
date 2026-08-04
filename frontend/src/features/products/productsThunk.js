import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiFetchProducts,
  apiFetchProductBySlug,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiFetchMyProducts,
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
        error.response?.data?.detail || "Failed to load products."
      );
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const data = await apiFetchProductBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load product details."
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
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
  "products/updateProduct",
  async ({ slug, productData }, { rejectWithValue }) => {
    try {
      const data = await apiUpdateProduct(slug, productData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update product."
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
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

export const fetchMyProducts = createAsyncThunk(
  "products/fetchMyProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchMyProducts();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load your listings."
      );
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiFetchCategories();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load categories."
      );
    }
  }
);
