import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchMyProducts,
  fetchCategories,
} from "./productsThunk";

const initialState = {
  items: [],
  myItems: [],
  categories: [],
  selected: null,
  filters: {
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  },
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  myItemsStatus: "idle",
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
      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.myItems.unshift(action.payload);
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.slug === action.payload.slug);
        if (index !== -1) state.items[index] = action.payload;
        const myIndex = state.myItems.findIndex((p) => p.slug === action.payload.slug);
        if (myIndex !== -1) state.myItems[myIndex] = action.payload;
        if (state.selected?.slug === action.payload.slug) {
          state.selected = action.payload;
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.slug !== action.payload);
        state.myItems = state.myItems.filter((p) => p.slug !== action.payload);
        if (state.selected?.slug === action.payload) {
          state.selected = null;
        }
      })
      // Fetch user's own products
      .addCase(fetchMyProducts.pending, (state) => {
        state.myItemsStatus = "loading";
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.myItemsStatus = "succeeded";
        state.myItems = action.payload;
      })
      .addCase(fetchMyProducts.rejected, (state) => {
        state.myItemsStatus = "failed";
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
