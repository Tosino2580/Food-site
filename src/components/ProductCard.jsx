import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Check, TrendingDown } from 'lucide-react';
import { formatNaira, getItemEffectivePrice } from '../utils/formatters';

export default function ProductCard({
  product,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
  wholesaleMode
}) {
  const [justAdded, setJustAdded] = useState(false);

  // Determine current unit pricing with wholesale rule
  const effectivePricing = getItemEffectivePrice(product, cartQuantity || 1, wholesaleMode);
  const unitSavings = Math.max(0, product.retailPrice - product.wholesalePrice);
  const isWholesaleApplied = effectivePricing.isWholesale;

  const handleIncrement = () => {
    const nextQty = (cartQuantity || 0) + 1;
    if (cartQuantity === 0) {
      onAddToCart(product, 1);
    } else {
      onUpdateQuantity(product.id, nextQty);
    }
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      onUpdateQuantity(product.id, cartQuantity - 1);
    }
  };

  const handleInitialAdd = () => {
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Badges */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between gap-1 pointer-events-none">
        {product.badge ? (
          <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black bg-slate-900/85 backdrop-blur-xs text-white shadow-xs truncate max-w-[90px] sm:max-w-none">
            {product.badge}
          </span>
        ) : <span />}

        {unitSavings > 0 && (
          <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black bg-amber-400 text-amber-950 shadow-xs flex items-center gap-0.5 shrink-0">
            <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>-{formatNaira(unitSavings)}</span>
          </span>
        )}
      </div>

      <div>
        {/* Product Image */}
        <div className="relative pt-[68%] w-full bg-slate-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
            }}
          />
          {/* Pack Spec Pill */}
          <div className="absolute bottom-1.5 left-1.5 right-1.5 px-1.5 sm:px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[9px] sm:text-[10px] font-semibold text-slate-100 truncate">
            📦 {product.packSize}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-2.5 sm:p-3.5">
          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
            <span className="capitalize truncate max-w-[80px] sm:max-w-none">
              {product.category.replace('-', ' ')}
            </span>
            <span className={`font-semibold shrink-0 ${product.stock <= 10 ? 'text-amber-600' : 'text-emerald-700'}`}>
              ● {product.stock > 10 ? 'In Stock' : `${product.stock} left`}
            </span>
          </div>

          <h3 
            className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[32px] sm:min-h-[40px]" 
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Dual Price Box */}
          <div className="mt-2 p-1.5 sm:p-2 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 uppercase">
                Wholesale:
              </span>
              <span className="text-xs sm:text-base font-black text-emerald-700">
                {formatNaira(product.wholesalePrice)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-slate-500">
              <span>Retail:</span>
              <span className={`font-semibold ${isWholesaleApplied ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                {formatNaira(product.retailPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action / Stepper Area */}
      <div className="p-2.5 sm:p-3.5 pt-0">
        {cartQuantity > 0 ? (
          /* Active Cart Stepper */
          <div className="flex items-center justify-between border-2 border-emerald-600 rounded-xl bg-emerald-50/60 p-0.5">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-8 h-7 sm:h-8 flex items-center justify-center bg-white hover:bg-emerald-100 rounded-lg text-emerald-900 font-bold transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <div className="text-center">
              <span className="text-xs sm:text-sm font-black text-emerald-950">
                {cartQuantity} in cart
              </span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              className="w-8 h-7 sm:h-8 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-bold transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Initial Add Button */
          <button
            type="button"
            onClick={handleInitialAdd}
            className={`w-full py-2 px-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-900 hover:bg-emerald-600 text-white active:scale-98'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        )}
      </div>

    </div>
  );
}
