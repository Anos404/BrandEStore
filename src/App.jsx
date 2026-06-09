import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { enrichProduct, getProductById, savedForLaterDefaults } from './data/mockData';
import './homepage.css';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // ---- Authentication State ----
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleLogin = (email, password) => {
    if (email && password) {
      const defaultUser = {
        name: email.split('@')[0],
        email: email,
        phone: '+1 (555) 019-2834',
        address: '123 E-Commerce Way, Tech City, TC 94043',
        bio: 'Tech enthusiast and frequent shopper.',
        avatar: null
      };
      setCurrentUser(defaultUser);
      return true;
    }
    return false;
  };

  const handleRegister = (name, email, password) => {
    if (name && email && password) {
      const newUser = {
        name: name,
        email: email,
        phone: '+1 (555) 019-2834',
        address: '123 E-Commerce Way, Tech City, TC 94043',
        bio: 'New shopper on BrandEStore.',
        avatar: null
      };
      setCurrentUser(newUser);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleUpdateProfile = (updatedFields) => {
    setCurrentUser(prev => prev ? { ...prev, ...updatedFields } : null);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ---- Cart State ----
  const [cartItems, setCartItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState(savedForLaterDefaults);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart helpers
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (product, qty = 1) => {
    const enriched = enrichProduct(product);
    setCartItems(prev => {
      const existing = prev.find(i => i.id === enriched.id);
      if (existing) {
        return prev.map(i => i.id === enriched.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...enriched, qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const setCartQty = (id, qty) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, Number(qty)) } : i)
    );
  };

  const saveForLater = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    setSavedForLater(prev => {
      if (prev.some(i => i.id === id)) return prev;
      return [...prev, { id: item.id, name: item.name, price: item.price, img: item.img }];
    });
    removeFromCart(id);
  };

  const moveSavedToCart = (item) => {
    const product = getProductById(item.id);
    if (product) addToCart(product, 1);
    setSavedForLater(prev => prev.filter(i => i.id !== item.id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="page-wrapper">
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        removeFromCart={removeFromCart}
        updateQty={updateQty}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              navigate={navigate}
              addToCart={addToCart}
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              navigate={navigate}
              handleLogin={handleLogin}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              navigate={navigate}
              handleRegister={handleRegister}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              currentUser={currentUser}
              handleLogout={handleLogout}
              handleUpdateProfile={handleUpdateProfile}
              navigate={navigate}
              wishlist={wishlist}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductListingPage
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              navigate={navigate}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              cartTotal={cartTotal}
              cartCount={cartCount}
              savedForLater={savedForLater}
              setSavedForLater={setSavedForLater}
              removeFromCart={removeFromCart}
              setCartQty={setCartQty}
              saveForLater={saveForLater}
              moveSavedToCart={moveSavedToCart}
              clearCart={clearCart}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              navigate={navigate}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}