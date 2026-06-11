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
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
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

  const handleLogin = async (usernameOrEmail, password) => {
    try {
      // 1. Try FakeStoreAPI auth login first
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usernameOrEmail,
          password: password
        })
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.token;
        
        // 2. Fetch all users from FakeStoreAPI to find matching details
        const usersRes = await fetch('https://fakestoreapi.com/users');
        if (usersRes.ok) {
          const users = await usersRes.json();
          const apiUser = users.find(u => u.username === usernameOrEmail);
          if (apiUser) {
            const mappedUser = {
              name: `${apiUser.name.firstname.charAt(0).toUpperCase() + apiUser.name.firstname.slice(1)} ${apiUser.name.lastname.charAt(0).toUpperCase() + apiUser.name.lastname.slice(1)}`,
              email: apiUser.email,
              phone: apiUser.phone,
              address: `${apiUser.address.number} ${apiUser.address.street}, ${apiUser.address.city}, ${apiUser.address.zipcode}`,
              bio: 'Tech enthusiast and FakeStoreAPI verified user.',
              avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${apiUser.username}`,
              username: apiUser.username,
              token: token
            };
            setCurrentUser(mappedUser);
            return { success: true };
          }
        }
        
        // Fallback if matching user not found in list but token is valid
        const defaultUser = {
          name: usernameOrEmail,
          email: `${usernameOrEmail}@example.com`,
          phone: '+1 (555) 019-2834',
          address: '123 E-Commerce Way, Tech City, TC 94043',
          bio: 'FakeStoreAPI verified user.',
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${usernameOrEmail}`,
          username: usernameOrEmail,
          token: token
        };
        setCurrentUser(defaultUser);
        return { success: true };
      }
    } catch (e) {
      console.error('FakeStoreAPI Auth Error: ', e);
    }

    // 3. Fallback to check local users from localStorage
    try {
      const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
      const localUser = localUsers.find(
        u => u.username === usernameOrEmail || u.email === usernameOrEmail
      );
      if (localUser && localUser.password === password) {
        const loggedInUser = {
          name: localUser.name,
          email: localUser.email,
          phone: localUser.phone || '+1 (555) 019-2834',
          address: localUser.address || '123 E-Commerce Way, Tech City, TC 94043',
          bio: localUser.bio || 'Registered shopper on BrandEStore.',
          avatar: localUser.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${localUser.username || localUser.name}`,
          username: localUser.username || localUser.email.split('@')[0],
          isLocal: true
        };
        setCurrentUser(loggedInUser);
        return { success: true };
      }
    } catch (e) {
      console.error('Local Auth Error: ', e);
    }

    return { success: false, message: 'Invalid username/email or password.' };
  };

  const handleRegister = async (name, email, password) => {
    if (name && email && password) {
      const username = email.split('@')[0];
      const newUser = {
        name,
        email,
        username,
        password,
        phone: '+1 (555) 019-2834',
        address: '123 E-Commerce Way, Tech City, TC 94043',
        bio: 'New shopper on BrandEStore.',
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`
      };

      // Mock register to FakeStoreAPI to confirm endpoint connectivity
      try {
        await fetch('https://fakestoreapi.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            name: {
              firstname: name.split(' ')[0] || name,
              lastname: name.split(' ').slice(1).join(' ') || ''
            },
            address: {
              city: 'Tech City',
              street: 'E-Commerce Way',
              number: 123,
              zipcode: '94043',
              geolocation: { lat: '0', long: '0' }
            },
            phone: '1-555-019-2834'
          })
        });
      } catch (e) {
        console.error('FakeStoreAPI Register Mock Error: ', e);
      }

      // Save to localUsers in localStorage for fallback login
      const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
      if (localUsers.some(u => u.email === email || u.username === username)) {
        return { success: false, message: 'Username or Email is already registered.' };
      }
      localUsers.push(newUser);
      localStorage.setItem('localUsers', JSON.stringify(localUsers));

      // Auto login
      setCurrentUser({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        bio: newUser.bio,
        avatar: newUser.avatar,
        username: newUser.username,
        isLocal: true
      });
      return { success: true };
    }
    return { success: false, message: 'Please fill in all fields.' };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleUpdateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      
      // If local user, update their registered credentials too
      if (prev.isLocal || !prev.token) {
        try {
          const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
          const updatedLocalUsers = localUsers.map(u => 
            u.email === prev.email ? { ...u, ...updatedFields } : u
          );
          localStorage.setItem('localUsers', JSON.stringify(updatedLocalUsers));
        } catch (e) {
          console.error(e);
        }
      }
      return updated;
    });
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ---- Orders State ----
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handlePlaceOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

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
              orders={orders}
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
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              cartTotal={cartTotal}
              cartCount={cartCount}
              currentUser={currentUser}
              clearCart={clearCart}
              navigate={navigate}
              onPlaceOrder={handlePlaceOrder}
              initialDiscount={location.state?.discount || 0}
              initialCoupon={location.state?.couponCode || ''}
            />
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <OrderConfirmationPage
              navigate={navigate}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}