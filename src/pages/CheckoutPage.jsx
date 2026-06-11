import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Lock,
  ArrowLeft,
  MapPin,
  User,
  Mail,
  Phone,
  AlertCircle,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function CheckoutPage({
  cartItems,
  cartTotal,
  cartCount,
  currentUser,
  clearCart,
  navigate,
  onPlaceOrder,
  initialDiscount = 0,
  initialCoupon = ''
}) {
  // Check if cart is empty, redirect if so
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/products');
    }
  }, [cartItems, navigate]);

  // Form states - Shipping Address
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: '',
    zipCode: '',
    country: 'Pakistan'
  });

  // Prefill details if user is logged in
  useEffect(() => {
    if (currentUser) {
      const nameParts = currentUser.name ? currentUser.name.split(' ') : [];
      setShippingForm(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      }));
    }
  }, [currentUser]);

  // Billing address state
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingForm, setBillingForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Pakistan'
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'paypal'
  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState(initialCoupon);
  const [discount, setDiscount] = useState(initialDiscount);

  // Errors state
  const [errors, setErrors] = useState({});
  const [isPlacing, setIsPlacing] = useState(false);

  // Card detection
  const [cardType, setCardType] = useState('unknown'); // visa, mastercard, amex, unknown

  // Track card number input formatting
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // numbers only
    if (value.length > 16) value = value.slice(0, 16);

    // Card detection
    if (value.startsWith('4')) {
      setCardType('visa');
    } else if (/^5[1-5]/.test(value)) {
      setCardType('mastercard');
    } else if (/^3[47]/.test(value)) {
      setCardType('amex');
    } else {
      setCardType('unknown');
    }

    // Format with spaces
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    setCardDetails(prev => ({ ...prev, cardNumber: parts.join(' ') }));
  };

  // Expiry date formatter (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // numbers only
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length > 2) {
      setCardDetails(prev => ({ ...prev, expiryDate: `${value.slice(0, 2)}/${value.slice(2)}` }));
    } else {
      setCardDetails(prev => ({ ...prev, expiryDate: value }));
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const limit = cardDetails.cardNumber.startsWith('3') ? 4 : 3; // Amex uses 4 CVV
    if (value.length <= limit) {
      setCardDetails(prev => ({ ...prev, cvv: value }));
    }
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SAVE60') {
      setDiscount(60);
      setErrors(prev => ({ ...prev, coupon: null }));
    } else if (code === 'SAVE10') {
      setDiscount(cartTotal * 0.1);
      setErrors(prev => ({ ...prev, coupon: null }));
    } else if (code === '') {
      setDiscount(0);
      setErrors(prev => ({ ...prev, coupon: null }));
    } else {
      setDiscount(0);
      setErrors(prev => ({ ...prev, coupon: 'Invalid coupon code.' }));
    }
  };

  // Calculate pricing
  const subtotal = cartTotal;
  const shippingFee = subtotal > 200 ? 0 : 10.00;
  const tax = Math.max(0, (subtotal - discount) * 0.01);
  const total = Math.max(0, subtotal - discount + shippingFee + tax);

  // Validate fields
  const validateForm = () => {
    const newErrors = {};

    // Validate shipping
    if (!shippingForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Email regex
    if (!shippingForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!shippingForm.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingForm.address.trim()) newErrors.address = 'Street address is required';
    if (!shippingForm.city.trim()) newErrors.city = 'City is required';
    if (!shippingForm.zipCode.trim()) newErrors.zipCode = 'Zip code is required';

    // Validate billing if not same
    if (!billingSameAsShipping) {
      if (!billingForm.firstName.trim()) newErrors.billFirstName = 'First name is required';
      if (!billingForm.lastName.trim()) newErrors.billLastName = 'Last name is required';
      if (!billingForm.address.trim()) newErrors.billAddress = 'Street address is required';
      if (!billingForm.city.trim()) newErrors.billCity = 'City is required';
      if (!billingForm.zipCode.trim()) newErrors.billZipCode = 'Zip code is required';
    }

    // Validate payment
    if (paymentMethod === 'card') {
      if (!cardDetails.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
      
      const cleanCard = cardDetails.cardNumber.replace(/\s/g, '');
      if (!cleanCard) {
        newErrors.cardNumber = 'Card number is required';
      } else if (cleanCard.length < 13 || cleanCard.length > 16) {
        newErrors.cardNumber = 'Invalid card number length';
      }

      if (!cardDetails.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiration is required';
      } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Format must be MM/YY';
      }

      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (cardDetails.cvv.length < 3) {
        newErrors.cvv = 'Invalid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementsByName(firstError)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setIsPlacing(true);

    // Simulate 1.5s card verification & charging spinner
    setTimeout(() => {
      setIsPlacing(false);

      const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const deliveryDays = 3 + Math.floor(Math.random() * 3);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
      const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const newOrder = {
        id: orderId,
        date: orderDate,
        deliveryDate: deliveryDateStr,
        items: cartItems,
        subtotal,
        shippingFee,
        discount,
        tax,
        total,
        shippingAddress: { ...shippingForm },
        billingAddress: billingSameAsShipping ? { ...shippingForm } : { ...billingForm },
        paymentMethod: paymentMethod === 'card' 
          ? `Credit Card (Ending in ${cardDetails.cardNumber.slice(-4)})` 
          : 'PayPal',
        status: 'Processing',
        userEmail: currentUser?.email || shippingForm.email
      };

      onPlaceOrder(newOrder);
      clearCart();
      
      // Navigate to order confirmation
      navigate('/order-confirmation', { state: { order: newOrder } });
    }, 1500);
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return <span style={{ fontWeight: 'bold', color: '#1a1f71', letterSpacing: '-1px' }}>VISA</span>;
      case 'mastercard':
        return <span style={{ fontWeight: 'bold', color: '#eb001b' }}>MasterCard</span>;
      case 'amex':
        return <span style={{ fontWeight: 'bold', color: '#007bc1' }}>AMEX</span>;
      default:
        return <CreditCard size={18} color="#8b96a5" />;
    }
  };

  return (
    <main className="checkout-page-wrap animate-fade-in">
      <div className="container">
        
        {/* Back navigation */}
        <button className="btn-outline" onClick={() => navigate('/cart')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '8px 16px' }}>
          <ArrowLeft size={16} /> Back to Cart
        </button>

        <h1>Checkout</h1>

        <div className="checkout-grid">
          
          {/* Checkout Forms (Left side) */}
          <div className="checkout-main-forms">
            <form onSubmit={handlePlaceOrderSubmit}>
              
              {/* Shipping Address Card */}
              <div className="checkout-card animate-slide-up">
                <h2 className="checkout-card-title">
                  <MapPin size={20} color="#0d6efd" /> Shipping Information
                </h2>

                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingForm.firstName}
                      onChange={e => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="e.g. John"
                    />
                    {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                  </div>
                  <div className="checkout-form-group">
                    <label>Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingForm.lastName}
                      onChange={e => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="e.g. Doe"
                    />
                    {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingForm.email}
                      onChange={e => setShippingForm({ ...shippingForm, email: e.target.value })}
                      className={errors.email ? 'error' : ''}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>
                  <div className="checkout-form-group">
                    <label>Phone Number*</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={e => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      className={errors.phone ? 'error' : ''}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>
                </div>

                <div className="checkout-form-group">
                  <label>Street Address*</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingForm.address}
                    onChange={e => setShippingForm({ ...shippingForm, address: e.target.value })}
                    className={errors.address ? 'error' : ''}
                    placeholder="123 Shopping Blvd, Apt 4B"
                  />
                  {errors.address && <span className="error-msg">{errors.address}</span>}
                </div>

                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>City*</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingForm.city}
                      onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className={errors.city ? 'error' : ''}
                      placeholder="Tech City"
                    />
                    {errors.city && <span className="error-msg">{errors.city}</span>}
                  </div>
                  <div className="checkout-form-group">
                    <label>Zip Code*</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingForm.zipCode}
                      onChange={e => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                      className={errors.zipCode ? 'error' : ''}
                      placeholder="94043"
                    />
                    {errors.zipCode && <span className="error-msg">{errors.zipCode}</span>}
                  </div>
                </div>

                <div className="checkout-form-group">
                  <label>Country*</label>
                  <select
                    value={shippingForm.country}
                    onChange={e => setShippingForm({ ...shippingForm, country: e.target.value })}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="China">China</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                  </select>
                </div>

                {/* Billing Address Toggle */}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="billingSame"
                    checked={billingSameAsShipping}
                    onChange={e => setBillingSameAsShipping(e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="billingSame" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer', color: 'var(--gray-800)' }}>
                    My billing address is the same as shipping
                  </label>
                </div>

                {/* Billing fields drawer */}
                <div className={`billing-address-details ${!billingSameAsShipping ? 'open' : ''}`}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '20px 0 10px', color: 'var(--gray-900)' }}>Billing Address</h3>
                  <div className="checkout-form-row">
                    <div className="checkout-form-group">
                      <label>First Name*</label>
                      <input
                        type="text"
                        name="billFirstName"
                        value={billingForm.firstName}
                        onChange={e => setBillingForm({ ...billingForm, firstName: e.target.value })}
                        className={errors.billFirstName ? 'error' : ''}
                        placeholder="John"
                      />
                      {errors.billFirstName && <span className="error-msg">{errors.billFirstName}</span>}
                    </div>
                    <div className="checkout-form-group">
                      <label>Last Name*</label>
                      <input
                        type="text"
                        name="billLastName"
                        value={billingForm.lastName}
                        onChange={e => setBillingForm({ ...billingForm, lastName: e.target.value })}
                        className={errors.billLastName ? 'error' : ''}
                        placeholder="Doe"
                      />
                      {errors.billLastName && <span className="error-msg">{errors.billLastName}</span>}
                    </div>
                  </div>

                  <div className="checkout-form-group">
                    <label>Street Address*</label>
                    <input
                      type="text"
                      name="billAddress"
                      value={billingForm.address}
                      onChange={e => setBillingForm({ ...billingForm, address: e.target.value })}
                      className={errors.billAddress ? 'error' : ''}
                      placeholder="123 Billing Ave"
                    />
                    {errors.billAddress && <span className="error-msg">{errors.billAddress}</span>}
                  </div>

                  <div className="checkout-form-row">
                    <div className="checkout-form-group">
                      <label>City*</label>
                      <input
                        type="text"
                        name="billCity"
                        value={billingForm.city}
                        onChange={e => setBillingForm({ ...billingForm, city: e.target.value })}
                        className={errors.billCity ? 'error' : ''}
                        placeholder="Billing City"
                      />
                      {errors.billCity && <span className="error-msg">{errors.billCity}</span>}
                    </div>
                    <div className="checkout-form-group">
                      <label>Zip Code*</label>
                      <input
                        type="text"
                        name="billZipCode"
                        value={billingForm.zipCode}
                        onChange={e => setBillingForm({ ...billingForm, zipCode: e.target.value })}
                        className={errors.billZipCode ? 'error' : ''}
                        placeholder="12345"
                      />
                      {errors.billZipCode && <span className="error-msg">{errors.billZipCode}</span>}
                    </div>
                  </div>

                  <div className="checkout-form-group">
                    <label>Country*</label>
                    <select
                      value={billingForm.country}
                      onChange={e => setBillingForm({ ...billingForm, country: e.target.value })}
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="China">China</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Payment Info Card */}
              <div className="checkout-card animate-slide-up delay-75">
                <h2 className="checkout-card-title">
                  <CreditCard size={20} color="#0d6efd" /> Payment Method
                </h2>

                <div className="payment-options-grid">
                  <div
                    className={`payment-option-card hover-glow ${paymentMethod === 'card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentMethod === 'card'}
                      readOnly
                    />
                    <div className="payment-option-icon">
                      <CreditCard size={24} />
                    </div>
                    <strong>Credit / Debit Card</strong>
                  </div>

                  <div
                    className={`payment-option-card hover-glow ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      checked={paymentMethod === 'paypal'}
                      readOnly
                    />
                    <div className="payment-option-icon" style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', color: '#003087' }}>
                      PayPal
                    </div>
                    <strong>PayPal Checkout</strong>
                  </div>
                </div>

                {/* Credit Card Input details */}
                <div className={`payment-card-details ${paymentMethod === 'card' ? 'open' : ''}`}>
                  <div className="checkout-form-group">
                    <label>Cardholder Name*</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardDetails.cardholderName}
                      onChange={e => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                      className={errors.cardholderName ? 'error' : ''}
                      placeholder="e.g. John Doe"
                    />
                    {errors.cardholderName && <span className="error-msg">{errors.cardholderName}</span>}
                  </div>

                  <div className="checkout-form-group">
                    <label>Card Number*</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardNumberChange}
                        className={errors.cardNumber ? 'error' : ''}
                        placeholder="4444 4444 4444 4444"
                        style={{ paddingRight: '50px' }}
                      />
                      <div style={{ position: 'absolute', right: '14px', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                        {getCardIcon()}
                      </div>
                    </div>
                    {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                  </div>

                  <div className="checkout-form-row">
                    <div className="checkout-form-group">
                      <label>Expiration Date*</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleExpiryChange}
                        className={errors.expiryDate ? 'error' : ''}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <span className="error-msg">{errors.expiryDate}</span>}
                    </div>
                    <div className="checkout-form-group">
                      <label>CVV/CVC*</label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCvvChange}
                        className={errors.cvv ? 'error' : ''}
                        placeholder="•••"
                      />
                      {errors.cvv && <span className="error-msg">{errors.cvv}</span>}
                    </div>
                  </div>
                </div>

                {/* PayPal information display */}
                {paymentMethod === 'paypal' && (
                  <div className="animate-fade-in" style={{ padding: '15px', background: '#f0f5fa', borderRadius: 'var(--radius)', border: '1px solid #c8dcf0', marginTop: '10px' }}>
                    <p style={{ fontSize: '14px', color: '#003087', margin: 0 }}>
                      After placing order, you will be redirected to PayPal website to verify and authorize your payment securely.
                    </p>
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* Sidebar checkout summary */}
          <aside className="checkout-sidebar animate-scale-in">
            <div className="checkout-card" style={{ position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--gray-900)' }}>Order Summary</h3>
              
              {/* Items in summary list */}
              <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '16px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '10px' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', border: '1px solid var(--gray-200)', borderRadius: '4px', objectFit: 'contain', background: 'white' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gray-900)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--gray-500)', margin: 0 }}>
                        Qty: {item.qty} | {item.color || 'Blue'}, {item.size || 'M'}
                      </p>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gray-800)' }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Row */}
              <div style={{ margin: '15px 0', paddingBottom: '15px', borderBottom: '1px solid var(--gray-100)' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Tag size={14} color="#8b96a5" style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} />
                    <input
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      style={{ padding: '8px 8px 8px 30px', fontSize: '13px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius)', width: '100%', outline: 'none' }}
                    />
                  </div>
                  <button type="button" className="btn-outline hover-glow" onClick={handleApplyCoupon} style={{ padding: '8px 16px', fontSize: '13px' }}>
                    Apply
                  </button>
                </div>
                {errors.coupon && <p style={{ color: 'var(--discount-text)', fontSize: '11px', margin: '4px 0 0' }}>{errors.coupon}</p>}
                {discount > 0 && <p style={{ color: '#00b517', fontSize: '12px', fontWeight: '500', margin: '6px 0 0' }}>✓ Coupon applied successfully!</p>}
              </div>

              {/* Price rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span style={{ color: 'var(--gray-900)' }}>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--discount-text)' }}>
                    <span>Discount:</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Shipping:</span>
                  <span style={{ color: shippingFee === 0 ? '#00b517' : 'var(--gray-900)', fontWeight: shippingFee === 0 ? '500' : 'normal' }}>
                    {shippingFee === 0 ? 'Free Shipping' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Tax:</span>
                  <span style={{ color: 'var(--gray-900)' }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--gray-100)', paddingTop: '12px', fontSize: '16px', fontWeight: 'bold', color: 'var(--gray-900)' }}>
                  <span>Total:</span>
                  <span style={{ color: 'var(--gray-950)' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                onClick={handlePlaceOrderSubmit}
                disabled={isPlacing}
                className="place-order-btn"
              >
                {isPlacing ? (
                  <>
                    <span className="spinner"></span>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Lock size={16} /> Place Order (${total.toFixed(2)})
                  </>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', color: '#8b96a5', fontSize: '11px' }}>
                <ShieldCheck size={14} color="#00b517" />
                <span>30-Day Money Back Guarantee</span>
              </div>
            </div>
          </aside>

        </div>

      </div>
    </main>
  );
}
