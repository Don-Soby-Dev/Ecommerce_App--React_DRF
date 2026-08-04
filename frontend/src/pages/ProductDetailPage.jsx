import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug } from "../features/products/productsThunk";
import { clearSelectedProduct } from "../features/products/productsSlice";
import { ArrowLeft, Tag, Calendar, User, ShoppingCart, CheckCircle, XCircle } from "lucide-react";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selected: product, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, slug]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 animate-pulse flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-gray-200 h-96 rounded-2xl" />
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-24 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed" || !product) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 max-w-md text-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">{error || "The requested product does not exist."}</p>
          <Link
            to="/products"
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>

        {/* Detail Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Image Column */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
            <img
              src={product.img_url}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop";
              }}
            />
            {product.is_sold && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg">
                SOLD OUT
              </div>
            )}
          </div>

          {/* Information Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                <Tag className="w-4 h-4" />
                <span>{product.category_name || "General Category"}</span>
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="text-3xl font-black text-gray-900 mb-6">
                ${parseFloat(product.price).toFixed(2)}
              </div>

              <div className="border-t border-b border-gray-100 py-4 my-4 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Seller ID: <strong className="text-gray-800">{product.seller}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    Posted on:{" "}
                    <strong className="text-gray-800">
                      {new Date(product.created_at).toLocaleDateString()}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  {product.is_sold ? (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 font-semibold">Item is Sold</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 font-semibold">Available for purchase</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                  {product.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-6 mt-6 border-t border-gray-100">
              <button
                disabled={product.is_sold}
                className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.is_sold ? "Item Sold" : "Buy / Contact Seller"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
