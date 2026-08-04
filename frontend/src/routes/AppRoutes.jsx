import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "./ProdectedRoute";

// Temporary placeholder page for home route
const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Home Page</h1>
        <p className="text-gray-600 mb-6">You are authenticated and viewing a protected route.</p>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
