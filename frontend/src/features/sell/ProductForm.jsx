import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Trash2, Save, PlusCircle } from "lucide-react";
import {
  validateProductTitle,
  validateProductPrice,
  validateProductImgUrl,
  validateProductCategory,
} from "../../utils/validators";

const ProductForm = ({
  initialData = null,
  categories = [],
  onSubmit,
  onDelete,
  isLoading = false,
  apiError = null,
}) => {
  const buildDefaultValues = (data = null, availableCategories = []) => ({
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price ?? "",
    category:
      data?.category ||
      data?.category_id ||
      (availableCategories.length > 0 ? availableCategories[0].id : ""),
    img_url: data?.img_url || "",
    is_sold: Boolean(data?.is_sold),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: buildDefaultValues(initialData, categories),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(buildDefaultValues(initialData, categories));
  }, [initialData, categories, reset]);

  useEffect(() => {
    if (apiError) {
      const message =
        typeof apiError === "string" ? apiError : JSON.stringify(apiError);
      setError("root", { type: "server", message });
    } else {
      clearErrors("root");
    }
  }, [apiError, clearErrors, setError]);

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  const handleDeleteClick = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this listing? This action cannot be undone.",
      )
    ) {
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

      {errors.root && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          {errors.root.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        noValidate
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Product Title *
          </label>
          <input
            type="text"
            {...register("title", { validate: validateProductTitle })}
            placeholder="e.g. iPhone 13 Pro Max - 256GB"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 text-sm transition-all`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {errors.title.message}
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
              {...register("category", { validate: validateProductCategory })}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.category
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
            {errors.category && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.category.message}
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
              inputMode="decimal"
              {...register("price", { validate: validateProductPrice })}
              placeholder="0.00"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 text-sm transition-all`}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.price.message}
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
            {...register("img_url", { validate: validateProductImgUrl })}
            placeholder="https://example.com/image.jpg"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.img_url
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20 text-sm transition-all`}
          />
          {errors.img_url && (
            <p className="mt-1 text-xs text-red-600 font-medium">
              {errors.img_url.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            {...register("description")}
            rows="4"
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
              {...register("is_sold")}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
            />
            <label
              htmlFor="is_sold"
              className="text-sm font-semibold text-gray-700 cursor-pointer"
            >
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
                disabled={isLoading || isSubmitting}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-xl transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Listing</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading || isSubmitting ? (
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
