import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../features/sell/sellThunks";
import { fetchCategories } from "../features/products/productsThunk";
import { setFilterStatus, resetSellState } from "../features/sell/sellSlice";
import ProductForm from "../features/sell/ProductForm";
import ProductCard from "../features/products/ProductCard";
import { Plus, Edit2, PackageCheck, Package, ShoppingBag } from "lucide-react";

const SellPage = () => {
  const dispatch = useDispatch();

  const { myProducts, filterStatus, status, actionStatus, error } = useSelector(
    (state) => state.sell,
  );
  const { categories } = useSelector((state) => state.products);

  const [activeTab, setActiveTab] = useState("listings"); // "listings" | "form"
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = {};
    if (filterStatus === "sold") params.is_sold = "true";
    if (filterStatus === "unsold") params.is_sold = "false";
    dispatch(fetchMyProducts(params));
  }, [dispatch, filterStatus]);

  const handleFilterChange = (newStatus) => {
    dispatch(setFilterStatus(newStatus));
  };

  const handleOpenCreateForm = () => {
    setEditingProduct(null);
    dispatch(resetSellState());
    setActiveTab("form");
  };

  const handleOpenEditForm = (product) => {
    setEditingProduct(product);
    dispatch(resetSellState());
    setActiveTab("form");
  };

  const handleSubmitForm = async (formData) => {
    if (editingProduct) {
      const result = await dispatch(
        updateProduct({ slug: editingProduct.slug, productData: formData }),
      );
      if (updateProduct.fulfilled.match(result)) {
        setActiveTab("listings");
        setEditingProduct(null);
      }
    } else {
      const result = await dispatch(createProduct(formData));
      if (createProduct.fulfilled.match(result)) {
        setActiveTab("listings");
      }
    }
  };

  const handleDelete = async () => {
    if (editingProduct) {
      const result = await dispatch(deleteProduct(editingProduct.slug));
      if (deleteProduct.fulfilled.match(result)) {
        setActiveTab("listings");
        setEditingProduct(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-indigo-600" />
              Seller Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your posted items or create a new listing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("listings")}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === "listings"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              My Listings
            </button>
            <button
              onClick={handleOpenCreateForm}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === "form" && !editingProduct
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-500/20"
              }`}
            >
              <Plus className="w-4 h-4" />
              Post New Item
            </button>
          </div>
        </div>

        {/* Tab 1: Listings View */}
        {activeTab === "listings" && (
          <div>
            {/* Filter Buttons: All, Unsold, Sold */}
            <div className="flex items-center gap-2 mb-6 bg-white p-1.5 rounded-xl border border-gray-200 w-fit">
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                All Listings
              </button>
              <button
                onClick={() => handleFilterChange("unsold")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterStatus === "unsold"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                Active (Unsold)
              </button>
              <button
                onClick={() => handleFilterChange("sold")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterStatus === "sold"
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                Sold Items
              </button>
            </div>

            {/* List Grid */}
            {status === "loading" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 p-4"
                  />
                ))}
              </div>
            )}

            {status === "succeeded" && myProducts.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 my-4 shadow-sm">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800">
                  No products found
                </h3>
                <p className="text-gray-500 text-sm mt-1 mb-6">
                  You haven't posted any items matching this filter yet.
                </p>
                <button
                  onClick={handleOpenCreateForm}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20"
                >
                  Create First Listing
                </button>
              </div>
            )}

            {status === "succeeded" && myProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {myProducts.map((product) => (
                  <div
                    key={product.id || product.slug}
                    className="relative group"
                  >
                    <ProductCard product={product} />

                    {/* Left side edit overlay button */}
                    <button
                      onClick={() => handleOpenEditForm(product)}
                      className="absolute top-3 left-3 bg-white/95 hover:bg-indigo-600 text-gray-800 hover:text-white p-2 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-600 transition-all duration-200 flex items-center gap-1.5 text-xs font-bold z-10"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Form View */}
        {activeTab === "form" && (
          <div>
            <div className="mb-4 max-w-2xl mx-auto flex justify-start">
              <button
                onClick={() => setActiveTab("listings")}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                &larr; Back to My Listings
              </button>
            </div>
            <ProductForm
              initialData={editingProduct}
              categories={categories}
              onSubmit={handleSubmitForm}
              onDelete={handleDelete}
              isLoading={actionStatus === "loading"}
              apiError={error}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellPage;
