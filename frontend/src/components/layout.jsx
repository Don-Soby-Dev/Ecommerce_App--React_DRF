import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
