import React, { useState, useEffect } from "react";
import { Trash2, Save, X, PlusCircle } from "lucide-react";

const ProductForm = ({
  initialData = null,
  categories = [],
  onSubmit,
  onDelete,
  isLoading = false,
  apiError = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    img_url: "",
    is_sold: false,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || initialData.category_id || "",
        img_url: initialData.img_url || "",
        is_sold: initialData.is_sold || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        category: categories.length > 0 ? categories[0].id : "",
        img_url: "",
        is_sold: false,
      });
    }
  }, [initialData, categories]);

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
    if (!formData.price) {
      errors.price = "Price is required.";
    } else if (parseFloat(formData.price) < 0) {
      errors.price = "Price cannot be negative.";
    }
    if (!formData.category) {
      errors.category = "Please select a category.";
    }
    if (!formData.img_url.trim()) {
      errors.img_url = "Image URL is required.";
    } else {
      try {
        new URL(formData.img_url);
      } catch (_) {
        errors.img_url = "Please enter a valid URL.";
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    onSubmit(formData);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      onDelete();
    }
  };

  const isEditing = Boolean(initialData);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        {isEditing ? (
          <Save className="w-6 h-6 text-indigo-600" />
        ) : (
          <PlusCircle className="w-6 h-6 text-indigo-600" />
        )}
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Product Listing" : "Post New Listing"}
        </h2>
      </div>

      {apiError && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {typeof apiError === "string"
            ? apiError
            : JSON.stringify(apiError)}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Product Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. iPhone 13 Pro Max - 256GB"
            className={`w-full px-4 py-3 rounded-xl border ${
              formErrors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 text-sm transition-all`}
          />
          {formErrors.title && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {formErrors.title}
            </p>
          )}
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                formErrors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 text-sm transition-all text-gray-700`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formErrors.category && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {formErrors.category}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Price ($) *
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className={`w-full px-4 py-3 rounded-xl border ${
                formErrors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 text-sm transition-all`}
            />
            {formErrors.price && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {formErrors.price}
              </p>
            )}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Image URL *
          </label>
          <input
            type="url"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={`w-full px-4 py-3 rounded-xl border ${
              formErrors.img_url
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 text-sm transition-all`}
          />
          {formErrors.img_url && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {formErrors.img_url}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the item's condition, features, etc."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
          />
        </div>

        {/* Mark as Sold Toggle (Only when editing) */}
        {isEditing && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <input
              type="checkbox"
              id="is_sold"
              name="is_sold"
              checked={formData.is_sold}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="is_sold" className="text-sm font-semibold text-gray-700 cursor-pointer">
              Mark as Sold
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-xl transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Listing</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Saving...</span>
            ) : isEditing ? (
              "Update Listing"
            ) : (
              "Publish Listing"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
