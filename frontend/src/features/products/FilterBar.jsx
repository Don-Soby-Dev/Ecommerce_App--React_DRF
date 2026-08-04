import React from "react";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";

const FilterBar = ({ categories, filters, onFilterChange, onReset }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold text-lg">
        <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
        <span>Filter Products</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              name="search"
              value={filters.search || ""}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={filters.category || ""}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all text-gray-700"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id || cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Min Price ($)
          </label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice || ""}
            onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            placeholder="0"
            min="0"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Max Price ($)
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice || ""}
            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            placeholder="1000"
            min="0"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-sm transition-all"
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
