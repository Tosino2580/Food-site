import React, { useState } from 'react';
import {
  X, Store, Mail, Lock, User, Phone, Eye, EyeOff,
  ShieldCheck, Sparkles, ArrowRight, CheckCircle, AlertCircle
} from 'lucide-react';
import { DEMO_WHOLESALER } from '../data/mockData';

export default function WholesalerAuth({ isOpen, onClose, setCurrentWholesaler }) {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regBusinessName, setRegBusinessName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleQuickDemo = () => {
    setLoading(true);
    setTimeout(() => {
      const wholesalers = JSON.parse(localStorage.getItem('wholesalehub_wholesalers') || '[]');
      if (!wholesalers.find(w => w.id === DEMO_WHOLESALER.id)) {
        localStorage.setItem('wholesalehub_wholesalers', JSON.stringify([...wholesalers, DEMO_WHOLESALER]));
      }
      localStorage.setItem('wholesalehub_current_wholesaler', JSON.stringify(DEMO_WHOLESALER));
      setCurrentWholesaler(DEMO_WHOLESALER);
      setSuccess('Welcome back, Tosino! Redirecting to your dashboard...');
      setLoading(false);
      setTimeout(() => { setSuccess(''); onClose(); }, 1000);
    }, 800);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) { setError('Please fill in all fields.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const wholesalers = JSON.parse(localStorage.getItem('wholesalehub_wholesalers') || '[]');
      const found = wholesalers.find(w => w.email.toLowerCase() === loginEmail.toLowerCase());
      if (found) {
        localStorage.setItem('wholesalehub_current_wholesaler', JSON.stringify(found));
        setCurrentWholesaler(found);
        setSuccess(`Welcome back, ${found.ownerName}!`);
        setLoading(false);
        setTimeout(() => { setSuccess(''); onClose(); }, 900);
      } else {
        setError('No wholesaler account found with that email. Please register.');
        setLoading(false);
      }
    }, 900);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regBusinessName || !regOwnerName || !regEmail || !regPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const wholesalers = JSON.parse(localStorage.getItem('wholesalehub_wholesalers') || '[]');
      const exists = wholesalers.find(w => w.email.toLowerCase() === regEmail.toLowerCase());
      if (exists) {
        setError('An account with this email already exists. Please log in.');
        setLoading(false);
        return;
      }
      const newWholesaler = {
        id: `ws-${Date.now()}`,
        businessName: regBusinessName,
        ownerName: regOwnerName,
        email: regEmail,
        phone: regPhone || '+234 800 000 0000',
        status: 'active',
        joinedDate: new Date().toISOString().split('T')[0],
        productsCount: 0,
        totalSales: 0,
        avatar: null,
        description: '',
        tier: 'Verified Wholesaler'
      };
      localStorage.setItem('wholesalehub_wholesalers', JSON.stringify([...wholesalers, newWholesaler]));
      localStorage.setItem('wholesalehub_current_wholesaler', JSON.stringify(newWholesaler));
      setCurrentWholesaler(newWholesaler);
      setSuccess('Registration successful! Welcome to WholesaleHub.');
      setLoading(false);
      setTimeout(() => { setSuccess(''); onClose(); }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 px-8 pt-8 pb-10 text-white overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full blur-xl" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">WholesaleHub</div>
              <div className="text-xl font-black">Wholesaler Portal</div>
            </div>
          </div>
          <p className="relative text-sm text-emerald-100 leading-relaxed">
            {mode === 'login' ? 'Sign in to manage your products & sales dashboard.' : 'Create your wholesale business account and start selling.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-50 border-b border-slate-200">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setSuccess(''); }}
              className={`flex-1 py-3.5 text-sm font-bold transition-all ${mode === m ? 'bg-white text-emerald-700 border-b-2 border-emerald-600 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {m === 'login' ? '🔑 Sign In' : '✨ Register Business'}
            </button>
          ))}
        </div>

        <div className="px-8 py-6 max-h-[60vh] overflow-y-auto scrollbar-none">
          {success && (
            <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3">
              <CheckCircle className="w-4 h-4 shrink-0" />{success}
            </div>
          )}
          {error && (
            <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="your@business.ng"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 active:scale-98">
                {loading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Sign In to Dashboard</>}
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <div className="relative text-center"><span className="bg-white px-3 text-xs text-slate-400 font-medium">or</span></div>
              </div>
              <button type="button" onClick={handleQuickDemo} disabled={loading}
                className="w-full py-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Quick Demo Login (Tosino Wholesale)
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {[
                { label: 'Business Name *', icon: Store, val: regBusinessName, set: setRegBusinessName, placeholder: 'e.g. Adewale Distributors Ltd', type: 'text' },
                { label: "Owner's Full Name *", icon: User, val: regOwnerName, set: setRegOwnerName, placeholder: 'e.g. Adewale Babatunde', type: 'text' },
                { label: 'Business Email *', icon: Mail, val: regEmail, set: setRegEmail, placeholder: 'owner@business.ng', type: 'email' },
                { label: 'Phone Number', icon: Phone, val: regPhone, set: setRegPhone, placeholder: '+234 800 000 0000', type: 'tel' },
              ].map(({ label, icon: Icon, val, set, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={placeholder}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="password" value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} placeholder="Repeat password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>Instant Activation: Your wholesale account goes live immediately. You can start uploading and selling products right away.</span>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 active:scale-98">
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  : <><Sparkles className="w-4 h-4" /> Create Wholesale Account</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
