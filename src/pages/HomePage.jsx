import React, { useState } from 'react';
import {
  User,
  Search,
  Settings,
  Truck,
  BarChart2,
  ChevronDown,
  Mail,
  Package,
  Car,
  Shirt,
  Home as HomeIcon,
  Laptop,
  Wrench,
  Compass,
  PawPrint,
  Settings2,
  Grid as GridIcon
} from 'lucide-react';
import Countdown from '../components/Countdown';
import {
  categories,
  dealItems,
  homeItems,
  techItems,
  recommended,
  services,
  regions
} from '../data/mockData';

// Import local category banner images
import clothCategoryImg from '../IMAGES/cloth/1.jpg';
import techCategoryImg from '../IMAGES/tech/6.jpg';
import interiorCategoryImg from '../IMAGES/interior/1.jpg';

export default function HomePage({ navigate, addToCart, currentUser, handleLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('Automobiles');

  return (
    <main className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-inner">
          <aside className="hero-sidebar hide-on-mobile">
            <ul>
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    className={selectedCategory === cat ? 'active' : ''}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat === 'Computer and tech' || cat === 'More category') {
                        navigate('/products?category=Electronics');
                      } else {
                        navigate(`/products?category=${encodeURIComponent(cat)}`);
                      }
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hero-banner">
            <div className="hero-content">
              <p className="hero-sub">Latest trending</p>
              <h1 className="hero-title">Electronic<br />items</h1>
              <button className="hero-cta" onClick={() => navigate('/products?category=Electronics')}>Learn more</button>
            </div>
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80"
                alt="Electronics"
                className="hero-img"
              />
            </div>
          </div>

          <aside className="hero-aside hide-on-mobile">
            <div className="aside-user">
              <div className="avatar-placeholder" style={{ overflow: 'hidden' }}>
                {currentUser && currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="Profile" className="avatar-img-aside" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={20} color="#8b96a5" />
                )}
              </div>
              <div>
                <p className="aside-greeting">Hi, {currentUser ? currentUser.name : 'user'}</p>
                <p className="aside-sub">{currentUser ? 'Welcome back!' : "let's get started"}</p>
              </div>
            </div>
            {currentUser ? (
              <>
                <button className="btn-primary aside-btn" onClick={() => navigate('/profile')}>My Profile</button>
                <button className="btn-outline aside-btn" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <button className="btn-primary aside-btn" onClick={() => navigate('/register')}>Join now</button>
                <button className="btn-outline aside-btn" onClick={() => navigate('/login')}>Log in</button>
              </>
            )}
            <div className="aside-promo aside-promo-orange" onClick={() => navigate('/products?brand=Samsung')}>
              <p>Get US $10 off</p>
              <small>with a new supplier</small>
            </div>
            <div className="aside-promo aside-promo-blue" onClick={() => navigate('/products?q=')}>
              <p>Send quotes with supplier preferences</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Deals and Offers Section */}
      <section className="section">
        <div className="container">
          <div className="deals-card">
            <div className="deals-header">
              <div>
                <h2 className="section-title">Deals and offers</h2>
                <p className="section-sub">Hygiene equipments</p>
              </div>
              <Countdown />
            </div>
            <div className="deals-grid">
              {dealItems.map((item, i) => (
                <button 
                  key={i} 
                  className="deal-item animate-slide-up hover-lift" 
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => navigate('/products?category=Electronics')}
                >
                  <div className="deal-img-wrap">
                    <img src={item.img} alt={item.name} className="hover-scale" />
                  </div>
                  <p className="deal-name">{item.name}</p>
                  <span className="badge-discount">{item.discount}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Shop by Category Section */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title mb-16">Shop by Category</h2>

          <div className="categories-grid-layout">
            {/* Featured Category: Clothes */}
            <div
              className="category-card-featured card-cloth"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.45)), url(${clothCategoryImg})` }}
              onClick={() => navigate('/products?category=Clothes%20and%20wear')}
            >
              <div className="featured-card-content">
                <div className="featured-card-icon-wrap">
                  <Shirt size={24} color="#ffffff" />
                </div>
                <h3 className="featured-card-title">Clothes & Wear</h3>
                <p className="featured-card-subtitle">Trending fashion & apparel</p>
                <span className="featured-card-link">Explore Now &rarr;</span>
              </div>
            </div>

            {/* Featured Category: Electronics */}
            <div
              className="category-card-featured card-tech"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.45)), url(${techCategoryImg})` }}
              onClick={() => navigate('/products?category=Electronics')}
            >
              <div className="featured-card-content">
                <div className="featured-card-icon-wrap">
                  <Laptop size={24} color="#ffffff" />
                </div>
                <h3 className="featured-card-title">Computer & Tech</h3>
                <p className="featured-card-subtitle">Laptops, gadgets & tech</p>
                <span className="featured-card-link">Explore Now &rarr;</span>
              </div>
            </div>

            {/* Featured Category: Interiors */}
            <div
              className="category-card-featured card-interior"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.45)), url(${interiorCategoryImg})` }}
              onClick={() => navigate('/products?category=Home%20interiors')}
            >
              <div className="featured-card-content">
                <div className="featured-card-icon-wrap">
                  <HomeIcon size={24} color="#ffffff" />
                </div>
                <h3 className="featured-card-title">Home Interiors</h3>
                <p className="featured-card-subtitle">Modern furniture & decor</p>
                <span className="featured-card-link">Explore Now &rarr;</span>
              </div>
            </div>

            {/* Other Categories Mini Grid */}
            <div className="categories-mini-grid">
              {[
                { name: 'Automobiles', icon: Car, search: 'Automobiles', color: '#e8f0fe', iconColor: '#1a73e8' },
                { name: 'Tools & Equipments', icon: Wrench, search: 'Tools, equipments', color: '#fef7e0', iconColor: '#f9ab00' },
                { name: 'Sports & Outdoor', icon: Compass, search: 'Sports and outdoor', color: '#e6f4ea', iconColor: '#1e8e3e' },
                { name: 'Animal & Pets', icon: PawPrint, search: 'Animal and pets', color: '#fce8e6', iconColor: '#d93025' },
                { name: 'Machinery Tools', icon: Settings2, search: 'Machinery tools', color: '#f3e8fd', iconColor: '#a142f4' },
                { name: 'All Categories', icon: GridIcon, search: '', color: '#eff2f4', iconColor: '#5f6368' },
              ].map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <div
                    key={idx}
                    className="category-mini-card animate-slide-up hover-lift"
                    style={{ animationDelay: `${idx * 40}ms` }}
                    onClick={() => navigate(cat.search ? `/products?category=${encodeURIComponent(cat.search)}` : '/products')}
                  >
                    <div className="mini-card-icon-wrap" style={{ backgroundColor: cat.color }}>
                      <IconComponent size={20} color={cat.iconColor} />
                    </div>
                    <span className="mini-card-name">{cat.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Home & Outdoor + Consumer Electronics Grid Sections */}
      {[
        {
          title: 'Home and outdoor',
          img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=320&auto=format&fit=crop&q=80',
          items: homeItems,
          bgClass: 'home-outdoor-sidebar',
          targetCategory: 'Home interiors'
        },
        {
          title: 'Consumer electronics and gadgets',
          img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=320&auto=format&fit=crop&q=80',
          items: techItems,
          bgClass: 'electronics-sidebar',
          targetCategory: 'Electronics'
        },
      ].map(section => (
        <section className="section" key={section.title}>
          <div className="container">
            {/* Mobile Section Header */}
            <div className="mobile-section-header show-on-mobile">
              <h2 className="section-title">{section.title === 'Consumer electronics and gadgets' ? 'Consumer electronics' : section.title}</h2>
            </div>

            <div className="cat-section-card">
              <div
                className={`cat-section-sidebar ${section.bgClass} hide-on-mobile`}
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${section.img})` }}
              >
                <h2 className="cat-sidebar-title">{section.title}</h2>
                <button className="btn-sidebar-cta" onClick={() => navigate(`/products?category=${encodeURIComponent(section.targetCategory)}`)}>
                  Source now
                </button>
              </div>
              <div className="cat-items-grid">
                {section.items.map((item, i) => (
                  <button key={i} className="cat-item" onClick={() => navigate(`/products?q=${encodeURIComponent(item.name)}`)}>
                    <div className="cat-item-text">
                      <p className="cat-item-name">{item.name}</p>
                      <p className="cat-item-price">From <br />USD {item.price}</p>
                    </div>
                    <div className="cat-item-img">
                      <img src={item.img} alt={item.name} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Section Footer Link */}
            <div className="mobile-section-footer show-on-mobile">
              <button className="mobile-source-now-link" onClick={() => navigate(`/products?category=${encodeURIComponent(section.targetCategory)}`)}>
                Source now &rarr;
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* RFQ Section */}
      <section className="quote-section">
        <div className="container quote-container">
          <div className="quote-banner-bg" style={{ backgroundImage: `linear-gradient(90deg, rgba(26,115,232,0.9) 0%, rgba(13,110,253,0.7) 100%), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80')` }}>
            <div className="quote-left">
              <h2>An easy way to send requests to all suppliers</h2>
              <p className="hide-on-mobile">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <button className="btn-primary quote-submit-btn show-on-mobile" onClick={() => navigate('/products')}>Send inquiry</button>
            </div>
            <div className="quote-form-card hide-on-mobile">
              <h3>Send quote to suppliers</h3>
              <input placeholder="What item you need?" className="quote-input-field" />
              <textarea placeholder="Type more details" rows={3} className="quote-textarea" />
              <div className="quote-row">
                <input placeholder="Quantity" className="quote-input" />
                <div className="quote-select-wrapper">
                  <select className="quote-select">
                    <option>Pcs</option>
                    <option>Kg</option>
                    <option>Box</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>
              </div>
              <button className="btn-primary quote-submit-btn" onClick={() => navigate('/products')}>Send inquiry</button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Items Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title mb-16">Recommended items</h2>
          <div className="product-grid">
            {recommended.map((item, index) => (
              <div 
                key={item.id} 
                className="product-card animate-slide-up hover-lift"
                style={{ animationDelay: `${(index % 5) * 50}ms` }}
              >
                <div className="product-img-wrap" onClick={() => navigate(`/product/${item.id + 100}`)}>
                  <img src={item.img} alt={item.name} className="hover-scale" />
                </div>
                <div className="product-info">
                  <p className="product-price">${item.price.toFixed(2)}</p>
                  <p className="product-name" onClick={() => navigate(`/product/${item.id + 100}`)} style={{ cursor: 'pointer' }}>{item.name}</p>
                  <button
                    className="product-add-cart-btn"
                    onClick={() => addToCart({ id: item.id + 100, name: item.name, price: item.price, img: item.img })}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Services Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title mb-16">Our extra services</h2>
          <div className="services-grid">
            {services.map((s, i) => (
              <div 
                key={i} 
                className="service-card animate-slide-up hover-lift" 
                style={{ animationDelay: `${i * 75}ms` }}
                onClick={() => navigate('/products')}
              >
                <div className="service-img" style={{ overflow: 'hidden' }}>
                  <img src={s.img} alt={s.title} className="hover-scale" />
                  <div className="service-icon-circle">
                    <s.icon size={20} color="#1c1c1c" />
                  </div>
                </div>
                <div className="service-text">
                  <p className="service-title">{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers by Region Section */}
      <section className="section">
        <div className="container">
          <div className="regions-card">
            <h2 className="section-title mb-16">Suppliers by region</h2>
            <div className="regions-grid">
              {regions.map((r, i) => (
                <a key={i} href="/" className="region-item" onClick={(e) => { e.preventDefault(); navigate(`/products?q=${encodeURIComponent(r.name)}`); }}>
                  <span className="region-flag">{r.flag}</span>
                  <div className="region-info">
                    <p className="region-name">{r.name}</p>
                    <p className="region-url">{r.url}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container newsletter-inner">
          <h3>Subscribe on our newsletter</h3>
          <p>Get daily news on upcoming offers from many suppliers all over the world</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <div className="email-input-wrapper">
              <Mail size={18} className="email-icon" />
              <input type="email" placeholder="Email" required className="newsletter-input" />
            </div>
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}
