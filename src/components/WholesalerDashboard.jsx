import React, { useState, useEffect } from 'react';
import {
  X, Store, Package, Plus, BarChart2, Bell, User, Settings,
  TrendingUp, ShoppingBag, DollarSign, Eye, Edit3, Trash2,
  Upload, CheckCircle, XCircle, Clock, AlertTriangle, Star,
  ArrowUp, ArrowDown, Search, Filter, ChevronRight, LogOut,
  Boxes, Tag, FileText, Image, Save, RefreshCw,
  ArrowLeft, AlertCircle, Camera, Menu
} from 'lucide-react';
import { INITIAL_CATEGORIES, DEMO_WHOLESALER } from '../data/mockData';
import { formatNaira } from '../utils/formatters';

const SAMPLE_WS_PRODUCTS = [
  {
    id: 'wsp-1', name: "Tosino's Premium Ponmo (Cow Skin)", category: 'packaged-foods',
    packSize: 'Carton of 20 packs x 500g', unit: 'Carton',
    retailPrice: 32000, wholesalePrice: 28500, wholesaleMinQty: 3,
    moq: '3 Cartons', stock: 45, badge: 'Local Delicacy', featured: true,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80',
    description: 'Authentic Nigerian ponmo (cow skin), carefully processed and hygienically packaged.',
    status: 'approved', wholesalerId: 'ws-001', wholesalerName: 'Tosino Wholesale Distributors',
    views: 342, orders: 18, revenue: 513000
  },
  {
    id: 'wsp-2', name: "Tosino's Dried Stockfish (Panla)", category: 'cooking-ingredients',
    packSize: 'Bundle of 10 pieces (Medium Size)', unit: 'Bundle',
    retailPrice: 18500, wholesalePrice: 16200, wholesaleMinQty: 5,
    moq: '5 Bundles', stock: 30, badge: 'Fresh Stock', featured: true,
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80',
    description: 'Premium Norwegian stockfish (panla), dried to perfection for Nigerian soups and stews.',
    status: 'approved', wholesalerId: 'ws-001', wholesalerName: 'Tosino Wholesale Distributors',
    views: 218, orders: 12, revenue: 194400
  },
  {
    id: 'wsp-3', name: "Tosino's Palm Oil (Grade A)", category: 'cooking-ingredients',
    packSize: '25 Litres Sealed Jerrycan', unit: 'Keg',
    retailPrice: 45000, wholesalePrice: 41000, wholesaleMinQty: 2,
    moq: '2 Kegs', stock: 20, badge: 'Farm Fresh', featured: false,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    description: 'Pure unrefined red palm oil sourced directly from Ondo state farms.',
    status: 'approved', wholesalerId: 'ws-001', wholesalerName: 'Tosino Wholesale Distributors',
    views: 54, orders: 0, revenue: 0
  }
];

const NOTIFICATIONS = [
  { id: 'n1', type: 'success', title: 'Product Approved', message: "Your product 'Tosino's Dried Stockfish' has been approved and is now live.", time: '2 hours ago', read: false },
  { id: 'n2', type: 'order', title: 'New Order Received', message: "You have a new order for 'Tosino's Premium Ponmo' – 5 Cartons.", time: '4 hours ago', read: false },
  { id: 'n3', type: 'warning', title: 'Low Stock Alert', message: "Palm Oil (Grade A) is running low. Only 20 units left.", time: '1 day ago', read: true },
  { id: 'n4', type: 'info', title: 'Account Verified', message: "Your wholesaler account has been verified by our admin team.", time: '3 days ago', read: true },
];

const TABS = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'products', label: 'My Products', icon: Package },
  { id: 'upload', label: 'Upload Product', icon: Plus },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function WholesalerDashboard({
  isOpen, onClose, currentWholesaler, setCurrentWholesaler,
  onProductsUpdated, allProducts, setAllProducts
}) {
  if (!isOpen || !currentWholesaler) return null;
  const activeWholesaler = currentWholesaler;
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    name: '', category: 'kitchen-utensils', packSize: '', unit: 'Carton',
    retailPrice: '', wholesalePrice: '', wholesaleMinQty: '2', moq: '',
    stock: '50', badge: 'New Stock', description: '', image: '', featured: false
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageError, setImageError] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const fileInputRef = React.useRef(null);

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    businessName: activeWholesaler?.businessName || '',
    ownerName: activeWholesaler?.ownerName || '',
    email: activeWholesaler?.email || '',
    phone: activeWholesaler?.phone || '',
    description: activeWholesaler?.description || ''
  });

  useEffect(() => {
    if (!currentWholesaler) return;
    const ws = currentWholesaler;
    const allProds = JSON.parse(localStorage.getItem('wholesalehub_wholesaler_products') || '[]');
    const mine = allProds.filter(p => p.wholesalerId === ws.id);
    setMyProducts(mine);
  }, [currentWholesaler, isOpen]);

  const liveProducts = myProducts;
  const totalRevenue = myProducts.reduce((s, p) => s + (p.revenue || 0), 0);
  const totalOrders = myProducts.reduce((s, p) => s + (p.orders || 0), 0);
  const totalViews = myProducts.reduce((s, p) => s + (p.views || 0), 0);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleImageFileSelect = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const remaining = 4 - uploadedImages.length;
    if (remaining <= 0) {
      setImageError('Maximum of 4 photos allowed.');
      return;
    }
    const filesArray = Array.from(files).slice(0, remaining);
    filesArray.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages((prev) => {
          if (prev.length >= 4) return prev;
          return [...prev, event.target.result];
        });
      };
      reader.readAsDataURL(file);
    });
    setImageError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddImageUrl = () => {
    if (!customImageUrl.trim()) return;
    if (uploadedImages.length >= 4) {
      setImageError('Maximum of 4 photos allowed.');
      return;
    }
    setUploadedImages((prev) => [...prev, customImageUrl.trim()]);
    setCustomImageUrl('');
    setImageError('');
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetCoverImage = (index) => {
    setUploadedImages((prev) => {
      const selected = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      return [selected, ...remaining];
    });
  };

  const handleLoadDemoImages = () => {
    setUploadedImages([
      'https://images.unsplash.com/photo-1584990347449-39908cfd145c?w=600&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'
    ]);
    setImageError('');
  };

  const handleUploadProduct = (e) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.retailPrice || !uploadForm.wholesalePrice) {
      alert('Please fill in product name and prices.');
      return;
    }
    if (uploadedImages.length < 2) {
      setImageError('Please upload at least 2 photos (minimum 2, maximum 4 required).');
      return;
    }
    if (uploadedImages.length > 4) {
      setImageError('Maximum of 4 photos allowed.');
      return;
    }
    setUploadLoading(true);
    setTimeout(() => {
      const newProduct = {
        id: `wsp-${Date.now()}`,
        ...uploadForm,
        retailPrice: parseFloat(uploadForm.retailPrice),
        wholesalePrice: parseFloat(uploadForm.wholesalePrice),
        wholesaleMinQty: parseInt(uploadForm.wholesaleMinQty) || 2,
        stock: parseInt(uploadForm.stock) || 50,
        status: 'approved',
        wholesalerId: activeWholesaler?.id || 'ws-001',
        wholesalerName: activeWholesaler?.businessName || activeWholesaler?.ownerName || 'Verified Wholesaler',
        isWholesalerProduct: true,
        views: 0, orders: 0, revenue: 0,
        images: uploadedImages,
        image: uploadedImages[0]
      };

      const allProds = JSON.parse(localStorage.getItem('wholesalehub_wholesaler_products') || '[]');
      const updated = [...allProds, newProduct];
      localStorage.setItem('wholesalehub_wholesaler_products', JSON.stringify(updated));
      setMyProducts(prev => [newProduct, ...prev]);

      // Immediately publish to the main site catalog!
      if (setAllProducts) {
        setAllProducts(prev => {
          if (prev.some(p => p.id === newProduct.id)) {
            return prev.map(p => p.id === newProduct.id ? newProduct : p);
          }
          return [newProduct, ...prev];
        });
      }
      if (onProductsUpdated) onProductsUpdated(newProduct);

      setUploadForm({
        name: '', category: 'kitchen-utensils', packSize: '', unit: 'Carton',
        retailPrice: '', wholesalePrice: '', wholesaleMinQty: '2', moq: '',
        stock: '50', badge: 'New Stock', description: '', image: '', featured: false
      });
      setUploadedImages([]);
      setImageError('');
      setUploadLoading(false);
      setUploadSuccess(true);
      setTimeout(() => { setUploadSuccess(false); setActiveTab('products'); }, 1800);
    }, 800);
  };

  const handleDeleteProduct = (productId) => {
    if (!window.confirm('Remove this product?')) return;
    const allProds = JSON.parse(localStorage.getItem('wholesalehub_wholesaler_products') || '[]');
    const updated = allProds.filter(p => p.id !== productId);
    localStorage.setItem('wholesalehub_wholesaler_products', JSON.stringify(updated));
    setMyProducts(prev => prev.filter(p => p.id !== productId));
    if (setAllProducts) {
      setAllProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleMarkNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleSaveProfile = () => {
    const updated = { ...currentWholesaler, ...profileForm };
    localStorage.setItem('wholesalehub_current_wholesaler', JSON.stringify(updated));
    setCurrentWholesaler(updated);
    alert('Profile saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('wholesalehub_current_wholesaler');
    setCurrentWholesaler(null);
    onClose();
  };

  const filteredProducts = myProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusBadge = () => {
    return <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" />Live on Store</span>;
  };

  return (
    <div className="fixed inset-0 z-[55] flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Mobile Off-Canvas Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fade-in">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative flex flex-col w-72 max-w-[85vw] bg-slate-900 text-white z-10 h-full shadow-2xl overflow-y-auto scrollbar-none">
            {/* Mobile Header */}
            <div className="px-5 pt-5 pb-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">WholesaleHub</div>
                  <div className="text-sm font-black">Seller Dashboard</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Wholesaler Info */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3 bg-white/8 rounded-2xl p-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                  {activeWholesaler.businessName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{activeWholesaler.businessName}</div>
                  <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-2.5 h-2.5" /> Verified Wholesaler
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                    {tab.id === 'notifications' && unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
                    )}
                    {tab.id === 'products' && myProducts.length > 0 && (
                      <span className="ml-auto bg-emerald-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">{myProducts.length}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Sign Out */}
            <div className="p-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (hidden on mobile & tablet) */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl z-10 overflow-y-auto scrollbar-none shrink-0">
        {/* Brand Header */}
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">WholesaleHub</div>
              <div className="text-sm font-black">Seller Dashboard</div>
            </div>
          </div>
          {/* Wholesaler info */}
          <div className="flex items-center gap-3 bg-white/8 rounded-2xl p-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              {activeWholesaler.businessName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{activeWholesaler.businessName}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />Verified Wholesaler</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.id === 'notifications' && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>
                )}
                {tab.id === 'products' && myProducts.length > 0 && (
                  <span className="ml-auto bg-emerald-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">{myProducts.length}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout in desktop sidebar */}
        <div className="px-3 pb-6 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="relative flex-1 bg-slate-50 overflow-y-auto flex flex-col min-w-0">
        {/* Responsive Sticky Top Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-3.5 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Hamburger button for mobile/tablet */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900 truncate">
                  {TABS.find(t => t.id === activeTab)?.label}
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-[140px] sm:max-w-xs">
                {activeWholesaler.businessName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Sign Out Button in Top Bar */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Sign Out of Wholesaler Account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            {/* Close / Return to Store Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Return to Main Store"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Quick-Tab Navigation Strip (lg:hidden) */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none sticky top-[57px] z-10 shadow-2xs">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.id === 'products' && myProducts.length > 0 && (
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/30 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    {myProducts.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-3.5 sm:p-5 lg:p-6 flex-1">
          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Products', value: myProducts.length, sub: `${myProducts.length} items live`, icon: Package, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-700' },
                  { label: 'Total Orders', value: totalOrders, sub: 'All time', icon: ShoppingBag, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-700' },
                  { label: 'Total Revenue', value: formatNaira(totalRevenue), sub: 'Cumulative', icon: DollarSign, color: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', text: 'text-violet-700' },
                  { label: 'Total Views', value: totalViews.toLocaleString(), sub: 'Product page views', icon: Eye, color: 'from-orange-500 to-amber-600', bg: 'bg-orange-50', text: 'text-orange-700' },
                ].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:shadow-md transition-shadow">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-sm`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-xs font-semibold text-slate-500 mt-1">{stat.label}</div>
                      <div className={`text-xs font-medium ${stat.text} mt-0.5`}>{stat.sub}</div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-slate-800">Recent Products</h3>
                  <button onClick={() => setActiveTab('products')} className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                {myProducts.slice(0, 3).map(p => (
                  <div key={p.id} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover bg-slate-100" onError={e => e.target.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=80'} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-800 truncate">{p.name}</div>
                      <div className="text-xs text-slate-500">{formatNaira(p.retailPrice)} • {p.stock} in stock</div>
                    </div>
                    {statusBadge(p.status)}
                  </div>
                ))}
                {myProducts.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <div className="text-sm font-medium">No products yet. Upload your first product!</div>
                    <button onClick={() => setActiveTab('upload')} className="mt-3 text-sm text-emerald-600 font-bold hover:text-emerald-700">+ Upload Product</button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Upload New Product', icon: Plus, color: 'from-emerald-500 to-teal-600', tab: 'upload' },
                  { label: 'View My Products', icon: Package, color: 'from-blue-500 to-blue-600', tab: 'products' },
                  { label: 'View Analytics', icon: TrendingUp, color: 'from-violet-500 to-purple-600', tab: 'analytics' },
                  { label: 'Edit Profile', icon: Settings, color: 'from-orange-500 to-amber-600', tab: 'profile' },
                ].map(action => {
                  const Icon = action.icon;
                  return (
                    <button key={action.label} onClick={() => setActiveTab(action.tab)}
                      className={`bg-gradient-to-br ${action.color} text-white rounded-2xl p-5 text-left hover:shadow-lg transition-all hover:scale-[1.02] active:scale-98`}>
                      <Icon className="w-6 h-6 mb-2" />
                      <div className="text-sm font-bold">{action.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== PRODUCTS TAB ===== */}
          {activeTab === 'products' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search your products..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
                </div>
                <button onClick={() => setActiveTab('upload')}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-700/20 cursor-pointer shrink-0">
                  <Plus className="w-4 h-4" /> Upload
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 text-center py-16">
                  <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <div className="font-bold text-slate-600">No products found</div>
                  <div className="text-sm text-slate-400 mt-1">Upload your first product to get started</div>
                  <button onClick={() => setActiveTab('upload')}
                    className="mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors">
                    + Upload Product
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow p-4 flex items-start gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0" onError={e => e.target.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=80'} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <div className="font-bold text-slate-800">{product.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{product.packSize} • {product.unit}</div>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 flex-wrap">
                              <span>Retail: <strong className="text-slate-700">{formatNaira(product.retailPrice)}</strong></span>
                              <span>Wholesale: <strong className="text-emerald-600">{formatNaira(product.wholesalePrice)}</strong></span>
                              <span>Stock: <strong className="text-slate-700">{product.stock}</strong></span>
                              {product.moq && <span>MOQ: <strong className="text-slate-700">{product.moq}</strong></span>}
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 flex-wrap">
                              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{product.views || 0} views</span>
                              <span className="flex items-center gap-1"><ShoppingBag className="w-3 h-3" />{product.orders || 0} orders</span>
                              <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{formatNaira(product.revenue || 0)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-col">
                            {statusBadge(product.status)}
                            <button onClick={() => handleDeleteProduct(product.id)}
                              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-all font-medium">
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== FULL-SCREEN UPLOAD EXPERIENCE ===== */}
          {activeTab === 'upload' && (
            <div className="fixed inset-0 z-[65] bg-slate-900/40 backdrop-blur-md flex flex-col justify-start bg-slate-100 overflow-y-auto animate-fade-in">
              {/* Sticky Top Header (Fully Responsive on Mobile & Desktop) */}
              <div className="sticky top-0 z-30 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xs">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
                  
                  {/* Left: Back Button + Title */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab('products')}
                      className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer shrink-0"
                      title="Back to Dashboard"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Dashboard</span>
                    </button>

                    <div className="h-5 w-px bg-slate-200 hidden sm:block shrink-0" />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h1 className="text-xs sm:text-base font-black text-slate-900 truncate">
                          Add Wholesale Product
                        </h1>
                        <span className="hidden md:inline-block text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                          Full Screen
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate max-w-[120px] sm:max-w-xs">
                        <span className="hidden sm:inline">Store: </span>
                        <strong className="text-emerald-700">{activeWholesaler.businessName}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Right: Photo Badge + Publish Button + Close */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    {/* Photo status pill */}
                    <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold border shrink-0 ${
                      uploadedImages.length >= 2 && uploadedImages.length <= 4
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{uploadedImages.length}/4</span>
                      <span className="hidden md:inline">(Min 2)</span>
                    </div>

                    {/* Publish Button */}
                    <button
                      type="submit"
                      form="fullscreen-upload-form"
                      disabled={uploadLoading || uploadedImages.length < 2 || uploadedImages.length > 4}
                      className="flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95 cursor-pointer shrink-0"
                      title={uploadedImages.length < 2 ? `Upload at least 2 photos (${uploadedImages.length}/2)` : 'Publish product live to store'}
                    >
                      {uploadLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          <span className="hidden xs:inline sm:inline">Publishing...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Publish</span>
                          <span className="hidden sm:inline">to Store</span>
                        </>
                      )}
                    </button>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                      title="Exit full screen"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                </div>

                {/* Mobile Helper Info Strip (shown when photos < 2 on mobile) */}
                {uploadedImages.length < 2 && (
                  <div className="sm:hidden bg-amber-50 border-t border-amber-200/60 px-3 py-1 flex items-center justify-between text-[10px] text-amber-800">
                    <div className="flex items-center gap-1 truncate font-semibold">
                      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>Min. 2 photos required ({uploadedImages.length}/2 added)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLoadDemoImages}
                      className="underline font-black text-emerald-800 shrink-0 ml-2"
                    >
                      Auto-fill 3
                    </button>
                  </div>
                )}
              </div>

              {/* Success Notification */}
              {uploadSuccess && (
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-4">
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 flex items-center gap-3 shadow-sm animate-fade-in">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-black text-emerald-900 text-sm">Product Published Successfully!</div>
                      <div className="text-xs text-emerald-700 mt-0.5">Your product is now immediately visible to all supermarket buyers and retail customers.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Screen Form Grid */}
              <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
                <form id="fullscreen-upload-form" onSubmit={handleUploadProduct} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT COLUMN: Product Specifications & Pricing (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Section 1: Identification */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Package className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-black text-slate-800 text-sm">1. Product Identification</h3>
                      </div>

                      {/* Product Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={uploadForm.name}
                          onChange={(e) => setUploadForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="e.g. Adewale Heavy-Duty Stainless Cookware (6-Piece Set)"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-medium"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Department / Category */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Supermarket Department <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={uploadForm.category}
                            onChange={(e) => setUploadForm((f) => ({ ...f, category: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-medium cursor-pointer"
                          >
                            {INITIAL_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Product Badge */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Marketing Badge
                          </label>
                          <input
                            type="text"
                            value={uploadForm.badge}
                            onChange={(e) => setUploadForm((f) => ({ ...f, badge: e.target.value }))}
                            placeholder="e.g. Best Seller, New Stock, High Turnover"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Pack Description */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Pack / Sizing Specification
                          </label>
                          <input
                            type="text"
                            value={uploadForm.packSize}
                            onChange={(e) => setUploadForm((f) => ({ ...f, packSize: e.target.value }))}
                            placeholder="e.g. Carton of 24 boxes x 500g"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                          />
                        </div>

                        {/* Unit Type */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Packaging Unit
                          </label>
                          <select
                            value={uploadForm.unit}
                            onChange={(e) => setUploadForm((f) => ({ ...f, unit: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-medium cursor-pointer"
                          >
                            {['Carton', 'Bag', 'Keg', 'Bundle', 'Pack', 'Dozen', 'Piece', 'Box', 'Bucket', 'Roll'].map((u) => (
                              <option key={u}>{u}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Dual Pricing & Inventory */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-black text-slate-800 text-sm">2. Wholesale & Retail Pricing</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Retail Price */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Single Unit Retail Price (₦) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={uploadForm.retailPrice}
                            onChange={(e) => setUploadForm((f) => ({ ...f, retailPrice: e.target.value }))}
                            placeholder="e.g. 35000"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-bold text-slate-900"
                            required
                          />
                        </div>

                        {/* Wholesale Price */}
                        <div>
                          <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                            Bulk Wholesale Price (₦) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={uploadForm.wholesalePrice}
                            onChange={(e) => setUploadForm((f) => ({ ...f, wholesalePrice: e.target.value }))}
                            placeholder="e.g. 30000"
                            className="w-full px-4 py-3 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all font-black text-emerald-900"
                            required
                          />
                        </div>
                      </div>

                      {/* Live Buyer Savings Calculator */}
                      {parseFloat(uploadForm.retailPrice) > 0 && parseFloat(uploadForm.wholesalePrice) > 0 && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
                          <span className="text-emerald-800 font-semibold">Bulk Buyer Incentive:</span>
                          <span className="font-black text-emerald-700">
                            Buyers save {formatNaira(Math.max(0, parseFloat(uploadForm.retailPrice) - parseFloat(uploadForm.wholesalePrice)))} per unit!
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {/* Minimum Wholesale Quantity */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Wholesale Threshold
                          </label>
                          <input
                            type="number"
                            value={uploadForm.wholesaleMinQty}
                            onChange={(e) => setUploadForm((f) => ({ ...f, wholesaleMinQty: e.target.value }))}
                            placeholder="2"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-semibold"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Units required for bulk price</p>
                        </div>

                        {/* MOQ Text */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            MOQ Display
                          </label>
                          <input
                            type="text"
                            value={uploadForm.moq}
                            onChange={(e) => setUploadForm((f) => ({ ...f, moq: e.target.value }))}
                            placeholder="e.g. 2 Cartons"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Shown on buyer card</p>
                        </div>

                        {/* Available Stock */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Available Stock Units
                          </label>
                          <input
                            type="number"
                            value={uploadForm.stock}
                            onChange={(e) => setUploadForm((f) => ({ ...f, stock: e.target.value }))}
                            placeholder="50"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-bold"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Live inventory count</p>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Description & Featured */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <h3 className="font-black text-slate-800 text-sm">3. Description & Visibility</h3>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Product Overview & Specs
                        </label>
                        <textarea
                          rows={4}
                          value={uploadForm.description}
                          onChange={(e) => setUploadForm((f) => ({ ...f, description: e.target.value }))}
                          placeholder="Highlight quality, material, packaging details, and why retailers should stock this product..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                        <input
                          type="checkbox"
                          id="featured-toggle"
                          checked={uploadForm.featured}
                          onChange={(e) => setUploadForm((f) => ({ ...f, featured: e.target.checked }))}
                          className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                        />
                        <label htmlFor="featured-toggle" className="text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer select-none">
                          Feature this product on homepage & top deal promotions
                        </label>
                      </div>

                      <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-xs text-teal-800 flex items-center gap-2.5">
                        <Store className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>This item will show a <strong>"By: {activeWholesaler.businessName}"</strong> verified supplier badge on the store.</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Multi-Image Upload (Min 2, Max 4) & Live Store Preview (5 Cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Image Uploader Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-emerald-600" />
                          <h3 className="font-black text-slate-800 text-sm">Product Photos</h3>
                        </div>
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                          uploadedImages.length >= 2 && uploadedImages.length <= 4
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {uploadedImages.length}/4 (Min 2)
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        Upload between <strong>2 and 4 high quality photos</strong>. The first photo is your primary cover picture displayed on the store shelves.
                      </p>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        onChange={handleImageFileSelect}
                        className="hidden"
                      />

                      {/* Dropzone Trigger */}
                      {uploadedImages.length < 4 ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-2xl p-6 text-center transition-all cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mx-auto mb-3 text-emerald-600 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div className="font-bold text-slate-800 text-sm">
                            Click to upload picture files
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            PNG, JPG, WEBP (Min. 2 photos, Max. 4)
                          </div>
                          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs">
                            <Plus className="w-3.5 h-3.5" />
                            <span>Select Images from Computer / Phone</span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-100 rounded-2xl p-4 text-center text-xs font-semibold text-slate-500 border border-slate-200">
                          Maximum 4 photos reached. Remove a photo below to replace it.
                        </div>
                      )}

                      {/* Image Validation Alert */}
                      {imageError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{imageError}</span>
                        </div>
                      )}

                      {/* Image Status Message */}
                      {uploadedImages.length < 2 ? (
                        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-xs font-medium flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Please add at least <strong>{2 - uploadedImages.length} more</strong> photo{2 - uploadedImages.length > 1 ? 's' : ''}.</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleLoadDemoImages}
                            className="text-[10px] font-black underline text-amber-900 hover:text-emerald-700 cursor-pointer"
                          >
                            Auto-fill 3 Photos
                          </button>
                        </div>
                      ) : (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Ready! {uploadedImages.length} photos uploaded. Drag or click "Make Cover" to set main thumbnail.</span>
                        </div>
                      )}

                      {/* Uploaded Photos Grid (2x2) */}
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          {uploadedImages.map((imgSrc, idx) => (
                            <div key={idx} className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-100 group shadow-2xs aspect-square flex items-center justify-center">
                              <img src={imgSrc} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                              
                              {/* Position Pill */}
                              <div className="absolute top-2 left-2 z-10">
                                {idx === 0 ? (
                                  <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                    <Star className="w-2.5 h-2.5 fill-white" /> Cover
                                  </span>
                                ) : (
                                  <span className="bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                                    #{idx + 1}
                                  </span>
                                )}
                              </div>

                              {/* Hover / Actions Overlay */}
                              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 z-10">
                                {idx !== 0 && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetCoverImage(idx)}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-xs cursor-pointer"
                                  >
                                    Make Cover
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span className="text-[10px]">Remove</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Fallback Image URL Input Option */}
                      {uploadedImages.length < 4 && (
                        <div className="pt-2 border-t border-slate-100">
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Or Paste Image URL:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={customImageUrl}
                              onChange={(e) => setCustomImageUrl(e.target.value)}
                              placeholder="https://example.com/product.jpg"
                              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={handleAddImageUrl}
                              className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Live Store Preview Card */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-emerald-600" />
                          <h3 className="font-black text-slate-800 text-sm">Live Store Preview</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Real-Time Preview
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">
                        This is exactly how supermarket buyers and retail consumers will see your item:
                      </p>

                      {/* Mock Product Card Container */}
                      <div className="max-w-[280px] mx-auto bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                        {/* Top Image Box */}
                        <div className="relative pt-[72%] w-full bg-slate-50 border-b border-slate-100">
                          <img
                            src={uploadedImages[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80'}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-contain p-2"
                          />
                          {/* Badge */}
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black bg-slate-900 text-white">
                            {uploadForm.badge || 'New Stock'}
                          </div>
                          {/* Photos Pill */}
                          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-1">
                            <Camera className="w-2.5 h-2.5" />
                            <span>{Math.max(1, uploadedImages.length)} Photos</span>
                          </div>
                          {/* Pack Spec Pill */}
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-[9px] font-semibold text-slate-100 truncate">
                            📦 {uploadForm.packSize || 'Standard Wholesale Pack'}
                          </div>
                        </div>

                        {/* Card Content Details */}
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span className="capitalize">{uploadForm.category.replace('-', ' ')}</span>
                            <span className="text-emerald-700 font-bold">● {uploadForm.stock || 50} in stock</span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-xs line-clamp-2 min-h-[32px]">
                            {uploadForm.name || 'Your Product Name Will Appear Here'}
                          </h4>

                          {/* Attribution */}
                          <div className="flex items-center gap-1 text-[10px] text-teal-800 bg-teal-50 border border-teal-200/80 rounded-md px-1.5 py-0.5">
                            <Store className="w-3 h-3 text-teal-600 shrink-0" />
                            <span className="truncate font-semibold">By: {activeWholesaler.businessName}</span>
                          </div>

                          {/* Dual Price Box */}
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                            <div className="flex items-baseline justify-between">
                              <span className="text-[10px] font-bold text-emerald-800 uppercase">Wholesale:</span>
                              <span className="text-sm font-black text-emerald-700">
                                {formatNaira(parseFloat(uploadForm.wholesalePrice) || 0)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-500">
                              <span>Retail:</span>
                              <span className="line-through text-slate-400">
                                {formatNaira(parseFloat(uploadForm.retailPrice) || 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Bottom Submit Button */}
                    <div className="lg:hidden pt-3 pb-8">
                      <button
                        type="submit"
                        disabled={uploadLoading || uploadedImages.length < 2 || uploadedImages.length > 4}
                        className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        {uploadLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>Publishing to Live Store...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>
                              {uploadedImages.length < 2
                                ? `Upload at least 2 photos (${uploadedImages.length}/2)`
                                : 'Publish to Live Store'}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ===== ORDERS TAB ===== */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fade-in">
              {[
                { id: 'WH-93021', customer: 'Mama Ngozi Provisions', items: "Tosino's Premium Ponmo x5", date: '2026-10-25', total: 160000, status: 'Processing' },
                { id: 'WH-92815', customer: 'Balogun Market Traders Ltd', items: "Tosino's Dried Stockfish x8", date: '2026-10-23', total: 129600, status: 'Dispatched' },
                { id: 'WH-91244', customer: 'Alhaji Sule Stores', items: "Tosino's Palm Oil x3 + Ponmo x2", date: '2026-10-20', total: 186000, status: 'Delivered' },
              ].map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="font-black text-slate-800">#{order.id}</div>
                      <div className="text-sm text-slate-600 font-medium mt-0.5">{order.customer}</div>
                      <div className="text-xs text-slate-400 mt-1">{order.items}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-600">{formatNaira(order.total)}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{order.date}</div>
                      <span className={`inline-block mt-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700'
                        : order.status === 'Dispatched' ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== ANALYTICS TAB ===== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { label: 'This Month Revenue', value: formatNaira(707400), change: '+18%', up: true },
                  { label: 'Products Live', value: myProducts.length, change: `${myProducts.length} active items`, up: true },
                  { label: 'Avg. Order Value', value: formatNaira(totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0), change: '+5%', up: true },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5">
                    <div className="text-2xl font-black text-slate-900">{s.value}</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">{s.label}</div>
                    {s.up !== null && (
                      <div className={`flex items-center gap-1 mt-1.5 text-xs font-bold ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                        {s.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{s.change}
                      </div>
                    )}
                    {s.up === null && <div className="text-xs text-amber-600 font-medium mt-1.5">{s.change}</div>}
                  </div>
                ))}
              </div>

              {/* Bar Chart (Visual) */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
                <h3 className="font-black text-slate-800 mb-5">Monthly Revenue (Last 6 Months)</h3>
                <div className="flex items-end gap-3 h-40">
                  {[
                    { month: 'May', val: 320000 }, { month: 'Jun', val: 480000 },
                    { month: 'Jul', val: 410000 }, { month: 'Aug', val: 560000 },
                    { month: 'Sep', val: 620000 }, { month: 'Oct', val: 707400 },
                  ].map(d => {
                    const maxVal = 707400;
                    const pct = (d.val / maxVal) * 100;
                    return (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="text-[10px] font-bold text-slate-600">{formatNaira(d.val).replace('₦', '₦').replace(',000', 'K').split('.')[0]}</div>
                        <div className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-500 transition-all hover:opacity-90 cursor-pointer relative group"
                          style={{ height: `${pct}%`, minHeight: 8 }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {formatNaira(d.val)}
                          </div>
                        </div>
                        <div className="text-[10px] font-semibold text-slate-400">{d.month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
                <h3 className="font-black text-slate-800 mb-4">Top Performing Products</h3>
                <div className="space-y-3">
                  {myProducts.sort((a,b) => (b.revenue||0) - (a.revenue||0)).map((p, i) => {
                    const maxRev = Math.max(...myProducts.map(x => x.revenue || 0)) || 1;
                    return (
                      <div key={p.id} className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-400 w-5">#{i+1}</span>
                        <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover bg-slate-100 shrink-0" onError={e => e.target.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80'} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-slate-700 truncate">{p.name}</div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full transition-all"
                              style={{ width: `${((p.revenue||0) / maxRev) * 100}%` }} />
                          </div>
                        </div>
                        <span className="text-sm font-black text-emerald-600 shrink-0">{formatNaira(p.revenue||0)}</span>
                      </div>
                    );
                  })}
                  {myProducts.length === 0 && <div className="text-center text-slate-400 text-sm py-4">No product data yet</div>}
                </div>
              </div>
            </div>
          )}

          {/* ===== NOTIFICATIONS TAB ===== */}
          {activeTab === 'notifications' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-500 font-medium">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</div>
                {unreadCount > 0 && (
                  <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                    className="text-xs text-emerald-600 font-bold hover:text-emerald-700">Mark all read</button>
                )}
              </div>
              {notifications.map(n => {
                const iconMap = { success: CheckCircle, order: ShoppingBag, warning: AlertTriangle, info: Bell };
                const colorMap = { success: 'bg-emerald-100 text-emerald-600', order: 'bg-blue-100 text-blue-600', warning: 'bg-amber-100 text-amber-600', info: 'bg-slate-100 text-slate-600' };
                const Icon = iconMap[n.type] || Bell;
                return (
                  <div key={n.id} onClick={() => handleMarkNotificationRead(n.id)}
                    className={`bg-white rounded-2xl border shadow-xs p-4 flex items-start gap-3 cursor-pointer hover:shadow-md transition-all ${!n.read ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100'}`}>
                    <div className={`w-9 h-9 rounded-xl ${colorMap[n.type]} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        {n.title}
                        {!n.read && <span className="w-2 h-2 bg-emerald-500 rounded-full" />}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-1">{n.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ===== PROFILE TAB ===== */}
          {activeTab === 'profile' && (
            <div className="max-w-xl space-y-5 animate-fade-in">
              {/* Avatar & Status */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black shadow-lg">
                  {activeWholesaler.businessName.charAt(0)}
                </div>
                <div>
                  <div className="text-lg font-black">{activeWholesaler.businessName}</div>
                  <div className="text-sm text-emerald-200 mt-0.5">{activeWholesaler.tier || 'Wholesaler'}</div>
                  <div className="mt-1.5 text-xs font-bold px-3 py-0.5 rounded-full inline-block bg-emerald-500/30 text-emerald-100">
                    ✓ Verified Account
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-4">
                <h3 className="font-black text-slate-800">Business Information</h3>
                {[
                  { label: 'Business Name', key: 'businessName', icon: Store, type: 'text', placeholder: 'Your business name' },
                  { label: "Owner's Full Name", key: 'ownerName', icon: User, type: 'text', placeholder: 'Your full name' },
                  { label: 'Business Email', key: 'email', icon: null, type: 'email', placeholder: 'your@business.ng' },
                  { label: 'Phone Number', key: 'phone', icon: null, type: 'tel', placeholder: '+234 800 000 0000' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
                    <input type={type} value={profileForm[key]} onChange={e => setProfileForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Business Description</label>
                  <textarea value={profileForm.description} onChange={e => setProfileForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Describe your business, products you specialize in..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none" />
                </div>
                <button onClick={handleSaveProfile}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20">
                  <Save className="w-4 h-4" /> Save Profile Changes
                </button>
              </div>

              {/* Account Info */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
                <h3 className="font-black text-slate-800 mb-4">Account Details</h3>
                {[
                  { label: 'Account ID', value: activeWholesaler.id },
                  { label: 'Member Since', value: activeWholesaler.joinedDate },
                  { label: 'Account Status', value: '✅ Verified & Active' },
                  { label: 'Products Uploaded', value: myProducts.length },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm font-bold text-slate-700">{item.value}</span>
                  </div>
                ))}
              </div>

              <button onClick={handleLogout}
                className="w-full py-3.5 border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Sign Out of Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
