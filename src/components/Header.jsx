import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Heart,
  Search,
  Package,
  Settings,
  Truck,
  BarChart2,
  ChevronRight,
  MessageSquare,
  ShoppingCart,
  User,
  Menu,
  Globe,
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ChevronDown,
  Grid,
  LogOut,
  Home
} from 'lucide-react';
import { enrichProduct, getProductById } from '../data/mockData';

export default function Header({
  currentUser,
  handleLogout,
  cartItems,
  cartCount,
  cartTotal,
  removeFromCart,
  updateQty,
  isCartOpen,
  setIsCartOpen,
  isMenuOpen,
  setIsMenuOpen
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Search state local to header
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('All category');
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [isNavCategoryOpen, setIsNavCategoryOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Close nav dropdowns on navigation change
  useEffect(() => {
    setIsNavCategoryOpen(false);
    setIsHelpOpen(false);
  }, [location.pathname, location.search]);

  // Sync search input with query params if any
  useEffect(() => {
    const q = searchParams.get('q');
    setSearchInput(q || '');
  }, [searchParams]);

  const handleSearchSubmit = () => {
    const categoryQuery = searchCategory !== 'All category' ? `&category=${encodeURIComponent(searchCategory)}` : '';
    navigate(`/products?q=${encodeURIComponent(searchInput)}${categoryQuery}`);
  };

  const handleCategorySelect = (cat) => {
    setSearchCategory(cat);
    setIsCategorySelectOpen(false);
  };

  const searchDropdownCategories = ['All category', 'Electronics', 'Smartphones', 'Mobile accessory', 'Modern tech'];

  return (
    <>
      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      )}

      {/* Slide-out Cart Drawer */}
      <aside className={`cart-drawer ${isCartOpen ? 'cart-drawer-open' : ''}`}>
        <div className="cart-drawer-header">
          <h3 className="cart-drawer-title">
            <ShoppingBag size={20} />
            My Cart
            {cartCount > 0 && <span className="cart-drawer-count">{cartCount}</span>}
          </h3>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={56} color="#d1d5db" />
              <p>Your cart is empty</p>
              <button className="btn-primary" onClick={() => { setIsCartOpen(false); navigate('/products'); }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <ul className="cart-items-list">
                {cartItems.map(item => (
                  <li key={item.id} className="cart-item-row">
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      <div className="cart-qty-controls">
                        <button onClick={() => updateQty(item.id, -1)}><Minus size={13} /></button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}><Plus size={13} /></button>
                      </div>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-drawer-footer">
                <div className="cart-subtotal-row">
                  <span>Subtotal ({cartCount} items)</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <button
                  className="btn-primary cart-checkout-btn"
                  onClick={() => { setIsCartOpen(false); navigate('/cart'); }}
                >
                  View Cart & Checkout
                </button>
                <button
                  className="btn-outline cart-continue-btn"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Menu Drawer Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <aside className={`menu-drawer ${isMenuOpen ? 'menu-drawer-open' : ''}`}>
        <div className="menu-drawer-header">
          <div 
            className="menu-profile-box" 
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (currentUser) {
                navigate('/profile');
              } else {
                navigate('/login');
              }
              setIsMenuOpen(false);
            }}
          >
            <div className="menu-avatar">
              {currentUser && currentUser.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="avatar-img-menu" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <User size={20} color="#8b96a5" />
              )}
            </div>
            <span className="menu-signin">
              {currentUser ? `Hi, ${currentUser.name}` : 'Sign in | Register'}
            </span>
          </div>
          <button className="menu-close-btn" onClick={() => setIsMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="menu-drawer-body">
          <ul className="menu-drawer-links">
            <li onClick={() => setIsMenuOpen(false)}><Link to="/"><Home size={18} /> Home</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/products"><Grid size={18} /> Categories</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/profile"><Heart size={18} /> Favorites</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/profile?tab=orders"><Package size={18} /> My orders</Link></li>
            {currentUser && (
              <li onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                <span className="menu-link-span" style={{ cursor: 'pointer', color: '#eb3c3c' }}>
                  <LogOut size={18} /> Log out
                </span>
              </li>
            )}
          </ul>
          <hr className="menu-divider" />
          <ul className="menu-drawer-links">
            <li><span className="menu-link-span"><Globe size={18} /> English | USD</span></li>
            <li><span className="menu-link-span"><MessageSquare size={18} /> Contact us</span></li>
            <li><span className="menu-link-span"><Settings size={18} /> About</span></li>
          </ul>
          <hr className="menu-divider" />
          <ul className="menu-drawer-flat-links">
            <li onClick={() => setIsMenuOpen(false)}><Link to="/">User agreement</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/">Partnership</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/">Privacy policy</Link></li>
          </ul>
        </div>
      </aside>

      {/* 1. Header */}
      <header className="main-header">
        {/* Desktop Header Content */}
        <div className="container header-inner hide-on-mobile">
          <div className="header-logo" onClick={() => navigate('/')}>
            <div className="logo-icon">
              <Package size={22} color="white" fill="white" />
            </div>
            <span className="logo-text">Brand</span>
          </div>

          <div className="header-search-box">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearchSubmit(); }}
            />
            <div className="search-category-dropdown" onClick={() => setIsCategorySelectOpen(!isCategorySelectOpen)}>
              <span>{searchCategory}</span>
              <ChevronDown size={14} className="dropdown-arrow" />
              {isCategorySelectOpen && (
                <ul className="search-dropdown-menu">
                  {searchDropdownCategories.map(cat => (
                    <li key={cat} onClick={(e) => { e.stopPropagation(); handleCategorySelect(cat); }}>
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="search-btn" onClick={handleSearchSubmit}>Search</button>
          </div>

          <nav className="header-user-nav">
            <button className="nav-item-btn" onClick={() => navigate(currentUser ? '/profile' : '/login')}>
              <User size={20} />
              <span>{currentUser ? currentUser.name : 'Profile'}</span>
            </button>
            <button className="nav-item-btn" onClick={() => navigate('/')}>
              <MessageSquare size={20} />
              <span>Message</span>
            </button>
            <button className="nav-item-btn" onClick={() => navigate('/profile?tab=orders')}>
              <Heart size={20} />
              <span>Orders</span>
            </button>
            <button className="nav-item-btn cart-nav-btn" onClick={() => navigate('/cart')}>
              <div className="cart-icon-wrap">
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              <span>My cart</span>
            </button>
          </nav>
        </div>

        {/* Mobile Dynamic Header Content */}
        <div className="container mobile-header show-on-mobile">
          {/* On home page */}
          {location.pathname === '/' && (
            <>
              <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(true)}>
                <Menu size={22} />
              </button>
              <div className="mobile-logo" onClick={() => navigate('/')}>
                <div className="logo-icon-sm">
                  <Package size={16} color="white" fill="white" />
                </div>
                <span className="mobile-logo-text">Brand</span>
              </div>
              <div className="mobile-header-actions">
                <button onClick={() => navigate('/cart')} className="mobile-nav-btn cart-nav-btn">
                  <div className="cart-icon-wrap">
                    <ShoppingCart size={22} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </div>
                </button>
                <button onClick={() => navigate(currentUser ? '/profile' : '/login')} className="mobile-nav-btn"><User size={22} /></button>
              </div>
            </>
          )}

          {/* On listing page */}
          {location.pathname === '/products' && (
            <>
              <button className="mobile-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={22} />
              </button>
              <h2 className="mobile-header-title">{searchParams.get('category') || 'All categories'}</h2>
              <div className="mobile-header-actions">
                <button onClick={() => navigate('/cart')} className="mobile-nav-btn cart-nav-btn">
                  <div className="cart-icon-wrap">
                    <ShoppingCart size={22} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </div>
                </button>
                <button onClick={() => navigate(currentUser ? '/profile' : '/login')} className="mobile-nav-btn"><User size={22} /></button>
              </div>
            </>
          )}

          {/* On cart page */}
          {location.pathname === '/cart' && (
            <>
              <button className="mobile-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={22} />
              </button>
              <h2 className="mobile-header-title">Shopping cart</h2>
              <div style={{ width: '44px' }}></div>
            </>
          )}

          {/* On detail page */}
          {location.pathname.startsWith('/product/') && (
            <>
              <button className="mobile-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={22} />
              </button>
              <h2 className="mobile-header-title">Product details</h2>
              <div className="mobile-header-actions">
                <button onClick={() => navigate('/cart')} className="mobile-nav-btn cart-nav-btn">
                  <div className="cart-icon-wrap">
                    <ShoppingCart size={22} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </div>
                </button>
                <button onClick={() => navigate(currentUser ? '/profile' : '/login')} className="mobile-nav-btn"><User size={22} /></button>
              </div>
            </>
          )}

          {/* On profile, login, register pages */}
          {(location.pathname === '/profile' || location.pathname === '/login' || location.pathname === '/register') && (
            <>
              <button className="mobile-back-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={22} />
              </button>
              <h2 className="mobile-header-title">
                {location.pathname === '/profile' ? 'My Profile' : location.pathname === '/login' ? 'Sign In' : 'Register'}
              </h2>
              <div style={{ width: '44px' }}></div>
            </>
          )}
        </div>
      </header>

      {/* Mobile Search Bar (under header, only on home & listing pages) */}
      {(location.pathname === '/' || location.pathname === '/products') && (
        <div className="mobile-search-bar show-on-mobile">
          <div className="mobile-search-input-wrap">
            <Search size={18} className="mobile-search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="mobile-search-input"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearchSubmit(); }}
            />
          </div>
        </div>
      )}

      {/* Mobile Categories Scroll Pills */}
      {location.pathname === '/' && (
        <div className="mobile-categories-scroll show-on-mobile">
          {['All category', 'Gadgets', 'Clothes', 'Accessories', 'Electronics'].map(cat => (
            <button
              key={cat}
              className="mobile-category-pill"
              onClick={() => {
                if (cat === 'All category') navigate('/products');
                else navigate(`/products?category=${encodeURIComponent(cat === 'Gadgets' || cat === 'Accessories' ? 'Electronics' : cat === 'Clothes' ? 'Clothes and wear' : cat)}`);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {location.pathname === '/products' && (
        <div className="mobile-categories-scroll show-on-mobile">
          {['Tablets', 'Phones', 'Ipads', 'Ipod', 'Accessories', 'Gadgets'].map(subcat => (
            <button
              key={subcat}
              className="mobile-category-pill"
              onClick={() => {
                navigate(`/products?q=${encodeURIComponent(subcat)}`);
              }}
            >
              {subcat}
            </button>
          ))}
        </div>
      )}

      {/* 2. Navigation Bar (Desktop Only) */}
      <nav className="navbar-sub hide-on-mobile">
        <div className="container navbar-inner">
          <div className="navbar-left">
            <div className="navbar-all-wrapper" style={{ position: 'relative' }}>
              <button className="navbar-all-btn" onClick={() => setIsNavCategoryOpen(!isNavCategoryOpen)}>
                <Menu size={18} />
                <span>All category</span>
              </button>
              {isNavCategoryOpen && (
                <ul className="nav-category-dropdown">
                  {['Clothes and wear', 'Home interiors', 'Electronics', 'Smartphones', 'Mobile accessory', 'Modern tech'].map(cat => (
                    <li key={cat} onClick={() => {
                      navigate(`/products?category=${encodeURIComponent(cat)}`);
                      setIsNavCategoryOpen(false);
                    }}>
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="navbar-links">
              <li><Link to="/products?offers=true">Hot offers</Link></li>
              <li><Link to="/products?category=Home%20interiors">Gift boxes</Link></li>
              <li><Link to="/products?category=Electronics">Projects</Link></li>
              <li><Link to="/products?category=Smartphones">Smartphones</Link></li>
              <li style={{ position: 'relative' }}>
                <span 
                  className="has-dropdown" 
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} 
                  onClick={() => setIsHelpOpen(!isHelpOpen)}
                >
                  Help <ChevronDown size={12} />
                </span>
                {isHelpOpen && (
                  <ul className="nav-category-dropdown" style={{ left: 'auto', right: 0 }}>
                    <li onClick={() => { setIsHelpOpen(false); navigate('/profile'); }}>My Profile</li>
                    <li onClick={() => { setIsHelpOpen(false); navigate('/cart'); }}>My Cart</li>
                    <li onClick={() => { setIsHelpOpen(false); alert('Customer support: support@brandestore.com'); }}>Contact Support</li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="navbar-right">
            <button className="nav-dropdown-btn">
              <span>English, USD</span>
              <ChevronDown size={12} />
            </button>
            <button className="nav-dropdown-btn">
              <span>Ship to</span>
              <span className="flag-icon">🇩🇪</span>
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
