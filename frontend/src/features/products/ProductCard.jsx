import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Tag } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.img_url}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop";
          }}
        />
        {product.is_sold && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            SOLD OUT
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold mb-2">
          <Tag className="w-3.5 h-3.5" />
          <span>{product.category_name || "General"}</span>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2"
        >
          {product.title}
        </Link>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description || "No description available."}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400 block">Price</span>
            <span className="text-xl font-extrabold text-gray-900">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
