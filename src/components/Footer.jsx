import React from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard,
  MessageCircle,
  Store
} from 'lucide-react';
import { LAGOS_ZONES } from '../data/mockData';

export default function Footer({ onCategoryClick, onOpenAdmin, onOpenWholesalerPortal }) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-8 sm:pt-12 pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Daily Lagos Fleet Dispatch</h4>
              <p className="text-xs text-slate-400 mt-0.5">Prompt delivery across Mainland & Island zones.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Wholesale Price Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Direct distributor tier pricing without market markups.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Guaranteed 4hr Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Express slot available on urgent stock-outs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Flexible Nigerian Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">Paystack, Flutterwave, USSD & Corporate Transfer.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Wholesale<span className="text-emerald-500">Hub</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Nigeria's dependable FMCG food provision supply chain. Serving top Lagos retail supermarkets, culinary restaurants, caterers, boarding schools, and Nigerian families with direct wholesale prices.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Central Hub: 14 Commercial Avenue, Ikeja, Lagos State</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Phone / WhatsApp Desk: +234 803 456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Orders: orders@wholesalehub.ng</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Food Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onCategoryClick('rice-grains')} className="hover:text-emerald-400 transition-colors">
                  Rice & Grain Bags (50kg / 25kg)
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('packaged-foods')} className="hover:text-emerald-400 transition-colors">
                  Noodles & Pasta Cartons
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('cooking-ingredients')} className="hover:text-emerald-400 transition-colors">
                  Vegetable Cooking Oils & Tomatoes
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('beverages')} className="hover:text-emerald-400 transition-colors">
                  Milk, Milo & Tea Cartons
                </button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('household-provisions')} className="hover:text-emerald-400 transition-colors">
                  Bleach, Detergents & Provisions
                </button>
              </li>
            </ul>
          </div>

          {/* Lagos Delivery Coverage Zones */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Lagos Delivery Zones
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {LAGOS_ZONES.map((zone) => (
                <span
                  key={zone.id}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                >
                  📍 {zone.name.split('&')[0]}
                </span>
              ))}
            </div>

            <div className="pt-3">
              <a
                href="https://wa.me/2348034567890?text=Hello%20Wholesale%20Hub,%20I%20would%20like%20to%20make%20a%20wholesale%20enquiry"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+234 803 456 7890)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Admin Trigger */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Wholesale Hub & Distribution Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={onOpenAdmin}
              className="text-emerald-400 hover:underline font-semibold text-[11px]"
            >
              Staff Portal Access
            </button>
            <span>•</span>
            <button
              onClick={onOpenWholesalerPortal}
              className="flex items-center gap-1 text-teal-400 hover:underline font-semibold text-[11px]"
            >
              <Store className="w-3 h-3" />
              Sell on WholesaleHub
            </button>
            <span>•</span>
            <span className="text-[11px]">Built for Lagos Mobile & Desktop Shoppers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
