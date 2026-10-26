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
import WholesalerAuth from './components/WholesalerAuth';
import WholesalerDashboard from './components/WholesalerDashboard';

import { 
  INITIAL_PRODUCTS, 
  LAGOS_ZONES, 
  INITIAL_USER, 
  INITIAL_ORDERS 
} from './data/mockData';
import { calculateCartTotals } from './utils/formatters';

export default function App() {
  // Products state — exactly 4 starter products for live client presentation
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_client_demo_catalog_v7');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4) return parsed;
      } catch (e) {}
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_user') || localStorage.getItem('opeyemi_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // ===== WHOLESALER STATE =====
  const [currentWholesaler, setCurrentWholesaler] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_current_wholesaler');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('wholesalehub_cart') || localStorage.getItem('opeyemi_cart');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return [
      { ...INITIAL_PRODUCTS[0], qty: 2 }
    ];
  });

  const [selectedZone, setSelectedZone] = useState(LAGOS_ZONES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wholesaleMode, setWholesaleMode] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  // ===== WHOLESALER MODAL STATE =====
  const [isWholesalerAuthOpen, setIsWholesalerAuthOpen] = useState(false);
  const [isWholesalerDashOpen, setIsWholesalerDashOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('wholesalehub_client_demo_catalog_v7', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('wholesalehub_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('wholesalehub_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('wholesalehub_cart', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => {
    if (currentWholesaler) {
      localStorage.setItem('wholesalehub_current_wholesaler', JSON.stringify(currentWholesaler));
    } else {
      localStorage.removeItem('wholesalehub_current_wholesaler');
    }
  }, [currentWholesaler]);

  // When wholesaler uploads a product, it goes live immediately on the main site!
  const handleWholesalerProductUploaded = (newProduct) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === newProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === newProduct.id ? newProduct : p));
      }
      return [newProduct, ...prev];
    });
  };

  const cartTotals = calculateCartTotals(cartItems, selectedZone, wholesaleMode);

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
        prevItems.map((item) => item.id === productId ? { ...item, qty: newQty } : item)
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => setCartItems([]);

  const handleOrderPlaced = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  const handleRepeatOrder = (pastOrderItems) => {
    const formattedCartItems = pastOrderItems.map((item) => {
      const latestProd = products.find((p) => p.id === item.id) || item;
      return { ...latestProd, qty: item.qty || 1 };
    });
    setCartItems(formattedCartItems);
    setIsAccountOpen(false);
    setIsCartOpen(true);
  };

  const handleOpenWholesalerPortal = () => {
    if (currentWholesaler) {
      setIsWholesalerDashOpen(true);
    } else {
      setIsWholesalerAuthOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden w-full max-w-full">
      
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
        currentWholesaler={currentWholesaler}
        setIsWholesalerAuthOpen={setIsWholesalerAuthOpen}
        setIsWholesalerDashOpen={setIsWholesalerDashOpen}
        onOpenWholesalerPortal={handleOpenWholesalerPortal}
      />

      <main className="flex-1">
        <HeroBanner
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onQuickSearch={(query) => setSearchQuery(query)}
          wholesaleMode={wholesaleMode}
          setWholesaleMode={setWholesaleMode}
        />
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

      <Footer
        onCategoryClick={(catId) => {
          setSelectedCategory(catId);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminView(true)}
        onOpenWholesalerPortal={handleOpenWholesalerPortal}
      />

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
        onProceedToCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        wholesaleMode={wholesaleMode}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cartTotals={cartTotals}
        selectedZone={selectedZone}
        currentUser={currentUser}
        onOrderPlaced={handleOrderPlaced}
        onViewAccountOrders={() => { setIsCheckoutOpen(false); setIsAccountOpen(true); }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <AccountDashboard
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        orders={orders}
        onRepeatOrder={handleRepeatOrder}
      />

      <AdminDashboard
        isOpen={isAdminView}
        onClose={() => setIsAdminView(false)}
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
      />

      {/* ===== WHOLESALER AUTH MODAL ===== */}
      <WholesalerAuth
        isOpen={isWholesalerAuthOpen}
        onClose={() => setIsWholesalerAuthOpen(false)}
        setCurrentWholesaler={(ws) => {
          setCurrentWholesaler(ws);
          if (ws) {
            setIsWholesalerAuthOpen(false);
            setIsWholesalerDashOpen(true);
          }
        }}
      />

      {/* ===== WHOLESALER DASHBOARD ===== */}
      <WholesalerDashboard
        isOpen={isWholesalerDashOpen}
        onClose={() => setIsWholesalerDashOpen(false)}
        currentWholesaler={currentWholesaler}
        setCurrentWholesaler={setCurrentWholesaler}
        onProductsUpdated={handleWholesalerProductUploaded}
        allProducts={products}
        setAllProducts={setProducts}
      />

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
        currentWholesaler={currentWholesaler}
        setIsWholesalerAuthOpen={setIsWholesalerAuthOpen}
        setIsWholesalerDashOpen={setIsWholesalerDashOpen}
        onOpenWholesalerPortal={handleOpenWholesalerPortal}
      />
    </div>
  );
}
