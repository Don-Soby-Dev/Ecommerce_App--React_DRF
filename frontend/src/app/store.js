import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import sellReducer from "../features/sell/sellSlice";
import cartReducer from "../features/cart/cartSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    sell: sellReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

export default store;
