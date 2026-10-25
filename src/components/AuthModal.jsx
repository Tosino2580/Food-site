import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, Store, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { INITIAL_USER } from '../data/mockData';

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  setCurrentUser
}) {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authType, setAuthType] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-fill demo credentials for immediate testing
  const handleQuickDemoLogin = () => {
    setCurrentUser(INITIAL_USER);
    setSuccessMsg('Logged in as verified wholesale distributor!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      const user = {
        ...INITIAL_USER,
        fullName: fullName || INITIAL_USER.fullName,
        email: email || INITIAL_USER.email,
        phone: phone || INITIAL_USER.phone
      };
      setCurrentUser(user);
      setSuccessMsg('Welcome back to Wholesale Hub!');
    } else {
      const newUser = {
        id: `usr-${Date.now()}`,
        fullName: fullName || 'New Customer',
        email: email || 'customer@wholesalehub.ng',
        phone: phone || '+234 803 000 1122',
        businessName: businessName || 'Personal / Household',
        accountTier: businessName ? 'Wholesale Business Partner' : 'Standard Retail Customer',
        savedAddresses: [
          {
            id: `addr-${Date.now()}`,
            title: 'Primary Lagos Delivery',
            street: '12 Marina Road, Lagos Island',
            landmark: 'Near CMS Bus stop',
            zoneId: 'island',
            zoneName: 'Victoria Island, Ikoyi & Lagos Island',
            phone: phone || '+234 803 000 1122',
            isDefault: true
          }
        ]
      };
      setCurrentUser(newUser);
      setSuccessMsg('Account created successfully!');
    }

    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Wholesale Hub Account</span>
          </div>

          <h2 className="text-xl font-black">
            {authMode === 'login' ? 'Sign In to Your Account' : 'Create Free Customer Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Access wholesale distributor pricing, saved Lagos addresses, and 1-click reordering.
          </p>

          {/* Quick Demo Fill Bar */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="mt-4 w-full py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-98"
          >
            <span>⚡ 1-Click Demo Login (Alhaji Musa)</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              authMode === 'login'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              authMode === 'register'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Register Wholesale / Retail
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Registration Fields */}
          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name / Contact Person *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chief Babatunde Adeleke"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business / Store Name (Optional for Wholesale)
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Adeleke Supermarket & Provision Stores"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email vs Phone Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                {authType === 'email' ? 'Email Address *' : 'Nigerian Phone Number *'}
              </label>
              <button
                type="button"
                onClick={() => setAuthType(authType === 'email' ? 'phone' : 'email')}
                className="text-[11px] font-semibold text-emerald-700 hover:underline"
              >
                Use {authType === 'email' ? 'Phone Number' : 'Email Address'}
              </button>
            </div>

            {authType === 'email' ? (
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.ng"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                  required={authType === 'email'}
                />
              </div>
            ) : (
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 803 123 4567"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                  required={authType === 'phone'}
                />
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all"
          >
            {authMode === 'login' ? 'Sign In to Dashboard' : 'Register & Start Shopping'}
          </button>

          <p className="text-[11px] text-center text-slate-400">
            By signing in, you agree to Wholesale Hub Terms of Wholesale Supply in Lagos.
          </p>
        </form>

      </div>
    </div>
  );
}
