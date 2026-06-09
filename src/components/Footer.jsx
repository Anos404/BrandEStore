import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ChevronDown
} from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="main-footer">
      <div className="container footer-inner">
        <div className="footer-brand-col">
          <div className="footer-logo" onClick={() => navigate('/')}>
            <div className="logo-icon">
              <Package size={22} color="white" fill="white" />
            </div>
            <span className="logo-text">Brand</span>
          </div>
          <p className="footer-desc">
            Best information about the company gles here but now lorem ipsum is
          </p>
          <div className="footer-socials">
            <a href="/" className="social-icon"><Facebook size={16} /></a>
            <a href="/" className="social-icon"><Twitter size={16} /></a>
            <a href="/" className="social-icon"><Linkedin size={16} /></a>
            <a href="/" className="social-icon"><Instagram size={16} /></a>
            <a href="/" className="social-icon"><Youtube size={16} /></a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>About</h4>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Find store</Link></li>
            <li><Link to="/">Categories</Link></li>
            <li><Link to="/">Blogs</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Partnership</h4>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Find store</Link></li>
            <li><Link to="/">Categories</Link></li>
            <li><Link to="/">Blogs</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Information</h4>
          <ul>
            <li><Link to="/">Help Center</Link></li>
            <li><Link to="/">Money Refund</Link></li>
            <li><Link to="/">Shipping</Link></li>
            <li><Link to="/">Contact us</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>For users</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/profile">Settings</Link></li>
            <li><Link to="/profile?tab=orders">My Orders</Link></li>
          </ul>
        </div>

        <div className="footer-app-col">
          <h4>Get app</h4>
          <div className="app-download-btns">
            <a href="/" className="app-btn apple-btn">
              <span className="app-btn-icon"></span>
              <div className="app-btn-text">
                <span className="app-btn-sub">Download on the</span>
                <span className="app-btn-main">App Store</span>
              </div>
            </a>
            <a href="/" className="app-btn google-btn">
              <span className="app-btn-icon">🤖</span>
              <div className="app-btn-text">
                <span className="app-btn-sub">GET IT ON</span>
                <span className="app-btn-main">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright">© 2023 Ecommerce.</p>
          <div className="footer-lang-selector">
            <span className="lang-flag">🇺🇸</span>
            <span>English</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </footer>
  );
}
