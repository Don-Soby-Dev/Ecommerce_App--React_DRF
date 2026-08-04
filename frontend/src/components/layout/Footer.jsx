import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-white tracking-tight">
            OLX
          </span>
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <Link to="/products/sell" className="hover:text-white transition-colors">
            Sell
          </Link>
          <Link to="/auth" className="hover:text-white transition-colors">
            Account
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
