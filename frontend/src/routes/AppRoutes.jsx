import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProductListingPage from "../pages/ProductListingPage";
import ProtectedRoute from "./ProdectedRoute";

// Temporary placeholder components for routes
const ProductDetailPage = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
      <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
      <p className="text-gray-500 text-sm mt-2">Product detail page implementation.</p>
    </div>
  </div>
);

const SellPage = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
      <h2 className="text-xl font-bold text-gray-800">Sell Product (Create Listing)</h2>
      <p className="text-gray-500 text-sm mt-2">Protected Sell page implementation.</p>
    </div>
  </div>
);

const MyListingsPage = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
      <h2 className="text-xl font-bold text-gray-800">My Product Listings</h2>
      <p className="text-gray-500 text-sm mt-2">Protected My Listings page implementation.</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />

      {/* Protected Routes (Auth Required) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/products/sell" element={<SellPage />} />
        <Route path="/products/mine" element={<MyListingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
