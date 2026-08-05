import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem } from "./cartThunk";
import { Trash2 } from "lucide-react";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();
  const product = item.product;

  const handleRemove = () => {
    dispatch(removeCartItem(item.id));
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={product?.img_url}
          alt={product?.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow min-w-0">
        <h3 className="text-sm font-bold text-gray-900 truncate">
          {product?.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
          {product?.description || "No description"}
        </p>
        <p className="text-lg font-extrabold text-gray-900 mt-2">
          ${parseFloat(product?.price || 0).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        title="Remove from cart"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartCard;
