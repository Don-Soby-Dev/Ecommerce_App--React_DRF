import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy loaded pages
const AuthPage = lazy(() => import("../pages/AuthPage"));
const ProductListingPage = lazy(() => import("../pages/ProductListingPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const SellPage = lazy(() => import("../pages/SellPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const OrderPage = lazy(() => import("../pages/OrderPage"));

// Lazy loaded protected route + layout
// Note: if your file is actually named ProtectedRoute.jsx, fix this path.
const ProtectedRoute = lazy(() => import("./ProdectedRoute"));
const Layout = lazy(() => import("../components/layout/layout"));

// Simple loader fallback
const PageLoader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      Loading...
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth Route (Standalone, No Layout Header/Footer) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Main Layout Wrapper for all non-auth pages */}
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/products" element={<ProductListingPage />} />

          {/* Protected Routes (Auth Required) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products/sell" element={<SellPage />} />
            <Route path="/products/mine" element={<SellPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderPage />} />
          </Route>

          {/* Dynamic public route */}
          <Route path="/products/:slug" element={<ProductDetailPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
