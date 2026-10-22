import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Filter, Sparkles, RefreshCcw } from 'lucide-react';
import { formatNaira } from '../utils/formatters';

export default function ProductGrid({
  products,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  wholesaleMode,
  setWholesaleMode
}) {
  const [sortBy, setSortBy] = useState('featured');
  const [filterWholesaleOnly, setFilterWholesaleOnly] = useState(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.packSize.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Wholesale only filter
        if (filterWholesaleOnly) {
          const discount = p.retailPrice - p.wholesalePrice;
          if (discount < 1500) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.retailPrice - b.retailPrice;
        if (sortBy === 'price-high') return b.retailPrice - a.retailPrice;
        if (sortBy === 'savings') {
          const savingsA = a.retailPrice - a.wholesalePrice;
          const savingsB = b.retailPrice - b.wholesalePrice;
          return savingsB - savingsA;
        }
        // Default featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, filterWholesaleOnly, sortBy]);

  // Map cart items by id for fast quantity lookup
  const cartQtyMap = useMemo(() => {
    const map = {};
    cartItems.forEach((item) => {
      map[item.id] = item.qty;
    });
    return map;
  }, [cartItems]);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Control Bar: Filter, Active search badges, Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Wholesale & Retail Provisions
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {filteredProducts.length} items available
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Prices verified from central distribution centers in Lagos. All items guaranteed authentic.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Wholesale filter toggle */}
          <button
            onClick={() => setFilterWholesaleOnly(!filterWholesaleOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              filterWholesaleOnly
                ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>High Savings (₦1.5k+ Off)</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <span className="text-slate-400 mr-1">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer pr-2"
            >
              <option value="featured">Featured & Best Sellers</option>
              <option value="savings">Biggest Wholesale Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Filters if search is active */}
          {(searchQuery || selectedCategory !== 'all' || filterWholesaleOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilterWholesaleOnly(false);
              }}
              className="p-1.5 text-slate-500 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Reset all filters"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Search & Filter Indicators */}
      {searchQuery && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <span>
            Showing results matching: <strong className="font-bold">"{searchQuery}"</strong>
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline text-xs"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartQuantity={cartQtyMap[product.id] || 0}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
              wholesaleMode={wholesaleMode}
            />
          ))}
        </div>
      ) : (
        <div className="my-16 text-center max-w-md mx-auto p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No items match your criteria</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your search terms or clearing category filters to find what you are looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setFilterWholesaleOnly(false);
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Show All Products
          </button>
        </div>
      )}
    </section>
  );
}
