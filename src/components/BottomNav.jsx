import React from 'react';
import { 
  Store, 
  Layers, 
  Percent, 
  ShoppingBag, 
  User, 
  ShieldCheck 
} from 'lucide-react';
import { formatNaira } from '../utils/formatters';

export default function BottomNav({
  selectedCategory,
  setSelectedCategory,
  cartTotals,
  setIsCartOpen,
  currentUser,
  setIsAuthOpen,
  setIsAccountOpen,
  wholesaleMode,
  setWholesaleMode,
  isAdminView,
  setIsAdminView,
  currentWholesaler,
  setIsWholesalerAuthOpen,
  setIsWholesalerDashOpen,
  onOpenWholesalerPortal
}) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-1.5 py-1.5 safe-area-bottom">
      <div className="grid grid-cols-6 items-center justify-between text-center gap-0.5">
        
        {/* 1. Store / Home */}
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            selectedCategory === 'all' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Store</span>
        </button>

        {/* 2. Categories */}
        <button
          type="button"
          onClick={() => {
            const catElem = document.getElementById('category-scroll-container');
            if (catElem) {
              catElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 rounded-xl transition-colors"
        >
          <Layers className="w-5 h-5 mb-0.5 text-slate-600" />
          <span className="text-[10px] leading-tight">Categories</span>
        </button>

        {/* 3. Wholesale Toggle */}
        <button
          type="button"
          onClick={() => setWholesaleMode(!wholesaleMode)}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            wholesaleMode
              ? 'text-amber-900 font-black'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center mb-0.5 ${
            wholesaleMode ? 'bg-amber-400 text-amber-950 font-black' : 'text-slate-600'
          }`}>
            <Percent className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] leading-tight">
            {wholesaleMode ? 'Wholesale' : 'Retail'}
          </span>
        </button>

        {/* 4. Cart Button */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-slate-500 hover:text-emerald-700 rounded-xl transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-emerald-700" />
            {cartTotals.totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-amber-400 text-amber-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {cartTotals.totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black text-emerald-800 leading-tight">
            {cartTotals.totalItemsCount > 0 ? formatNaira(cartTotals.subtotal) : 'Cart'}
          </span>
        </button>

        {/* 5. Wholesale Portal (mobile) */}
        <button
          type="button"
          onClick={onOpenWholesalerPortal || (() => {
            if (currentWholesaler) {
              setIsWholesalerDashOpen(true);
            } else {
              setIsWholesalerAuthOpen(true);
            }
          })}
          className="flex flex-col items-center justify-center py-1 rounded-xl transition-colors text-teal-700 font-bold hover:text-teal-900"
        >
          <Store className="w-5 h-5 mb-0.5 text-teal-600" />
          <span className="text-[10px] leading-tight font-black text-teal-800">
            {currentWholesaler ? 'Dashboard' : 'Wholesaler'}
          </span>
        </button>

        {/* 6. Account / Profile */}
        <button
          type="button"
          onClick={() => {
            if (currentUser) {
              setIsAccountOpen(true);
            } else {
              setIsAuthOpen(true);
            }
          }}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 rounded-xl transition-colors"
        >
          {currentUser ? (
            <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[9px] mb-0.5">
              {currentUser.fullName ? currentUser.fullName[0] : 'U'}
            </div>
          ) : (
            <User className="w-5 h-5 mb-0.5 text-slate-600" />
          )}
          <span className="text-[10px] leading-tight">
            {currentUser ? 'Account' : 'Login'}
          </span>
        </button>

      </div>
    </nav>
  );
}
