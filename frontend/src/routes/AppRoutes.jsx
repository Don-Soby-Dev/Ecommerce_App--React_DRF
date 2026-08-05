import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProductListingPage from "../pages/ProductListingPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import SellPage from "../pages/SellPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderPage from "../pages/OrderPage";
import ProtectedRoute from "./ProdectedRoute";
import Layout from "../components/layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Route (Standalone, No Layout Header/Footer) */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Main Layout Wrapper for all non-auth pages */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />

        {/* Protected Routes (Auth Required) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products/sell" element={<SellPage />} />
          <Route path="/products/mine" element={<SellPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
