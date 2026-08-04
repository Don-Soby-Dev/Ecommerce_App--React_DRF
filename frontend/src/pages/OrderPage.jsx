import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  fetchOrderDetail,
} from "../features/checkout/checkoutThunk";
import { CalendarCheck, Package, Clock3 } from "lucide-react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-emerald-100 text-emerald-700",
  canceled: "bg-red-100 text-red-700",
};

const OrderPage = () => {
  const dispatch = useDispatch();
  const {
    orders,
    ordersStatus,
    ordersError,
    selectedOrder,
    selectedOrderStatus,
    selectedOrderError,
  } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (ordersStatus === "succeeded" && orders.length > 0 && !selectedOrder) {
      dispatch(fetchOrderDetail(orders[0].id));
    }
  }, [orders, ordersStatus, selectedOrder, dispatch]);

  const handleSelectOrder = (orderId) => {
    dispatch(fetchOrderDetail(orderId));
  };

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <CalendarCheck className="w-8 h-8 text-indigo-600" />
            My Orders
          </h1>
          <p className="text-gray-500 mt-1">
            Review your past purchases and view order details in one place.
          </p>
        </div>

        {ordersError && (
          <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {typeof ordersError === "string"
              ? ordersError
              : JSON.stringify(ordersError)}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8">
          <div className="space-y-4">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent orders
              </h2>
              {ordersStatus === "loading" ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-24 rounded-3xl bg-slate-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
                  No orders found yet. Complete a checkout to start seeing your
                  order history.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <button
                      key={order.id}
                      type="button"
                      onClick={() => handleSelectOrder(order.id)}
                      className={`w-full rounded-3xl border p-4 text-left transition-all ${
                        selectedOrder?.id === order.id
                          ? "border-indigo-300 bg-indigo-50 shadow-sm"
                          : "border-gray-100 bg-white hover:border-indigo-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status] || "bg-slate-100 text-slate-700"}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span>{order.items?.length || 0} items</span>
                        <span>
                          ${parseFloat(order.total_price || 0).toFixed(2)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    Order details
                  </p>
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    Selected order
                  </h2>
                </div>
                <Package className="w-8 h-8 text-indigo-600" />
              </div>

              {selectedOrderStatus === "loading" ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-6 rounded-full bg-slate-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : selectedOrder ? (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Status
                      </p>
                      <p
                        className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[selectedOrder.status] || "bg-slate-100 text-slate-700"}`}
                      >
                        {selectedOrder.status}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Ordered
                      </p>
                      <p className="mt-3 text-sm font-semibold text-gray-900">
                        {formatDate(selectedOrder.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                          Order total
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900">
                          $
                          {parseFloat(selectedOrder.total_price || 0).toFixed(
                            2,
                          )}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{selectedOrder.items?.length || 0} items</p>
                        <p className="mt-2">
                          Order #{selectedOrder.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedOrder.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-4 sm:flex-row sm:items-center"
                      >
                        <div className="h-24 w-full overflow-hidden rounded-3xl bg-gray-100 sm:w-24 sm:h-24">
                          <img
                            src={item.product?.img_url}
                            alt={item.product?.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&auto=format&fit=crop";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {item.product?.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1 truncate">
                            $
                            {parseFloat(item.price_at_purchase || 0).toFixed(2)}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">
                            Purchased price
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock3 className="w-4 h-4" />
                          <span>Purchased</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
                  Select an order from the list to view its details.
                </div>
              )}
            </div>

            {(selectedOrderError || ordersError) && (
              <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                {selectedOrderError || ordersError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
