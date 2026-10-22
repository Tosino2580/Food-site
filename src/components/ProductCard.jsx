import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Sparkles, Check, TrendingDown } from 'lucide-react';
import { formatNaira, getItemEffectivePrice } from '../utils/formatters';

export default function ProductCard({
  product,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
  wholesaleMode
}) {
  const [localQty, setLocalQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Determine current unit pricing with wholesale rule
  const effectivePricing = getItemEffectivePrice(product, localQty, wholesaleMode);
  const unitSavings = Math.max(0, product.retailPrice - product.wholesalePrice);
  const isWholesaleApplied = effectivePricing.isWholesale;

  const handleIncrement = () => {
    const newQty = localQty + 1;
    setLocalQty(newQty);
    if (cartQuantity > 0) {
      onUpdateQuantity(product.id, newQty);
    }
  };

  const handleDecrement = () => {
    if (localQty > 1) {
      const newQty = localQty - 1;
      setLocalQty(newQty);
      if (cartQuantity > 0) {
        onUpdateQuantity(product.id, newQty);
      }
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, localQty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Quick set to wholesale threshold
  const setWholesaleThreshold = () => {
    const minQty = product.wholesaleMinQty || 2;
    setLocalQty(minQty);
    if (cartQuantity > 0) {
      onUpdateQuantity(product.id, minQty);
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-1 pointer-events-none">
        {product.badge && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white shadow-xs">
            {product.badge}
          </span>
        )}
        {unitSavings > 0 && (
          <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 shadow-xs flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            Save {formatNaira(unitSavings)}/unit
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <div className="relative pt-[65%] w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback placeholder image
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {/* Pack Size Overlay */}
        <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-xs text-[11px] font-semibold text-slate-100 truncate">
          📦 {product.packSize}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
            <span className={`text-[11px] font-semibold ${product.stock <= 10 ? 'text-amber-600' : 'text-emerald-700'}`}>
              ● {product.stock > 10 ? `In Stock (${product.stock} ${product.unit}s)` : `Low Stock: ${product.stock} left`}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2" title={product.name}>
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Dual Pricing Display */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 space-y-1">
            {/* Wholesale Price Highlight */}
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                Wholesale Price:
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold uppercase">
                  {wholesaleMode ? 'Active' : `${product.wholesaleMinQty}+ ${product.unit}s`}
                </span>
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-700">
                {formatNaira(product.wholesalePrice)}
              </span>
            </div>

            {/* Retail Price Display */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Standard Retail:</span>
              <span className={`font-semibold ${isWholesaleApplied ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {formatNaira(product.retailPrice)}
              </span>
            </div>

            {/* Hint to unlock wholesale */}
            {!isWholesaleApplied && !wholesaleMode && (
              <button
                type="button"
                onClick={setWholesaleThreshold}
                className="w-full text-left text-[11px] text-amber-700 font-semibold hover:underline flex items-center justify-between pt-0.5"
              >
                <span>Add {product.wholesaleMinQty} to save {formatNaira(unitSavings * product.wholesaleMinQty)}!</span>
                <span className="text-emerald-700 font-bold">Apply →</span>
              </button>
            )}
          </div>

          {/* Quantity Controls & Add to Cart */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {/* Stepper */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={localQty <= 1}
                  className="p-2 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 text-slate-700" />
                </button>
                <span className="w-8 text-center text-xs font-black text-slate-900">
                  {localQty}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="p-2 hover:bg-slate-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 text-slate-700" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : cartQuantity > 0
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-900 hover:bg-emerald-600 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added {localQty}!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{cartQuantity > 0 ? `Update (${cartQuantity} in Cart)` : 'Add to Cart'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick bulk pack button */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>Unit: {product.unit}</span>
              <button 
                type="button"
                onClick={() => {
                  const bulkQty = 5;
                  setLocalQty(bulkQty);
                  onAddToCart(product, bulkQty);
                }}
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
              >
                +5 Bulk Quick Add
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
