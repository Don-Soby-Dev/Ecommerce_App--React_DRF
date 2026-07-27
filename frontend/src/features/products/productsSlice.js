import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selected: null,
  filters: {
    category: "",
    minPrice: null,
    maxPrice: null,
  },
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selected = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        minPrice: null,
        maxPrice: null,
      };
    },
    setProductsStatus: (state, action) => {
      state.status = action.payload;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setFilters,
  clearFilters,
  setProductsStatus,
  setProductsError,
} = productsSlice.actions;

export default productsSlice.reducer;
