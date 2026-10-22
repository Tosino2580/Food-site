import React, { useState } from 'react';
import { 
  X, 
  Package, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Search, 
  Truck, 
  ShieldCheck, 
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { formatNaira, formatDate } from '../utils/formatters';

export default function AdminDashboard({
  isOpen,
  onClose,
  products,
  setProducts,
  orders,
  setOrders
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'orders', 'analytics'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Inline editing state
  const [editingProductId, setEditingProductId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Add Product Modal
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('packaged-foods');
  const [newProdPackSize, setNewProdPackSize] = useState('');
  const [newProdUnit, setNewProdUnit] = useState('Carton');
  const [newProdRetail, setNewProdRetail] = useState('');
  const [newProdWholesale, setNewProdWholesale] = useState('');
  const [newProdStock, setNewProdStock] = useState('50');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('New Stock');

  // Basic Analytics calculation
  const totalSalesVolume = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = products.filter((p) => p.stock <= 30);
  const totalOrdersCount = orders.length;
  const averageOrderValue = totalOrdersCount > 0 ? totalSalesVolume / totalOrdersCount : 0;

  // Start editing a product
  const handleStartEdit = (prod) => {
    setEditingProductId(prod.id);
    setEditForm({ ...prod });
  };

  // Save product edits
  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProductId ? { ...p, ...editForm } : p))
    );
    setEditingProductId(null);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this item from the catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Add new product
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdRetail || !newProdWholesale) return;

    const newProduct = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      packSize: newProdPackSize || 'Wholesale Pack',
      unit: newProdUnit || 'Carton',
      retailPrice: parseFloat(newProdRetail),
      wholesalePrice: parseFloat(newProdWholesale),
      wholesaleMinQty: 2,
      stock: parseInt(newProdStock) || 40,
      image: newProdImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      badge: newProdBadge || 'New Arrival',
      featured: true,
      description: 'Factory sealed provisions with direct warehouse dispatch across Lagos.'
    };

    setProducts((prev) => [newProduct, ...prev]);
    setShowAddProduct(false);

    // Reset
    setNewProdName('');
    setNewProdRetail('');
    setNewProdWholesale('');
  };

  // Update order status (Processing -> Dispatched -> Delivered)
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in my-6">
        
        {/* Admin Header */}
        <div className="bg-slate-950 text-white p-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Staff Inventory & Operations Console</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-200 border border-emerald-700">
                  Live Dispatch System
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Opeyemi Foods Wholesale Distribution Network (Ikeja & Trade Fair Warehouses)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Food / Provision</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Summary Metric Cards */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Gross Sales (GMV)</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-black text-white">{formatNaira(totalSalesVolume)}</div>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">+18% vs last week</p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Customer Orders</span>
              <Truck className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg font-black text-white">{totalOrdersCount} Orders</div>
            <p className="text-[10px] text-blue-400 font-semibold mt-0.5">Lagos mainland & island</p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Low Stock Alerts</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-black text-amber-400">{lowStockProducts.length} Items</div>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Need warehouse restock</p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Avg Basket Value</span>
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg font-black text-white">{formatNaira(averageOrderValue)}</div>
            <p className="text-[10px] text-purple-400 font-semibold mt-0.5">Wholesale tier dominance</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 flex items-center justify-between border-b border-slate-200 text-xs font-bold">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-all ${
                activeTab === 'inventory'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catalog Inventory ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-all ${
                activeTab === 'orders'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Customer Orders ({orders.length})</span>
            </button>
          </div>

          {activeTab === 'inventory' && (
            <div className="relative my-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search inventory..."
                className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:border-emerald-600"
              />
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                      <th className="py-2.5 px-3">Product Name & Pack</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Retail Price</th>
                      <th className="py-2.5 px-3">Wholesale Price</th>
                      <th className="py-2.5 px-3">Stock Units</th>
                      <th className="py-2.5 px-3">Promotional Badge</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const isEditing = editingProductId === p.id;

                      if (isEditing) {
                        return (
                          <tr key={p.id} className="bg-emerald-50/40">
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full px-2 py-1 text-xs border border-emerald-400 rounded-md font-bold"
                              />
                              <input
                                type="text"
                                value={editForm.packSize}
                                onChange={(e) => setEditForm({ ...editForm, packSize: e.target.value })}
                                className="w-full px-2 py-0.5 text-[10px] border border-slate-300 rounded-md mt-1"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <select
                                value={editForm.category}
                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                className="px-2 py-1 text-xs border border-slate-300 rounded-md"
                              >
                                {INITIAL_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                                  <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={editForm.retailPrice}
                                onChange={(e) => setEditForm({ ...editForm, retailPrice: parseFloat(e.target.value) })}
                                className="w-24 px-2 py-1 text-xs border border-slate-300 rounded-md font-semibold"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={editForm.wholesalePrice}
                                onChange={(e) => setEditForm({ ...editForm, wholesalePrice: parseFloat(e.target.value) })}
                                className="w-24 px-2 py-1 text-xs border border-emerald-500 rounded-md font-bold text-emerald-800"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={editForm.stock}
                                onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) })}
                                className="w-16 px-2 py-1 text-xs border border-slate-300 rounded-md font-semibold"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editForm.badge || ''}
                                onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                                className="w-24 px-2 py-1 text-xs border border-slate-300 rounded-md"
                              />
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={handleSaveEdit}
                                className="px-3 py-1 bg-emerald-600 text-white rounded-md font-bold text-xs hover:bg-emerald-700 flex items-center gap-1 ml-auto"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save</span>
                              </button>
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-8 h-8 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-slate-900">{p.name}</p>
                                <span className="text-[10px] text-slate-400">{p.packSize}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 capitalize">
                            {p.category.replace('-', ' ')}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {formatNaira(p.retailPrice)}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-emerald-700">
                            {formatNaira(p.wholesalePrice)}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.stock <= 30 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {p.stock} {p.unit}s
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            {p.badge && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900 text-white">
                                {p.badge}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-md hover:bg-slate-100"
                                title="Edit Product"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMER ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Manage Lagos Fleet Dispatches</h3>
                  <p className="text-xs text-slate-500">Update status to reflect in customer dashboards in real-time.</p>
                </div>
              </div>

              <div className="space-y-3">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">{o.id}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-xs font-bold text-slate-800">{o.customerName}</span>
                        <span className="text-[11px] text-slate-500">({o.phone})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-800">
                          {formatNaira(o.total)}
                        </span>
                        {/* Status Dropdown Selector */}
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                            o.orderStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : o.orderStatus === 'Dispatched'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="Processing">Processing (At Warehouse)</option>
                          <option value="Dispatched">Dispatched (Driver on Route)</option>
                          <option value="Delivered">Delivered (Completed)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-slate-500"><strong>Address:</strong> {o.deliveryAddress}</p>
                        <p className="text-slate-500"><strong>Payment:</strong> {o.paymentMethod} ({o.paymentStatus})</p>
                      </div>
                      <div>
                        <p className="text-slate-500"><strong>Items ({o.items?.length}):</strong> {o.items?.map((it) => `${it.qty}x ${it.name}`).join(', ')}</p>
                        <p className="text-slate-500"><strong>Driver:</strong> {o.driverContact || 'Lagos Fleet Driver'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ADD PRODUCT MODAL OVERLAY */}
        {showAddProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-sm text-slate-900">Add New Food / Provision Item</h3>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. 50kg Mama Gold Rice or Indomie Superpack"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                    >
                      {INITIAL_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pack Size / Spec</label>
                    <input
                      type="text"
                      value={newProdPackSize}
                      onChange={(e) => setNewProdPackSize(e.target.value)}
                      placeholder="e.g. Carton of 40x120g"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Retail Price (₦) *</label>
                    <input
                      type="number"
                      value={newProdRetail}
                      onChange={(e) => setNewProdRetail(e.target.value)}
                      placeholder="e.g. 22000"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Wholesale Price (₦) *</label>
                    <input
                      type="number"
                      value={newProdWholesale}
                      onChange={(e) => setNewProdWholesale(e.target.value)}
                      placeholder="e.g. 20400"
                      className="w-full px-3 py-1.5 border border-emerald-400 rounded-lg outline-none focus:border-emerald-600 font-bold text-emerald-800"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Stock Count</label>
                    <input
                      type="number"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Promotional Badge</label>
                    <input
                      type="text"
                      value={newProdBadge}
                      onChange={(e) => setNewProdBadge(e.target.value)}
                      placeholder="e.g. Best Seller"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                  >
                    Publish to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
