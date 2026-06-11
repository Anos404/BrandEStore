import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Truck,
  CreditCard,
  MapPin,
  Calendar,
  ShoppingBag,
  ArrowRight,
  Home
} from 'lucide-react';

export default function OrderConfirmationPage({ navigate }) {
  const location = useLocation();
  const order = location.state?.order;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <main className="confirmation-page-wrap animate-fade-in">
        <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <ShoppingBag size={80} color="var(--gray-300)" style={{ margin: '0 auto 20px' }} />
          <h2>Order Not Found</h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: '20px' }}>
            It looks like you navigated here directly. Please browse our products to place an order.
          </p>
          <button className="btn-primary" onClick={() => navigate('/products')}>
            Shop Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="confirmation-page-wrap animate-fade-in">
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Top Success Banner */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="success-checkmark-wrapper">
            <div className="checkmark-circle">
              <svg className="checkmark-svg" viewBox="0 0 52 52">
                <path
                  className="checkmark-path"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--gray-900)', marginBottom: '6px' }}>
            Thank you for your order!
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--gray-600)' }}>
            We've sent a confirmation email to <strong>{order.shippingAddress.email}</strong>.
          </p>
        </div>

        {/* Order Details Grid Layout */}
        <div className="checkout-card animate-slide-up">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px', paddingBottom: '16px', borderBottom: '1px solid var(--gray-100)', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order Number</span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gray-900)', margin: '2px 0 0' }}>{order.id}</h3>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Placed</span>
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--gray-700)', margin: '2px 0 0' }}>{order.date}</p>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Est. Delivery</span>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#00b517', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Truck size={14} /> {order.deliveryDate}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</span>
              <span className="status-badge processing" style={{ display: 'block', marginTop: '2px', backgroundColor: '#e5f1ff', color: 'var(--blue)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', width: 'fit-content' }}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="confirmation-card-layout">
            
            {/* Info boxes (Left) */}
            <div>
              <div className="confirm-details-section">
                
                {/* Shipping info */}
                <div className="confirm-info-box hover-glow">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} color="var(--blue)" /> Shipping Address
                  </h4>
                  <p style={{ fontWeight: '500' }}>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '8px' }}>
                    📞 {order.shippingAddress.phone}
                  </p>
                </div>

                {/* Billing/Payment info */}
                <div className="confirm-info-box hover-glow">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={16} color="var(--blue)" /> Payment Method
                  </h4>
                  <p style={{ fontWeight: '500' }}>{order.paymentMethod}</p>
                  
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px' }}>
                    <Calendar size={16} color="var(--blue)" /> Billing Address
                  </h4>
                  <p style={{ fontWeight: '500' }}>
                    {order.billingAddress.firstName} {order.billingAddress.lastName}
                  </p>
                  <p>{order.billingAddress.address}</p>
                  <p>{order.billingAddress.city}, {order.billingAddress.zipCode}</p>
                </div>

              </div>

              {/* Action buttons */}
              <div className="confirm-actions-row">
                <button
                  className="btn-primary hover-glow"
                  onClick={() => navigate('/products')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '15px' }}
                >
                  <Home size={16} /> Continue Shopping
                </button>
                <button
                  className="btn-outline hover-glow"
                  onClick={() => navigate('/profile?tab=orders')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '15px' }}
                >
                  <ShoppingBag size={16} /> View My Orders <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Cost breakdown & items bought (Right) */}
            <div style={{ background: 'var(--gray-50)', padding: '20px', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '14px', borderBottom: '1px solid var(--gray-200)', paddingBottom: '8px', color: 'var(--gray-900)' }}>
                Your Receipt
              </h3>

              {/* Purchased items list */}
              <div className="confirm-item-list">
                {order.items.map(item => (
                  <div key={item.id} className="confirm-item-row">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="confirm-item-img"
                    />
                    <div className="confirm-item-meta">
                      <h4 className="confirm-item-name">{item.name}</h4>
                      <p className="confirm-item-sub">
                        Qty: {item.qty} | Size: {item.size || 'M'}, Color: {item.color || 'Blue'}
                      </p>
                    </div>
                    <span className="confirm-item-price">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price receipt details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--gray-600)', marginTop: '16px', borderTop: '1px solid var(--gray-200)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span style={{ color: 'var(--gray-900)', fontWeight: '500' }}>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--discount-text)' }}>
                    <span>Discount:</span>
                    <span>- ${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping:</span>
                  <span style={{ color: order.shippingFee === 0 ? '#00b517' : 'var(--gray-900)', fontWeight: '500' }}>
                    {order.shippingFee === 0 ? 'Free Shipping' : `$${order.shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes (1%):</span>
                  <span style={{ color: 'var(--gray-900)' }}>${order.tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold', color: 'var(--gray-900)', borderTop: '1px dashed var(--gray-300)', paddingTop: '10px', marginTop: '4px' }}>
                  <span>Amount Paid:</span>
                  <span style={{ color: 'var(--gray-950)' }}>${order.total.toFixed(2)}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
