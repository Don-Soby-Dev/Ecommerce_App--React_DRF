import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "./cartThunk";
import { ShoppingBag, Trash2, CreditCard } from "lucide-react";

const CartSideBar = ({ showClearButton = false }) => {
  const dispatch = useDispatch();
  const { items, actionStatus } = useSelector((state) => state.cart);

  const totalPrice = items.reduce((sum, item) => {
    return sum + parseFloat(item.product?.price || 0);
  }, 0);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear all items from your cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
        <ShoppingBag className="w-5 h-5 text-indigo-600" />
        Order Summary
      </h3>

      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Items in cart</span>
          <span className="font-bold text-gray-900">{items.length}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-xl font-extrabold text-gray-900">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className={`w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 flex items-center justify-center gap-2 ${
          items.length === 0 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <CreditCard className="w-4 h-4" />
        Proceed to Checkout
      </Link>

      {/* Clear Cart - Only shown on CartPage */}
      {showClearButton && items.length > 0 && (
        <button
          onClick={handleClearCart}
          disabled={actionStatus === "loading"}
          className="w-full mt-3 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Clear Entire Cart
        </button>
      )}
    </div>
  );
};

export default CartSideBar;
