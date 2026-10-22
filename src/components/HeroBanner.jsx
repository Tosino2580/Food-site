import React from 'react';
import { 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Layers, 
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
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/50">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-left space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Lagos Premier FMCG Wholesale & Provisions Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Buy More, Save More on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Rice, Noodles, Provisions & Staples
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Order directly at distributor carton rates. Whether stocking your supermarket, restaurant kitchen, boarding school, or family pantry — enjoy transparent dual pricing, guaranteed weights, and rapid Lagos delivery.
            </p>

            {/* Quick Action Badges / Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Wholesale Dual Pricing</h4>
                  <p className="text-[11px] text-slate-400">Save up to 15% per carton</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Same-Day Dispatch</h4>
                  <p className="text-[11px] text-slate-400">Direct from Ikeja & Trade Fair</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Verified Factory Stock</h4>
                  <p className="text-[11px] text-slate-400">100% Original sealed packs</p>
                </div>
              </div>
            </div>

            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-300">
              <span className="text-slate-400 font-medium">Popular wholesale searches:</span>
              {[
                "50kg Mama's Pride Rice", 
                "Indomie Super Pack", 
                "Devon King's Oil 25L", 
                "Dangote Sugar 50kg", 
                "Hypo Bleach Carton"
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => onQuickSearch(term)}
                  className="px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-emerald-800 hover:text-white border border-slate-700 text-slate-300 text-[11px] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

          </div>

          {/* Right Highlight Card - Wholesale Advantage Banner */}
          <div className="lg:col-span-4">
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-900/90 to-slate-900 border border-emerald-500/30 shadow-2xl backdrop-blur-md">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider">
                Distributor Tier
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                  ₦
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Instant Bulk Savings</h3>
                  <p className="text-xs text-emerald-300">Automatic discounts on 2+ cartons</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Buy in carton or multi-bag quantities to automatically unlock wholesale pricing on all grain bags, provisions, and canned staples.
              </p>

              <div className="space-y-2 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Retail Price:</span>
                  <span className="line-through text-slate-400">₦19,500/carton</span>
                </div>
                <div className="flex justify-between items-center font-bold text-emerald-400">
                  <span>Wholesale Price:</span>
                  <span className="text-sm">₦18,100/carton</span>
                </div>
                <div className="text-[11px] text-amber-300 font-semibold text-right">
                  Save ₦14,000 on 10 cartons!
                </div>
              </div>

              <button
                onClick={() => setWholesaleMode(!wholesaleMode)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  wholesaleMode
                    ? 'bg-amber-400 text-amber-950 hover:bg-amber-300 shadow-lg shadow-amber-400/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                }`}
              >
                <span>{wholesaleMode ? 'Wholesale Pricing Is Activated ✓' : 'Activate Wholesale Mode Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Quick Category Pill Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Browse Wholesale Categories
            </h3>
            <span className="text-xs text-emerald-400 font-medium hidden sm:inline">
              Instant stock updates across Lagos warehouses
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {INITIAL_CATEGORIES.map((cat) => {
              const IconComp = categoryIconMap[cat.icon] || ShoppingBag;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105 font-bold'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700'
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
