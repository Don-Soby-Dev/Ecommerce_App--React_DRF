import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchCart } from "../features/cart/cartThunk";
import CartSideBar from "../features/cart/CartSideBar";
import {
  CheckoutProductsBlock,
  CheckoutUserBlock,
} from "../features/checkout/CheckoutBlock";
import { checkoutCart } from "../features/checkout/checkoutThunk";
import { resetCheckout } from "../features/checkout/checkoutSlice";
import { ShoppingCart, ShieldCheck } from "lucide-react";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items,
    status: cartStatus,
    error: cartError,
  } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { status, error, lastOrder } = useSelector((state) => state.checkout);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(fetchCart());
    }
  }, [cartStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetCheckout());
    };
  }, [dispatch]);

  const handleConfirm = () => {
    if (items.length === 0) {
      return;
    }
    setModalOpen(true);
    dispatch(checkoutCart({ cartId: null }));
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  const isProcessing = status === "loading";
  const isSuccess = status === "succeeded";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-indigo-600" />
            Checkout
          </h1>
          <p className="text-gray-500 mt-1">
            Confirm your order and provide your buyer details.
          </p>
        </div>

        {(cartError || error) && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error || cartError}
          </div>
        )}

        {cartStatus === "succeeded" && items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center">
            <ShieldCheck className="mx-auto mb-4 w-12 h-12 text-indigo-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Nothing to checkout
            </h2>
            <p className="mt-2 text-gray-500">
              Add products to your cart before placing an order.
            </p>
            <Link
              to="/products"
              className="inline-flex mt-6 items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <CheckoutProductsBlock items={items} />
              <CheckoutUserBlock user={user} />
            </div>
            <div>
              <CartSideBar
                onConfirm={handleConfirm}
                confirmLoading={isProcessing}
                onCancel={handleCancel}
                showCheckoutButton={false}
                confirmText="Confirm Order"
                cancelText="Cancel Order"
              />
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
                  {isProcessing
                    ? "Processing"
                    : isSuccess
                      ? "Order Confirmed"
                      : "Confirm Order"}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-gray-900">
                  {isProcessing
                    ? "Your order is being placed"
                    : isSuccess
                      ? "Your order is complete"
                      : "Review and confirm your purchase"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {isProcessing && (
                <div className="rounded-3xl border border-gray-100 bg-slate-50 p-6 text-center">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
                  <p className="text-sm text-gray-600">
                    We are verifying stock and finalizing your order. This may
                    take a few seconds.
                  </p>
                </div>
              )}

              {isSuccess && lastOrder && (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-green-100 bg-green-50 p-5 text-green-900">
                    <p className="font-semibold">Order confirmed!</p>
                    <p className="text-sm">
                      Order{" "}
                      <span className="font-semibold">#{lastOrder.id}</span> was
                      completed successfully.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-gray-100 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Total
                      </p>
                      <p className="mt-2 text-2xl font-extrabold text-gray-900">
                        ${parseFloat(lastOrder.total_price || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-gray-100 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Items
                      </p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {lastOrder.items?.length || 0}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-gray-100 p-4 bg-slate-50">
                    <p className="text-sm text-gray-600">
                      You can view your order history anytime from My Orders.
                    </p>
                  </div>
                </div>
              )}

              {!isProcessing && !isSuccess && error && (
                <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700">
                  <p className="font-semibold">Order failed</p>
                  <p className="text-sm">
                    {typeof error === "string" ? error : JSON.stringify(error)}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              {!isProcessing && isSuccess && (
                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all"
                >
                  View My Orders
                </button>
              )}
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
