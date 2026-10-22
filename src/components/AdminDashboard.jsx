import React, { useState } from 'react';
import { 
  X, 
  Package, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Search, 
  Truck, 
  ShieldCheck, 
  TrendingUp
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { formatNaira } from '../utils/formatters';

export default function AdminDashboard({
  isOpen,
  onClose,
  products,
  setProducts,
  orders,
  setOrders
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Inline editing
  const [editingProductId, setEditingProductId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Add Product
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

  const totalSalesVolume = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = products.filter((p) => p.stock <= 30);
  const totalOrdersCount = orders.length;

  const handleStartEdit = (prod) => {
    setEditingProductId(prod.id);
    setEditForm({ ...prod });
  };

  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProductId ? { ...p, ...editForm } : p))
    );
    setEditingProductId(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Remove item from catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

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
    setNewProdName('');
    setNewProdRetail('');
    setNewProdWholesale('');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in my-2 sm:my-6 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-3.5 sm:p-5 flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black">Staff Inventory & Operations</h2>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-900 text-emerald-200 border border-emerald-700">
                  Lagos Hub
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400">
                Ikeja & Trade Fair Warehouses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddProduct(true)}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Food Item</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="bg-slate-900 px-3.5 sm:px-6 py-3 border-b border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-2.5 shrink-0">
          <div className="bg-slate-800/80 p-2.5 sm:p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block">Total Sales (GMV)</span>
            <div className="text-sm sm:text-base font-black text-white">{formatNaira(totalSalesVolume)}</div>
          </div>

          <div className="bg-slate-800/80 p-2.5 sm:p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block">Customer Orders</span>
            <div className="text-sm sm:text-base font-black text-white">{totalOrdersCount} Placed</div>
          </div>

          <div className="bg-slate-800/80 p-2.5 sm:p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block">Low Stock</span>
            <div className="text-sm sm:text-base font-black text-amber-400">{lowStockProducts.length} Items</div>
          </div>

          <div className="bg-slate-800/80 p-2.5 sm:p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block">Catalog Size</span>
            <div className="text-sm sm:text-base font-black text-emerald-400">{products.length} Products</div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="bg-slate-100 px-3 sm:px-6 flex items-center justify-between border-b border-slate-200 text-xs font-bold shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-3 border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'inventory'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3 border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>
          </div>

          {activeTab === 'inventory' && (
            <div className="relative my-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="pl-3 pr-2 py-1 bg-white border border-slate-300 rounded-lg text-xs outline-none w-28 sm:w-44"
              />
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: INVENTORY */}
          {activeTab === 'inventory' && (
            <div>
              {/* Mobile Card View for Inventory (shown on screens < 768px) */}
              <div className="md:hidden space-y-2.5">
                {filteredProducts.map((p) => {
                  const isEditing = editingProductId === p.id;

                  if (isEditing) {
                    return (
                      <div key={p.id} className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 space-y-2 text-xs">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full p-1.5 bg-white border border-emerald-400 rounded-lg font-bold"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-slate-500">Retail:</span>
                            <input
                              type="number"
                              value={editForm.retailPrice}
                              onChange={(e) => setEditForm({ ...editForm, retailPrice: parseFloat(e.target.value) })}
                              className="w-full p-1 bg-white border rounded"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-emerald-700 font-bold">Wholesale:</span>
                            <input
                              type="number"
                              value={editForm.wholesalePrice}
                              onChange={(e) => setEditForm({ ...editForm, wholesalePrice: parseFloat(e.target.value) })}
                              className="w-full p-1 bg-white border border-emerald-400 rounded font-bold text-emerald-800"
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleSaveEdit}
                          className="w-full py-1.5 bg-emerald-600 text-white font-bold rounded-lg cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div key={p.id} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">{p.name}</h4>
                          <p className="text-[10px] text-slate-400">{p.packSize}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-bold text-emerald-700">{formatNaira(p.wholesalePrice)}</span>
                            <span className="text-[10px] line-through text-slate-400">{formatNaira(p.retailPrice)}</span>
                            <span className="text-[10px] text-slate-500">({p.stock} in stock)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 rounded-lg"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Data Table (hidden on mobile) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-2 px-3">Item</th>
                      <th className="py-2 px-3">Category</th>
                      <th className="py-2 px-3">Retail Price</th>
                      <th className="py-2 px-3">Wholesale Price</th>
                      <th className="py-2 px-3">Stock</th>
                      <th className="py-2 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const isEditing = editingProductId === p.id;
                      if (isEditing) {
                        return (
                          <tr key={p.id} className="bg-emerald-50/50">
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full p-1 border rounded text-xs font-bold"
                              />
                            </td>
                            <td className="py-2 px-3">{p.category}</td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={editForm.retailPrice}
                                onChange={(e) => setEditForm({ ...editForm, retailPrice: parseFloat(e.target.value) })}
                                className="w-20 p-1 border rounded text-xs"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={editForm.wholesalePrice}
                                onChange={(e) => setEditForm({ ...editForm, wholesalePrice: parseFloat(e.target.value) })}
                                className="w-20 p-1 border border-emerald-500 rounded text-xs font-bold text-emerald-800"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="number"
                                value={editForm.stock}
                                onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) })}
                                className="w-16 p-1 border rounded text-xs"
                              />
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={handleSaveEdit}
                                className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold cursor-pointer"
                              >
                                Save
                              </button>
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-bold text-slate-900">{p.name}</td>
                          <td className="py-2 px-3 text-slate-500">{p.category}</td>
                          <td className="py-2 px-3 font-semibold">{formatNaira(p.retailPrice)}</td>
                          <td className="py-2 px-3 font-bold text-emerald-700">{formatNaira(p.wholesalePrice)}</td>
                          <td className="py-2 px-3">{p.stock} units</td>
                          <td className="py-2 px-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => handleStartEdit(p)} className="p-1 text-slate-500 hover:text-emerald-700">
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="p-1 text-slate-400 hover:text-red-600">
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

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-2.5">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-3 sm:p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-black text-slate-900">{o.id}</span>
                      <span className="text-slate-500 ml-2">({o.customerName})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-emerald-800">{formatNaira(o.total)}</span>
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="px-2 py-1 rounded-full text-xs font-bold border outline-none cursor-pointer bg-white"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-slate-500 text-[11px]">
                    📍 {o.deliveryAddress}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-slate-950/80">
            <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-bold text-sm text-slate-900">Add Item to Catalog</h3>
                <button onClick={() => setShowAddProduct(false)} className="p-1 text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} className="space-y-2.5">
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Product Name"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={newProdRetail}
                    onChange={(e) => setNewProdRetail(e.target.value)}
                    placeholder="Retail Price (₦)"
                    className="p-2 border rounded-lg"
                    required
                  />
                  <input
                    type="number"
                    value={newProdWholesale}
                    onChange={(e) => setNewProdWholesale(e.target.value)}
                    placeholder="Wholesale Price (₦)"
                    className="p-2 border border-emerald-400 rounded-lg font-bold"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer"
                >
                  Publish Item
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
