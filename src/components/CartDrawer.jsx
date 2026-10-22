import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { LAGOS_ZONES } from '../data/mockData';
import { formatNaira, getItemEffectivePrice } from '../utils/formatters';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedZone,
  setSelectedZone,
  cartTotals,
  onProceedToCheckout,
  wholesaleMode
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          
          {/* Header */}
          <div className="p-3.5 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">Your Shopping Cart</h2>
                <p className="text-[11px] text-slate-500">
                  {cartTotals.totalItemsCount} {cartTotals.totalItemsCount === 1 ? 'item' : 'items'} in order
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-lg cursor-pointer"
                  title="Clear Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Wholesale Savings Banner */}
          {cartTotals.totalWholesaleSavings > 0 && (
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 px-3.5 py-2 flex items-center justify-between text-[11px] sm:text-xs font-bold shadow-xs">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-100 shrink-0" />
                <span>You saved {formatNaira(cartTotals.totalWholesaleSavings)} with wholesale!</span>
              </div>
              <span className="bg-amber-900/20 px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider shrink-0">
                Applied
              </span>
            </div>
          )}

          {/* Lagos Delivery Zone & Free Delivery Progress */}
          <div className="p-3 sm:p-4 bg-emerald-50/70 border-b border-emerald-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1 text-slate-700 font-bold">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zone:</span>
              </div>
              <select
                value={selectedZone.id}
                onChange={(e) => {
                  const zone = LAGOS_ZONES.find((z) => z.id === e.target.value);
                  if (zone) setSelectedZone(zone);
                }}
                className="text-xs font-black text-emerald-800 bg-white border border-emerald-300 rounded-lg px-2 py-1 outline-none cursor-pointer max-w-[200px] truncate"
              >
                {LAGOS_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name.split('&')[0]} ({formatNaira(zone.fee)})
                  </option>
                ))}
              </select>
            </div>

            {/* Free shipping progress bar */}
            <div>
              <div className="flex justify-between items-center text-[10px] sm:text-[11px] mb-1 font-medium">
                {cartTotals.isFreeDelivery ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    🎉 Free Lagos Delivery Unlocked!
                  </span>
                ) : (
                  <span className="text-slate-600 truncate">
                    Add <strong className="text-emerald-700">{formatNaira(cartTotals.remainingForFreeDelivery)}</strong> for Free Delivery
                  </span>
                )}
                <span className="text-slate-500 font-bold ml-1">{Math.round(cartTotals.progressToFreeDelivery)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    cartTotals.isFreeDelivery ? 'bg-emerald-500' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${cartTotals.progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                  <ShoppingBag className="w-7 h-7 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-700 text-sm">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-0.5 max-w-xs">
                  Stock up on rice, packaged foods, and household provisions at wholesale rates.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const effectivePricing = getItemEffectivePrice(item, item.qty, wholesaleMode);
                const itemTotal = effectivePricing.unitPrice * item.qty;

                return (
                  <div key={item.id} className="pt-2.5 first:pt-0 flex gap-2.5 items-start">
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                      }}
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight truncate" title={item.name}>
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                        {item.packSize}
                      </p>

                      {/* Pricing Tag */}
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">
                          {formatNaira(effectivePricing.unitPrice)}
                        </span>
                        {effectivePricing.isWholesale ? (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded">
                            Wholesale Tier
                          </span>
                        ) : (
                          <span className="text-[9px] text-slate-400">
                            (2+ for wholesale)
                          </span>
                        )}
                      </div>

                      {/* Stepper & Total */}
                      <div className="mt-1.5 flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
                            className="p-1 hover:bg-slate-200/60 rounded-l-lg transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3 text-slate-600" />
                          </button>
                          <span className="w-6 text-center text-xs font-black text-slate-800">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
                            className="p-1 hover:bg-slate-200/60 rounded-r-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3 text-slate-600" />
                          </button>
                        </div>

                        <span className="text-xs font-black text-emerald-800">
                          {formatNaira(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-3.5 sm:p-5 border-t border-slate-200 bg-slate-50/95 space-y-2.5">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatNaira(cartTotals.subtotal)}</span>
                </div>

                {cartTotals.totalWholesaleSavings > 0 && (
                  <div className="flex justify-between text-amber-700 font-medium">
                    <span>Wholesale Bulk Discount:</span>
                    <span>-{formatNaira(cartTotals.totalWholesaleSavings)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({selectedZone.name.split('&')[0]}):</span>
                  {cartTotals.isFreeDelivery ? (
                    <span className="font-black text-emerald-700 uppercase text-[10px]">Free Delivery</span>
                  ) : (
                    <span className="font-bold text-slate-900">{formatNaira(cartTotals.deliveryFee)}</span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs sm:text-sm font-black text-slate-900">Total Order Amount:</span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-emerald-800">
                    {formatNaira(cartTotals.finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Proceed to Lagos Delivery Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by Paystack & Flutterwave 256-bit encryption</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
