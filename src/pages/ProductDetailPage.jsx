import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Check,
  MapPin,
  Heart,
  ShoppingCart
} from 'lucide-react';
import StarRating from '../components/StarRating';
import { getProductById, getAllProducts } from '../data/mockData';

export default function ProductDetailPage({ addToCart, wishlist, toggleWishlist, navigate }) {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Medium');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Blue');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes?.[0] || 'Medium');
      setSelectedColor(product.colors?.[0] || 'Blue');
      setQuantity(1);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist.</p>
        <button className="btn-primary" onClick={() => navigate('/products')}>Back to products</button>
      </div>
    );
  }

  const relatedProducts = getAllProducts()
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 6);

  const youMayLike = getAllProducts()
    .filter(p => p.id !== product.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize, color: selectedColor }, quantity);
  };

  return (
    <main className="product-detail-page">
      <div className="container">
        <div className="breadcrumbs">
          {(product.breadcrumbs || ['Home', 'Products']).map((crumb, i, arr) => (
            <React.Fragment key={crumb}>
              {i < arr.length - 1 ? (
                <Link to={i === 0 ? '/' : '/products'}>{crumb}</Link>
              ) : (
                <span className="active-breadcrumb">{crumb}</span>
              )}
              {i < arr.length - 1 && <ChevronRight size={14} />}
            </React.Fragment>
          ))}
        </div>

        <div className="product-detail-top">
          <div className="product-gallery">
            <div className="product-main-image">
              <img src={product.gallery[selectedImage]} alt={product.name} />
            </div>
            <div className="product-thumbnails">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  className={`product-thumb ${selectedImage === i ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail-info">
            {product.inStock && (
              <span className="product-stock-badge"><Check size={14} /> In stock</span>
            )}
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-rating">
              <StarRating rating={product.rating} />
              <span>{product.rating}</span>
              <span className="dot-divider">•</span>
              <span>{product.reviews} reviews</span>
              <span className="dot-divider">•</span>
              <span>{product.sold} sold</span>
            </div>

            <div className="bulk-pricing-row">
              {product.bulkPricing.map(tier => (
                <div key={tier.range} className="bulk-price-box">
                  <strong>${tier.price.toFixed(2)}</strong>
                  <span>{tier.range}</span>
                </div>
              ))}
            </div>

            <table className="product-specs-table">
              <tbody>
                <tr><td>Price:</td><td>{product.specs?.price || 'Negotiable'}</td></tr>
                <tr><td>Type:</td><td>{product.specs?.type || product.category}</td></tr>
                <tr><td>Material:</td><td>{product.specs?.material || product.material}</td></tr>
                <tr><td>Design:</td><td>{product.specs?.design || 'Modern nice'}</td></tr>
              </tbody>
            </table>

            <div className="product-extra-info">
              <p><strong>Customization:</strong> Customized logo and design options available</p>
              <p><strong>Protection:</strong> Refund Policy · Full refund if product is not as described</p>
              <p><strong>Warranty:</strong> 2 years full warranty</p>
            </div>
          </div>

          <aside className="product-supplier-card">
            <span className="supplier-label">Supplier</span>
            <h3>{product.supplier.name}</h3>
            <p className="supplier-location"><MapPin size={14} /> {product.supplier.location}</p>
            <div className="supplier-badges">
              {product.supplier.verified && <span className="supplier-badge verified">Verified Seller</span>}
              {product.supplier.worldwide && <span className="supplier-badge shipping">Worldwide shipping</span>}
            </div>
            <button className="btn-primary supplier-inquiry-btn">Send inquiry</button>
            <button className="btn-outline supplier-profile-btn">Seller&apos;s profile</button>
            <button
              className={`save-later-link ${wishlist.includes(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart size={16} fill={wishlist.includes(product.id) ? 'red' : 'none'} color={wishlist.includes(product.id) ? 'red' : '#0d6efd'} />
              Save for later
            </button>

            <div className="detail-options">
              <div className="detail-option-row">
                <label>Size</label>
                <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                  {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="detail-option-row">
                <label>Color</label>
                <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
                  {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="detail-option-row">
                <label>Quantity</label>
                <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="detail-price-display">${product.price.toFixed(2)}</div>
            <button className="btn-primary detail-add-cart" onClick={handleAddToCart}>
              <ShoppingCart size={16} /> Add to cart
            </button>
            <button className="btn-outline detail-buy-now" onClick={() => { handleAddToCart(); navigate('/cart'); }}>
              Buy now
            </button>
          </aside>
        </div>

        <div className="product-detail-middle">
          <div className="product-tabs-section">
            <div className="product-tabs">
              {['description', 'reviews', 'shipping', 'about seller'].map(tab => (
                <button
                  key={tab}
                  className={`product-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="product-tab-content">
              {activeTab === 'description' && (
                <>
                  <p className="product-description-text">{product.description}</p>
                  <table className="product-detail-spec-table">
                    <tbody>
                      {product.specTable.map(row => (
                        <tr key={row.label}>
                          <td>{row.label}</td>
                          <td>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="product-feature-list">
                    {product.detailFeatures.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'reviews' && (
                <p className="tab-placeholder">Customer reviews coming soon. Average rating: {product.rating} from {product.reviews} reviews.</p>
              )}
              {activeTab === 'shipping' && (
                <p className="tab-placeholder">{product.shipping}. Delivery within 5-10 business days. Free returns within 30 days.</p>
              )}
              {activeTab === 'about seller' && (
                <div className="tab-placeholder">
                  <p><strong>{product.supplier.name}</strong> — {product.supplier.location}</p>
                  <p>Verified supplier with worldwide shipping. Seller: {product.seller}</p>
                </div>
              )}
            </div>
          </div>

          <aside className="you-may-like-sidebar">
            <h4>You may like</h4>
            {youMayLike.map(item => (
              <div key={item.id} className="you-may-like-item" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.img} alt={item.name} />
                <div>
                  <p className="ym-title">{item.name}</p>
                  <p className="ym-price">${item.price.toFixed(2)} - ${(item.price * 1.5).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>

        <section className="related-products-section">
          <h2 className="section-title mb-16">Related products</h2>
          <div className="related-products-grid">
            {(relatedProducts.length > 0 ? relatedProducts : getAllProducts().slice(0, 6)).map(item => (
              <div key={item.id} className="related-product-card" onClick={() => navigate(`/product/${item.id}`)}>
                <div className="related-product-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <p className="related-product-name">{item.name}</p>
                <p className="related-product-price">${item.price.toFixed(2)} - ${(item.price * 1.25).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cart-promo-banner detail-promo">
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
