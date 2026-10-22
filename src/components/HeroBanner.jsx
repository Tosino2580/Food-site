import React from 'react';
import { 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  TrendingDown,
  Wheat,
  Package,
  Coffee,
  Flame,
  Cookie,
  ShoppingBag
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '../data/mockData';

const categoryIconMap = {
  ShoppingBag: ShoppingBag,
  Wheat: Wheat,
  Package: Package,
  Coffee: Coffee,
  Flame: Flame,
  Cookie: Cookie,
  Sparkles: Sparkles
};

export default function HeroBanner({
  selectedCategory,
  setSelectedCategory,
  onQuickSearch,
  wholesaleMode,
  setWholesaleMode
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-5 pb-6 sm:pt-8 sm:pb-10 px-3 sm:px-6 lg:px-8 border-b border-emerald-900/50">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-12 w-48 sm:w-80 h-48 sm:h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-left space-y-3 sm:space-y-4">
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Lagos Premier FMCG Wholesale Distributor</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Buy More, Save More on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Rice, Noodles, Provisions & Staples
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              Order directly at distributor carton rates with guaranteed weights and same-day delivery across Lagos.
            </p>

            {/* Quick Action Badges / Value Props */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-white">Wholesale Dual Pricing</h4>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 hidden sm:block">Up to 15% off</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-white">Same-Day Dispatch</h4>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 hidden sm:block">Across all Lagos zones</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-white">Factory Sealed Stock</h4>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 hidden sm:block">Original packs</p>
                </div>
              </div>
            </div>

            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-slate-300">
              <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">Popular:</span>
              {[
                "50kg Rice", 
                "Indomie Super Pack", 
                "Kings Oil 25L", 
                "Dangote Sugar 50kg", 
                "Hypo Bleach"
              ].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onQuickSearch(term)}
                  className="px-2 py-0.5 rounded-md bg-slate-800/90 hover:bg-emerald-800 hover:text-white border border-slate-700 text-slate-300 text-[10px] sm:text-[11px] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

          </div>

          {/* Right Highlight Card - Compact on mobile */}
          <div className="lg:col-span-4">
            <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-900/90 to-slate-900 border border-emerald-500/30 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
                    ₦
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-white">Wholesale Tier Savings</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[9px] font-black uppercase">
                  Distributor
                </span>
              </div>

              <p className="text-[11px] text-slate-300 mb-2.5 leading-tight">
                Automatic wholesale discounts when purchasing 2+ cartons or sacks.
              </p>

              <button
                type="button"
                onClick={() => setWholesaleMode(!wholesaleMode)}
                className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  wholesaleMode
                    ? 'bg-amber-400 text-amber-950 hover:bg-amber-300 shadow-md'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                }`}
              >
                <span>{wholesaleMode ? 'Wholesale Pricing Active ✓' : 'Enable Wholesale Prices'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Quick Category Pill Buttons (Horizontal Swipe on Mobile) */}
        <div id="category-scroll-container" className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
              Browse Categories
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold">
              ← Scroll to see all →
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
            {INITIAL_CATEGORIES.map((cat) => {
              const IconComp = categoryIconMap[cat.icon] || ShoppingBag;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-102 font-extrabold'
                      : 'bg-slate-800/90 hover:bg-slate-700/80 text-slate-300 border border-slate-700'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
