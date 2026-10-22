import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Package, 
  Repeat, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle, 
  Truck, 
  Building2, 
  Phone, 
  Mail, 
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { LAGOS_ZONES } from '../data/mockData';
import { formatNaira, formatDate } from '../utils/formatters';

export default function AccountDashboard({
  isOpen,
  onClose,
  currentUser,
  setCurrentUser,
  orders,
  onRepeatOrder
}) {
  if (!isOpen || !currentUser) return null;

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'addresses', 'profile'

  // Add Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newZoneId, setNewZoneId] = useState('ikeja');
  const [newPhone, setNewPhone] = useState(currentUser.phone || '');

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser.fullName);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [editBusiness, setEditBusiness] = useState(currentUser.businessName || '');
  const [savedNotification, setSavedNotification] = useState('');

  // Handle saving new address
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newStreet) return;

    const zoneObj = LAGOS_ZONES.find((z) => z.id === newZoneId) || LAGOS_ZONES[0];
    const newAddr = {
      id: `addr-${Date.now()}`,
      title: newTitle || 'Secondary Store / Branch',
      street: newStreet,
      landmark: newLandmark,
      zoneId: zoneObj.id,
      zoneName: zoneObj.name,
      phone: newPhone,
      isDefault: false
    };

    const updatedUser = {
      ...currentUser,
      savedAddresses: [...(currentUser.savedAddresses || []), newAddr]
    };

    setCurrentUser(updatedUser);
    setShowAddAddress(false);
    setNewTitle('');
    setNewStreet('');
    setNewLandmark('');
    setSavedNotification('New Lagos address saved!');
    setTimeout(() => setSavedNotification(''), 2000);
  };

  // Handle removing address
  const handleRemoveAddress = (addrId) => {
    const updated = {
      ...currentUser,
      savedAddresses: (currentUser.savedAddresses || []).filter((a) => a.id !== addrId)
    };
    setCurrentUser(updated);
  };

  // Handle profile update
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      fullName: editName,
      phone: editPhone,
      businessName: editBusiness
    };
    setCurrentUser(updated);
    setSavedNotification('Profile details updated!');
    setTimeout(() => setSavedNotification(''), 2000);
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    onClose();
  };

  const userOrders = orders.filter((o) => o.customerName === currentUser.fullName || true); // View all session orders for convenience

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in my-8">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-emerald-500/25">
              {currentUser.fullName ? currentUser.fullName[0] : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black">{currentUser.fullName}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                  {currentUser.accountTier || 'Wholesale Member'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentUser.businessName || 'Lagos Provision Buyer'} • {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-red-950/80 hover:text-red-300 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-slate-100 px-6 flex items-center gap-6 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'addresses'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Lagos Addresses ({currentUser.savedAddresses?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Business Info</span>
          </button>
        </div>

        {/* Feedback alert */}
        {savedNotification && (
          <div className="m-4 mb-0 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold">
            ✓ {savedNotification}
          </div>
        )}

        {/* Tab Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          
          {/* TAB 1: ORDER HISTORY & 1-CLICK REORDER */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Your Past & Active Orders</h3>
                  <p className="text-xs text-slate-500">
                    Track live Lagos dispatch or reorder an entire cart in 1-click.
                  </p>
                </div>
              </div>

              {userOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                  <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-bold text-slate-600">No orders placed yet</p>
                  <p className="text-[11px] text-slate-400 mt-1">Browse the product grid to place your first wholesale order!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userOrders.map((order) => {
                    const statusColor = 
                      order.orderStatus === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : order.orderStatus === 'Dispatched'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-amber-100 text-amber-800 border-amber-200';

                    return (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-white shadow-2xs transition-all space-y-3"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900">{order.id}</span>
                            <span className="text-[11px] text-slate-400">
                              Placed: {formatDate(order.date)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                              ● {order.orderStatus}
                            </span>
                            <span className="text-xs font-black text-emerald-800">
                              {formatNaira(order.total)}
                            </span>
                          </div>
                        </div>

                        {/* Order Details & Items preview */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                          <div className="md:col-span-8 space-y-1.5">
                            <p className="text-[11px] text-slate-500">
                              <strong>Delivery:</strong> {order.deliveryAddress} ({order.zoneName})
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {order.items.map((it, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[200px]"
                                >
                                  {it.qty}x {it.name}
                                </span>
                              ))}
                            </div>
                            {order.wholesaleSavings > 0 && (
                              <p className="text-[10px] text-amber-700 font-bold">
                                Wholesale savings: {formatNaira(order.wholesaleSavings)}
                              </p>
                            )}
                          </div>

                          {/* Repeat Order Action */}
                          <div className="md:col-span-4 flex md:flex-col justify-end items-end gap-2">
                            <button
                              type="button"
                              onClick={() => onRepeatOrder(order.items)}
                              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                              title="Re-add all items to your cart"
                            >
                              <Repeat className="w-3.5 h-3.5" />
                              <span>Reorder Cart</span>
                            </button>
                            <span className="text-[10px] text-slate-400">
                              Driver: {order.driverContact || 'Lagos Fleet'}
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAVED LAGOS ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Your Lagos Delivery Locations</h3>
                  <p className="text-xs text-slate-500">
                    Store addresses for your supermarket, restaurant, or family residence for rapid checkout.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddAddress ? 'Cancel' : 'Add New Address'}</span>
                </button>
              </div>

              {/* Add New Address Form Modal/Accordion */}
              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">New Lagos Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Address Label / Title</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Surulere Branch Store"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Lagos Zone</label>
                      <select
                        value={newZoneId}
                        onChange={(e) => setNewZoneId(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                      >
                        {LAGOS_ZONES.map((z) => (
                          <option key={z.id} value={z.id}>{z.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="e.g. 19 Adeniran Ogunsanya Street, Surulere"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Nearby Landmark</label>
                      <input
                        type="text"
                        value={newLandmark}
                        onChange={(e) => setNewLandmark(e.target.value)}
                        placeholder="e.g. Near Shitta Roundabout"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="+234 803 000 0000"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-xs"
                  >
                    Save Address
                  </button>
                </form>
              )}

              {/* Address Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentUser.savedAddresses?.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <h4 className="text-xs font-extrabold text-slate-900">{addr.title}</h4>
                      </div>
                      {addr.isDefault && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Primary Default
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {addr.street}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Landmark: {addr.landmark || 'N/A'} • {addr.zoneName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Phone: {addr.phone || currentUser.phone}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(addr.id)}
                        className="text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Customer & Wholesale Profile</h3>
                <p className="text-xs text-slate-500">Keep your registered business and representative contact up to date.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Representative Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business / Retail Store Name</label>
                <input
                  type="text"
                  value={editBusiness}
                  onChange={(e) => setEditBusiness(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
