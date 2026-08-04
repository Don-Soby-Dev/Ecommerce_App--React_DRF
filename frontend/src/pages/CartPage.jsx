import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cart/cartThunk";
import CartCard from "../features/cart/CartCard";
import CartSideBar from "../features/cart/CartSideBar";
import { ShoppingCart, PackageX } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-indigo-600" />
            Your Cart
          </h1>
          <p className="text-gray-500 mt-1">
            Review items before checkout.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {status === "loading" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl h-28 animate-pulse border border-gray-100"
                />
              ))}
            </div>
            <div className="bg-white rounded-2xl h-52 animate-pulse border border-gray-100" />
          </div>
        )}

        {/* Empty Cart */}
        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-gray-100 text-center shadow-sm">
            <PackageX className="w-20 h-20 text-gray-300 mb-5" />
            <h3 className="text-xl font-bold text-gray-800">Your cart is empty</h3>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              Browse products and add items to your cart.
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20"
            >
              Explore Products
            </Link>
          </div>
        )}

        {/* Cart Content */}
        {status === "succeeded" && items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>

            {/* Sidebar with Clear Cart button enabled */}
            <div>
              <CartSideBar showClearButton={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
