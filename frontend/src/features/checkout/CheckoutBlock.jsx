import CartCard from "../cart/CartCard";
import { Package, User } from "lucide-react";

export const CheckoutProductsBlock = ({ items }) => {
  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-[0.2em]">
            <Package className="inline w-4 h-4 mr-2 align-text-bottom" />
            Order Items
          </p>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Review your products
          </h2>
        </div>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
          No products added to your cart yet.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export const CheckoutUserBlock = ({ user }) => {
  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 grid place-items-center">
          <User className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-[0.2em]">
            Buyer Information
          </p>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Account details
          </h2>
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-600">
        <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Username
          </p>
          <p className="text-base font-semibold text-gray-900">
            {user?.username || "-"}
          </p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Email
          </p>
          <p className="text-base font-semibold text-gray-900">
            {user?.email || "-"}
          </p>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Order note
          </p>
          <p className="text-base text-gray-700">
            We will confirm your order and mark the selected products as sold.
            You can view order history in My Orders.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckoutProductsBlock;
