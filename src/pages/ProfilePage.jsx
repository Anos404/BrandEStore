import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Heart,
  Camera,
  MapPin
} from 'lucide-react';
import { getProductById, getAllProducts } from '../data/mockData';

export default function ProfilePage({ currentUser, handleLogout, handleUpdateProfile, navigate, wishlist }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [searchParams] = useSearchParams();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  // Sync tab from query parameter
  const tabParam = searchParams.get('tab');
  useEffect(() => {
    if (tabParam === 'orders') {
      setActiveTab('orders');
    } else if (tabParam === 'wishlist') {
      setActiveTab('wishlist');
    } else {
      setActiveTab('details');
    }
  }, [tabParam]);

  // Sync form states with currentUser
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
    setPhone(currentUser.phone || '');
    setAddress(currentUser.address || '');
    setBio(currentUser.bio || '');
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleSave = (e) => {
    e.preventDefault();
    handleUpdateProfile({ name, email, phone, address, bio });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock Order History data
  const mockOrders = [
    { id: 'ORD-98234', date: 'June 02, 2026', total: 1097.50, status: 'In Transit', items: 'Canon Camera EOS 2000 x1, Smart Watch Series 7 x1' },
    { id: 'ORD-98012', date: 'May 14, 2026', total: 99.50, status: 'Delivered', items: 'GoPro HERO6 4K Action Camera x1' }
  ];

  return (
    <main className="profile-page-wrap">
      <div className="container profile-container">
        
        {/* Profile Banner Card */}
        <div className="profile-banner-card">
          <div className="profile-banner-bg" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80')" }}></div>
          <div className="profile-banner-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="Profile" />
                ) : (
                  <User size={48} color="#8b96a5" />
                )}
                <label className="avatar-upload-overlay" htmlFor="avatar-file-input">
                  <Camera size={20} color="white" />
                  <span>Upload</span>
                </label>
              </div>
              <input 
                type="file" 
                id="avatar-file-input" 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
              />
            </div>
            <div className="profile-meta-info">
              <h2>{currentUser.name}</h2>
              <p>{currentUser.email}</p>
            </div>
            <button className="btn-outline logout-btn" onClick={handleLogout}>Log out</button>
          </div>
        </div>

        {/* Profile Tabs & Details */}
        <div className="profile-content-layout">
          <aside className="profile-tabs-sidebar">
            <button 
              className={`profile-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => navigate('/profile?tab=details')}
            >
              <User size={16} /> Account Details
            </button>
            <button 
              className={`profile-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => navigate('/profile?tab=orders')}
            >
              <ShoppingBag size={16} /> Order History
            </button>
            <button 
              className={`profile-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => navigate('/profile?tab=wishlist')}
            >
              <Heart size={16} /> My Wishlist ({wishlist.length})
            </button>
          </aside>

          <section className="profile-main-section">
            
            {/* Account Details Tab */}
            {activeTab === 'details' && (
              <div className="profile-details-card">
                <div className="card-header-row">
                  <h3>Personal Information</h3>
                  {!isEditing && (
                    <button className="btn-outline edit-profile-btn" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSave} className="profile-edit-form">
                    <div className="form-grid">
                      <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                      </div>
                      <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                      </div>
                      <div className="input-group">
                        <label>Phone Number</label>
                        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label>Address</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                      </div>
                      <div className="input-group full-width">
                        <label>Short Bio</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">Save Changes</button>
                      <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-info-grid">
                    <div className="info-row">
                      <span className="info-label">Full Name:</span>
                      <span className="info-value">{currentUser.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{currentUser.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{currentUser.phone || 'Not specified'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Address:</span>
                      <span className="info-value">{currentUser.address || 'Not specified'}</span>
                    </div>
                    <div className="info-row full-width">
                      <span className="info-label">About Me:</span>
                      <p className="info-value bio-text">{currentUser.bio || 'Add a short bio to let suppliers know more about you.'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === 'orders' && (
              <div className="profile-orders-card">
                <h3>Your Orders</h3>
                <div className="orders-table-wrapper">
                  {mockOrders.length > 0 ? (
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map(order => (
                          <tr key={order.id}>
                            <td><strong>{order.id}</strong></td>
                            <td>{order.date}</td>
                            <td className="order-items-td">{order.items}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                              <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-orders-text">You haven't placed any orders yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="profile-wishlist-card">
                <h3>My Wishlist</h3>
                {wishlist.length > 0 ? (
                  <div className="wishlist-items-grid">
                    {wishlist.map(id => {
                      const product = getProductById(id) || getAllProducts().find(p => p.id === id);
                      if (!product) return null;
                      return (
                        <div key={product.id} className="wishlist-item" onClick={() => navigate(`/product/${product.id}`)}>
                          <img src={product.img} alt={product.name} />
                          <div className="wishlist-item-meta">
                            <p className="wl-price">${product.price.toFixed(2)}</p>
                            <p className="wl-name">{product.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="no-orders-text">Your wishlist is empty.</p>
                )}
              </div>
            )}

          </section>
        </div>

      </div>
    </main>
  );
}
