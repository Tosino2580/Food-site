import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  ShieldCheck, 
  ChevronDown, 
  X, 
  Percent,
  SlidersHorizontal,
  Store
} from 'lucide-react';
import { LAGOS_ZONES } from '../data/mockData';
import { formatNaira } from '../utils/formatters';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedZone,
  setSelectedZone,
  cartTotals,
  setIsCartOpen,
  currentUser,
  setIsAuthOpen,
  setIsAccountOpen,
  isAdminView,
  setIsAdminView,
  wholesaleMode,
  setWholesaleMode,
  onOpenCategoriesModal,
  currentWholesaler,
  setIsWholesalerAuthOpen,
  setIsWholesalerDashOpen,
  onOpenWholesalerPortal
}) {
  const [isZoneDropdownOpen, setIsZoneDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      
      {/* Top Banner Alert / Trust Bar (Hidden or ultra-compact on mobile) */}
      <div className="bg-emerald-950 text-emerald-100 px-3 sm:px-4 py-1 text-[11px] sm:text-xs font-medium border-b border-emerald-900 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-1.5 truncate min-w-0">
            <span className="bg-emerald-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              Lagos
            </span>
            <span className="truncate text-slate-200 text-[10px] sm:text-xs">
              ⚡ Same-Day Delivery across Lagos
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Wholesale Price Lock Switch */}
            <button 
              type="button"
              onClick={() => setWholesaleMode(!wholesaleMode)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] sm:text-[11px] transition-all cursor-pointer ${
                wholesaleMode 
                  ? 'bg-amber-400 text-amber-950 shadow-xs' 
                  : 'bg-emerald-800/80 text-emerald-200 hover:text-white'
              }`}
              title="Toggle Wholesale price lock for all bulk orders"
            >
              <Percent className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>{wholesaleMode ? 'Wholesale On' : 'Wholesale Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Top Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 pb-2">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-100" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Wholesale<span className="text-emerald-600">Hub</span>
                  </span>
                  <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-wider px-1 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    B2B & Retail
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden md:block">
                  Wholesale Prices, Delivered to Your Doorstep
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Location Selector */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setIsZoneDropdownOpen(!isZoneDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full border border-slate-200 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span className="max-w-[120px] truncate">{selectedZone.name.split('&')[0]}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isZoneDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in">
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Lagos Delivery Zone
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {LAGOS_ZONES.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => {
                        setSelectedZone(zone);
                        setIsZoneDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                        selectedZone.id === zone.id ? 'bg-emerald-50 font-bold text-emerald-900' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <p>{zone.name}</p>
                        <span className="text-[10px] text-slate-400">{zone.estimatedTime}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700">
                        {formatNaira(zone.fee)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Search Bar (Hidden on mobile, mobile has dedicated full-width row below) */}
          <div className="hidden md:block flex-1 max-w-md mx-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 50kg Rice, Indomie carton, Devon Kings..."
                className="w-full pl-9 pr-8 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Admin Toggle Button */}
            <button
              type="button"
              onClick={() => setIsAdminView(!isAdminView)}
              className={`flex items-center justify-center p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isAdminView
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title={isAdminView ? 'Exit Admin View' : 'Staff Admin Portal'}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isAdminView ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="hidden sm:inline ml-1">{isAdminView ? 'Exit Admin' : 'Admin'}</span>
            </button>

            {/* Wholesaler Portal Button */}
            <button
              type="button"
              onClick={onOpenWholesalerPortal || (() => {
                if (currentWholesaler) {
                  setIsWholesalerDashOpen(true);
                } else {
                  setIsWholesalerAuthOpen(true);
                }
              })}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
              title={currentWholesaler ? `Open Dashboard (${currentWholesaler.businessName})` : 'Wholesaler Login / Registration'}
            >
              <Store className="w-3.5 h-3.5 text-teal-200 shrink-0" />
              <span>Dashboard</span>
            </button>

            {/* Account / Auth Button (desktop only, mobile has it on bottom nav) */}
            {currentUser ? (
              <button
                type="button"
                onClick={() => setIsAccountOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold transition-colors cursor-pointer"
                title="Open Customer Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                  {currentUser.fullName ? currentUser.fullName[0] : 'U'}
                </div>
                <span className="truncate max-w-[90px]">{currentUser.fullName.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart Trigger Button (Compact icon badge on mobile, full price on sm+) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartTotals.totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-emerald-600">
                    {cartTotals.totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-extrabold text-xs sm:text-sm ml-0.5">
                {formatNaira(cartTotals.subtotal)}
              </span>
            </button>

          </div>

        </div>

        {/* Dedicated Mobile Search & Location Row (Balanced full width) */}
        <div className="md:hidden mt-2 flex items-center gap-1.5">
          {/* Mobile Location Pill Trigger */}
          <button
            type="button"
            onClick={() => setIsZoneDropdownOpen(!isZoneDropdownOpen)}
            className="flex items-center gap-1 px-2.5 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-xs font-bold text-slate-700 border border-slate-200/80 shrink-0 transition-colors cursor-pointer"
            title="Select Lagos Location"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="max-w-[70px] truncate">{selectedZone.name.split(' ')[0]}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rice, noodles, oil..."
              className="w-full pl-8 pr-7 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs text-slate-900 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu for Lagos Zones */}
        {isZoneDropdownOpen && (
          <div className="lg:hidden mt-2 p-3 bg-white rounded-2xl shadow-xl border border-slate-200 animate-fade-in z-50">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                Select Your Delivery Zone
              </span>
              <button
                type="button"
                onClick={() => setIsZoneDropdownOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-56 overflow-y-auto">
              {LAGOS_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    setSelectedZone(zone);
                    setIsZoneDropdownOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                    selectedZone.id === zone.id 
                      ? 'bg-emerald-100 text-emerald-950 font-bold' 
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{zone.name}</p>
                    <span className="text-[10px] text-slate-400">{zone.estimatedTime}</span>
                  </div>
                  <span className="text-emerald-700 font-black">{formatNaira(zone.fee)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
