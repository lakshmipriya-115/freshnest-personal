import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { getSession, onAuthStateChange, isSupabaseConfigured } from './services/supabase';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminLogin from './pages/admin/AdminLogin';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Admin Protection Wrapper
const AdminRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then(({ data }) => {
      setSession(data?.session || null);
      setLoading(false);
    }).catch(() => setLoading(false));

    const { data: { subscription } } = onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// Layout wrapper to handle header/footer visibility
const Layout = ({ cart, updateCartQuantity, removeFromCart, clearCart, addToCart }) => {
  const location = useLocation();
  const isAdminMode = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isSupabaseConfigured && (
        <div style={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          borderBottom: '1px solid #ffeeba',
          padding: '12px 20px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 500
        }}>
          ⚠️ Database Configuration Required: Please configure <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your <code>.env</code> file.
        </div>
      )}
      {!isAdminMode && <Header cartCount={cart.length} />}
      
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetailPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateCartQuantity} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
      </Routes>

      {!isAdminMode && <Footer />}
    </div>
  );
};

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant, quantity) => {
    if (!variant || variant.availability === 'Out of Stock' || variant.availability === 'false' || variant.availability === false) {
      alert('Sorry, this item is out of stock and cannot be added to your cart.');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && item.selectedVariant?.id === variant.id
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.selectedVariant?.id === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          selectedVariant: variant,
          quantity,
          price: variant.price
        }
      ];
    });
  };

  const removeFromCart = (productId, variantId) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item.id === productId && item.selectedVariant?.id === variantId)
      )
    );
  };

  const updateCartQuantity = (productId, variantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId && item.selectedVariant?.id === variantId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Layout 
        cart={cart} 
        updateCartQuantity={updateCartQuantity} 
        removeFromCart={removeFromCart} 
        clearCart={clearCart} 
        addToCart={addToCart} 
      />
    </Router>
  );
}

export default App;
