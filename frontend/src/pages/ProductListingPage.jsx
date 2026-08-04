import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../features/products/productsThunk";
import { setFilters, clearFilters } from "../features/products/productsSlice";
import FilterBar from "../features/products/FilterBar";
import ProductCard from "../features/products/ProductCard";
import { PackageX, ShoppingBag } from "lucide-react";

const ProductListingPage = () => {
  const dispatch = useDispatch();

  const { items, categories, filters, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      category: filters.category,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      search: filters.search,
    };
    dispatch(fetchProducts(params));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleResetFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-indigo-600" />
              Explore Products
            </h1>
            <p className="text-gray-500 mt-1">
              Browse from our curated collection of available items.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Product Grid State Handling */}
        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 p-4 flex flex-col justify-between"
              >
                <div className="bg-gray-200 h-44 rounded-xl w-full" />
                <div className="space-y-2 mt-4">
                  <div className="bg-gray-200 h-4 rounded w-3/4" />
                  <div className="bg-gray-200 h-3 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "failed" && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-center my-8">
            <p className="font-semibold">{error || "Failed to load products."}</p>
          </div>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 text-center my-8 shadow-sm">
            <PackageX className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-800">No products found</h3>
            <p className="text-gray-500 text-sm mt-1 mb-4">
              Try adjusting your filter parameters or search query.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {status === "succeeded" && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
