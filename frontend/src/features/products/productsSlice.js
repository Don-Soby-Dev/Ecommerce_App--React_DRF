import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductBySlug,
  fetchCategories,
} from "./productsThunk";

const initialState = {
  items: [],
  categories: [],
  selected: null,
  filters: {
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  },
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  categoriesStatus: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        minPrice: "",
        maxPrice: "",
        search: "",
      };
    },
    clearSelectedProduct: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch public products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch product by slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = "failed";
      });
  },
});

export const { setFilters, clearFilters, clearSelectedProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
