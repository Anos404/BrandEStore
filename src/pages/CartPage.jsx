import React, { useState } from 'react';
import {
  ShoppingBag,
  MoreVertical,
  Minus,
  Plus,
  ArrowLeft,
  Lock,
  MessageSquare,
  Truck,
  ShoppingCart
} from 'lucide-react';
import { getProductById } from '../data/mockData';

export default function CartPage({
  cartItems,
  cartTotal,
  cartCount,
  savedForLater,
  setSavedForLater,
  removeFromCart,
  setCartQty,
  saveForLater,
  moveSavedToCart,
  clearCart,
  navigate,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SAVE60') {
      setDiscount(60);
    } else if (couponCode.trim().toUpperCase() === 'SAVE10') {
      setDiscount(cartTotal * 0.1);
    } else {
      setDiscount(0);
      alert('Invalid coupon code. Try SAVE60 or SAVE10');
    }
  };

  const handleQtyChange = (id, currentQty, delta) => {
    setCartQty(id, Math.max(1, currentQty + delta));
  };

  const tax = Math.max(0, (cartTotal - discount) * 0.01);
  const orderTotal = Math.max(0, cartTotal - discount + tax);

  return (
    <main className="cart-page-wrap">
      <div className="container cart-page-container">
        <h1 className="cart-page-heading">My cart ({cartCount})</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty-page">
            <ShoppingBag size={80} color="#d1d5db" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven&apos;t added anything to your cart yet.</p>
            <button className="btn-primary" onClick={() => navigate('/products')}>Browse Products</button>
          </div>
        ) : (
          <div className="cart-page-layout">
            <div className="cart-main-col">
              <div className="cart-items-card">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="cart-item-card animate-slide-up" style={{ animationDelay: `${index * 75}ms` }}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="cart-item-card-img hover-scale"
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    <div className="cart-item-card-body">
                      <div className="cart-item-card-top">
                        <div>
                          <h3
                            className="cart-item-card-title"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            {item.name}
                          </h3>
                          <p className="cart-item-card-meta">
                            Size: {item.size || 'medium'}, Color: {item.color || 'blue'}, Material: {item.material || 'Plastic'}
                          </p>
                          <p className="cart-item-card-seller">Seller: {item.seller || 'Artel Market'}</p>
                        </div>
                        <span className="cart-item-card-price hide-on-mobile">${item.price.toFixed(2)}</span>

                        <button className="cart-item-more-btn show-on-mobile" onClick={() => saveForLater(item.id)}>
                          <MoreVertical size={20} color="#8b96a5" />
                        </button>
                      </div>

                      {/* Desktop actions row */}
                      <div className="cart-item-card-actions hide-on-mobile">
                        <div className="cart-qty-select-wrap">
                          <label>Qty:</label>
                          <select
                            value={item.qty}
                            onChange={e => setCartQty(item.id, e.target.value)}
                            className="cart-qty-select"
                          >
                            {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                        <button className="cart-action-remove" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                        <button className="cart-action-save" onClick={() => saveForLater(item.id)}>
                          Save for later
                        </button>
                      </div>

                      {/* Mobile actions & Qty counter row */}
                      <div className="cart-item-card-actions-mobile show-on-mobile">
                        <div className="cart-qty-controls">
                          <button onClick={() => handleQtyChange(item.id, item.qty, -1)}><Minus size={13} /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => handleQtyChange(item.id, item.qty, 1)}><Plus size={13} /></button>
                        </div>
                        <span className="cart-item-card-price-mobile">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="cart-items-footer">
                  <button className="btn-primary cart-back-btn" onClick={() => navigate('/products')}>
                    <ArrowLeft size={16} /> Back to shop
                  </button>
                  <button className="btn-outline cart-remove-all-btn" onClick={clearCart}>
                    Remove all
                  </button>
                </div>
              </div>

              <div className="cart-trust-badges hide-on-mobile">
                <div className="trust-badge">
                  <Lock size={18} />
                  <span>Secure payment</span>
                </div>
                <div className="trust-badge">
                  <MessageSquare size={18} />
                  <span>Customer support</span>
                </div>
                <div className="trust-badge">
                  <Truck size={18} />
                  <span>Free delivery</span>
                </div>
              </div>
            </div>

            <aside className="cart-summary-sidebar">
              <div className="cart-coupon-box hide-on-mobile">
                <h4>Have a coupon?</h4>
                <div className="cart-coupon-row">
                  <input
                    placeholder="Add coupon"
                    className="cart-coupon-input"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                  />
                  <button className="cart-coupon-apply" onClick={handleApplyCoupon}>Apply</button>
                </div>
              </div>

              <div className="cart-price-breakdown">
                <div className="cart-price-row">
                  <span>Items ({cartCount}):</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="cart-price-row discount">
                    <span>Discount:</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="cart-price-row tax">
                  <span>Tax:</span>
                  <span>+ ${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-total-row">
                <span>Total:</span>
                <strong>${orderTotal.toFixed(2)}</strong>
              </div>

              <button 
                className="cart-checkout-green hover-lift hover-scale" 
                onClick={() => navigate('/checkout', { state: { discount, couponCode } })}
              >
                Checkout ({cartCount} items)
              </button>

              <div className="cart-payment-icons hide-on-mobile">
                <span className="pay-icon">AMEX</span>
                <span className="pay-icon">MC</span>
                <span className="pay-icon">PayPal</span>
                <span className="pay-icon">VISA</span>
                <span className="pay-icon">Apple Pay</span>
              </div>
            </aside>
          </div>
        )}

        {savedForLater.length > 0 && (
          <section className="saved-for-later-section">
            <h2 className="saved-section-title">Saved for later</h2>

            {/* Desktop grid */}
            <div className="saved-products-grid hide-on-mobile">
              {savedForLater.map((item, index) => (
                <div key={item.id} className="saved-product-card animate-slide-up" style={{ animationDelay: `${index * 75}ms` }}>
                  <div className="saved-product-img hover-scale" onClick={() => navigate(`/product/${item.id}`)}>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <p className="saved-product-price">${item.price.toFixed(2)}</p>
                  <p className="saved-product-name">{item.name}</p>
                  <button className="saved-move-btn" onClick={() => moveSavedToCart(item)}>
                    <ShoppingCart size={14} /> Move to cart
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile list */}
            <div className="saved-products-list-mobile show-on-mobile">
              {savedForLater.map(item => (
                <div key={item.id} className="saved-item-row-mobile">
                  <img src={item.img} alt={item.name} className="saved-item-img-mobile" onClick={() => navigate(`/product/${item.id}`)} />
                  <div className="saved-item-info-mobile">
                    <div className="saved-item-top-mobile">
                      <div>
                        <h3 className="saved-item-title-mobile" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                        <p className="saved-item-price-mobile">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="saved-item-actions-mobile">
                      <button className="saved-move-btn-mobile" onClick={() => moveSavedToCart(item)}>Move to cart</button>
                      <button className="saved-remove-btn-mobile" onClick={() => setSavedForLater(prev => prev.filter(i => i.id !== item.id))}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="cart-promo-banner hide-on-mobile">
          <div className="cart-promo-content">
            <div>
              <h3>Super discount on more than 100 USD</h3>
              <p>Has elit magna scelerisque, posuere praesent tincidunt at.</p>
            </div>
            <button className="cart-promo-btn" onClick={() => navigate('/products')}>Shop now</button>
          </div>
        </section>
      </div>
    </main>
  );
}
