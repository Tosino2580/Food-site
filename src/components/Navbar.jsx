import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  User, 
  ShieldCheck, 
  ChevronDown, 
  X, 
  Sparkles,
  PhoneCall,
  Percent
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
  setWholesaleMode
}) {
  const [isZoneDropdownOpen, setIsZoneDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Alert / Trust Bar */}
      <div className="bg-emerald-900 text-emerald-100 px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-700/80 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Lagos Fast Delivery
            </span>
            <span className="hidden sm:inline">🚚 Same-day dispatch on orders placed before 2:00 PM across all Lagos zones!</span>
            <span className="sm:hidden">🚚 Fast same-day Lagos dispatch</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setWholesaleMode(!wholesaleMode)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold transition-all ${
                wholesaleMode 
                  ? 'bg-amber-400 text-amber-950 shadow-xs' 
                  : 'bg-emerald-800 text-emerald-200 hover:text-white'
              }`}
              title="Toggle Wholesale price lock for all bulk orders"
            >
              <Percent className="w-3 h-3" />
              <span>{wholesaleMode ? 'Wholesale Pricing Active' : 'Enable Wholesale Tier'}</span>
            </button>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-200 hover:text-white">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>Wholesale Desk: +234 803 456 7890</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 lg:gap-8">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 text-emerald-100" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Opeyemi<span className="text-emerald-600">Foods</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 border border-emerald-300">
                    B2B & Retail
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Wholesale Prices, Delivered to Your Doorstep
                </p>
              </div>
            </a>

            {/* Location Selector Pill */}
            <div className="relative hidden xl:block">
              <button
                type="button"
                onClick={() => setIsZoneDropdownOpen(!isZoneDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-full border border-slate-200 transition-colors"
                title="Change delivery location"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="max-w-[130px] truncate">{selectedZone.name.split('&')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isZoneDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Lagos Delivery Zone
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {LAGOS_ZONES.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => {
                          setSelectedZone(zone);
                          setIsZoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                          selectedZone.id === zone.id ? 'bg-emerald-50/70 font-bold text-emerald-800' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <p>{zone.name}</p>
                          <span className="text-[10px] text-slate-400">{zone.estimatedTime}</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700">
                          {formatNaira(zone.fee)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 50kg Rice, Indomie carton, Devon Kings, Bleach..."
                className="w-full pl-10 pr-9 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons: Admin Toggle, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Admin Toggle Button */}
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                isAdminView
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
              }`}
              title="Toggle Staff Admin & Inventory Dashboard"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isAdminView ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="hidden md:inline">{isAdminView ? 'Exit Admin' : 'Admin Portal'}</span>
            </button>

            {/* Account / Auth Button */}
            {currentUser ? (
              <button
                onClick={() => setIsAccountOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold transition-colors"
                title="Open Customer Dashboard"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px]">
                  {currentUser.fullName ? currentUser.fullName[0] : 'U'}
                </div>
                <div className="text-left hidden lg:block leading-tight">
                  <p className="font-bold truncate max-w-[110px]">{currentUser.fullName.split(' ')[0]}</p>
                  <span className="text-[10px] text-emerald-700">Dashboard</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/25 active:scale-95 transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartTotals.totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-amber-400 text-amber-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-emerald-600 animate-pulse">
                    {cartTotals.totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-extrabold">
                {formatNaira(cartTotals.subtotal)}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Location Selector Bar */}
        <div className="xl:hidden mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={() => setIsZoneDropdownOpen(!isZoneDropdownOpen)}
            className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-medium"
          >
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>Delivering to: <strong className="text-slate-900">{selectedZone.name}</strong></span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            {selectedZone.estimatedTime}
          </span>
        </div>

        {/* Mobile dropdown popup */}
        {isZoneDropdownOpen && (
          <div className="xl:hidden mt-2 p-2 bg-white rounded-xl shadow-xl border border-slate-200">
            <p className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase">Select Lagos Zone</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-48 overflow-y-auto">
              {LAGOS_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    setSelectedZone(zone);
                    setIsZoneDropdownOpen(false);
                  }}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                    selectedZone.id === zone.id ? 'bg-emerald-100 text-emerald-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{zone.name}</span>
                  <span className="text-emerald-700 font-semibold">{formatNaira(zone.fee)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
