import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import AccountDashboard from './components/AccountDashboard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

import { 
  INITIAL_PRODUCTS, 
  LAGOS_ZONES, 
  INITIAL_USER, 
  INITIAL_ORDERS 
} from './data/mockData';
import { calculateCartTotals } from './utils/formatters';

export default function App() {
  // Products & Inventory state
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_catalog_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length >= INITIAL_PRODUCTS.length) return parsed;
      } catch (e) {}
    }
    return INITIAL_PRODUCTS;
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // User state (Default logged in for testing convenience, or can toggle out)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_user') || localStorage.getItem('opeyemi_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_cart') || localStorage.getItem('opeyemi_cart');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    // Initial starter cart so user sees an active cart immediately
    return [
      {
        ...INITIAL_PRODUCTS[0], // Mama's Pride Rice 50kg
        qty: 2
      },
      {
        ...INITIAL_PRODUCTS[12], // Indomie Instant Noodles Super Pack
        qty: 3
      }
    ];
  });

  // Selected Lagos Delivery Zone
  const [selectedZone, setSelectedZone] = useState(LAGOS_ZONES[0]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wholesaleMode, setWholesaleMode] = useState(false);

  // Modals & Drawers visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('wholesalehub_catalog_v5', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wholesalehub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('wholesalehub_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('wholesalehub_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Compute live cart totals
  const cartTotals = calculateCartTotals(cartItems, selectedZone, wholesaleMode);

  // Cart Operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prevItems, { ...product, qty: quantity }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Order Placed Handler
  const handleOrderPlaced = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Repeat past order (1-click reorder)
  const handleRepeatOrder = (pastOrderItems) => {
    const formattedCartItems = pastOrderItems.map((item) => {
      // Find latest product definition
      const latestProd = products.find((p) => p.id === item.id) || item;
      return {
        ...latestProd,
        qty: item.qty || 1
      };
    });

    setCartItems(formattedCartItems);
    setIsAccountOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        cartTotals={cartTotals}
        setIsCartOpen={setIsCartOpen}
        currentUser={currentUser}
        setIsAuthOpen={setIsAuthOpen}
        setIsAccountOpen={setIsAccountOpen}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
        wholesaleMode={wholesaleMode}
        setWholesaleMode={setWholesaleMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero & Promotional Banner */}
        <HeroBanner
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onQuickSearch={(query) => setSearchQuery(query)}
          wholesaleMode={wholesaleMode}
          setWholesaleMode={setWholesaleMode}
        />

        {/* Product Catalogue Grid */}
        <ProductGrid
          products={products}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wholesaleMode={wholesaleMode}
          setWholesaleMode={setWholesaleMode}
        />
      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={(catId) => {
          setSelectedCategory(catId);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminView(true)}
      />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        cartTotals={cartTotals}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        wholesaleMode={wholesaleMode}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cartTotals={cartTotals}
        selectedZone={selectedZone}
        currentUser={currentUser}
        onOrderPlaced={handleOrderPlaced}
        onViewAccountOrders={() => {
          setIsCheckoutOpen(false);
          setIsAccountOpen(true);
        }}
      />

      {/* Customer Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/* Customer Account Dashboard */}
      <AccountDashboard
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        orders={orders}
        onRepeatOrder={handleRepeatOrder}
      />

      {/* Admin & Inventory Management Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminView}
        onClose={() => setIsAdminView(false)}
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
      />

      {/* Floating Bottom Navigation Bar for Mobile Thumb Navigation */}
      <BottomNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartTotals={cartTotals}
        setIsCartOpen={setIsCartOpen}
        currentUser={currentUser}
        setIsAuthOpen={setIsAuthOpen}
        setIsAccountOpen={setIsAccountOpen}
        wholesaleMode={wholesaleMode}
        setWholesaleMode={setWholesaleMode}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
      />
    </div>
  );
}
