import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Package, 
  Repeat, 
  Plus, 
  Trash2, 
  LogOut
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

  const [activeTab, setActiveTab] = useState('orders');

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

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newStreet) return;

    const zoneObj = LAGOS_ZONES.find((z) => z.id === newZoneId) || LAGOS_ZONES[0];
    const newAddr = {
      id: `addr-${Date.now()}`,
      title: newTitle || 'Branch Store',
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

  const handleRemoveAddress = (addrId) => {
    const updated = {
      ...currentUser,
      savedAddresses: (currentUser.savedAddresses || []).filter((a) => a.id !== addrId)
    };
    setCurrentUser(updated);
  };

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

  const handleLogout = () => {
    setCurrentUser(null);
    onClose();
  };

  const userOrders = orders;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in my-2 sm:my-8 max-h-[95vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white p-4 sm:p-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
              {currentUser.fullName ? currentUser.fullName[0] : 'U'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm sm:text-lg font-black truncate">{currentUser.fullName}</h2>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950">
                  {currentUser.accountTier || 'Wholesale Member'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">
                {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Horizontal scroll on small mobile) */}
        <div className="bg-slate-100 px-3 sm:px-6 flex items-center gap-3 sm:gap-6 border-b border-slate-200 text-xs font-bold overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'addresses'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({currentUser.savedAddresses?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

        {savedNotification && (
          <div className="m-3 mb-0 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold">
            ✓ {savedNotification}
          </div>
        )}

        {/* Tab Content Area */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
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
                    className="p-3 sm:p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">{order.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {formatDate(order.date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                          ● {order.orderStatus}
                        </span>
                        <span className="text-xs font-black text-emerald-800">
                          {formatNaira(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="space-y-1">
                        <p className="text-[11px] text-slate-500 truncate max-w-sm">
                          📍 {order.deliveryAddress}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {order.items.map((it, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 truncate max-w-[160px]"
                            >
                              {it.qty}x {it.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRepeatOrder(order.items)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Repeat className="w-3.5 h-3.5" />
                        <span>Reorder Items</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">Delivery Addresses</h3>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddAddress ? 'Cancel' : 'Add Address'}</span>
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Address Name (e.g. Surulere Shop)"
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                      required
                    />
                    <select
                      value={newZoneId}
                      onChange={(e) => setNewZoneId(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                    >
                      {LAGOS_ZONES.map((z) => (
                        <option key={z.id} value={z.id}>{z.name}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="Street Address & Number"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 cursor-pointer"
                  >
                    Save Address
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentUser.savedAddresses?.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-white space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600">{addr.street}</p>
                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(addr.id)}
                        className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
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

          {/* TAB 3: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile} className="space-y-3 max-w-md text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-xs border border-slate-300 rounded-xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-xs border border-slate-300 rounded-xl outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={editBusiness}
                  onChange={(e) => setEditBusiness(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-xs border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
