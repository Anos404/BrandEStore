import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  X,
  Grid,
  List as ListIcon,
  Star,
  Settings,
  ShoppingCart,
  Heart,
  Mail
} from 'lucide-react';
import StarRating from '../components/StarRating';
import { getAllProducts } from '../data/mockData';

export default function ProductListingPage({ wishlist, toggleWishlist, navigate, addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read query parameters
  const searchQuery = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';
  const offersParam = searchParams.get('offers') === 'true';

  // 2. Local filters states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedBrands, setSelectedBrands] = useState(brandParam ? [brandParam] : []);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [appliedMin, setAppliedMin] = useState(null);
  const [appliedMax, setAppliedMax] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState('Any');
  const [selectedRating, setSelectedRating] = useState(null);
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Active accordion collapse states
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    brands: true,
    features: true,
    price: true,
    condition: true,
    ratings: true
  });

  // Sync state if search query or brand parameter changes externally (via header)
  useEffect(() => {
    if (brandParam) {
      setSelectedBrands(prev => prev.includes(brandParam) ? prev : [...prev, brandParam]);
    }
  }, [brandParam]);

  // Reset page to 1 when search parameters or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, brandParam]);

  // Toggle brand selections
  const handleBrandChange = (brandName) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
    setCurrentPage(1);
  };

  // Toggle features selections
  const handleFeatureChange = (featureName) => {
    setSelectedFeatures(prev =>
      prev.includes(featureName)
        ? prev.filter(f => f !== featureName)
        : [...prev, featureName]
    );
    setCurrentPage(1);
  };

  // Apply Price Filters
  const handleApplyPrice = (e) => {
    e.preventDefault();
    setAppliedMin(priceMin !== '' ? parseFloat(priceMin) : null);
    setAppliedMax(priceMax !== '' ? parseFloat(priceMax) : null);
    setCurrentPage(1);
  };

  // Clear a single chip filter
  const removeChip = (type, value) => {
    if (type === 'brand') {
      setSelectedBrands(prev => prev.filter(b => b !== value));
      // Also remove parameter if it matches
      if (brandParam === value) {
        const params = new URLSearchParams(searchParams);
        params.delete('brand');
        setSearchParams(params);
      }
    } else if (type === 'feature') {
      setSelectedFeatures(prev => prev.filter(f => f !== value));
    } else if (type === 'rating') {
      setSelectedRating(null);
    } else if (type === 'condition') {
      setSelectedCondition('Any');
    } else if (type === 'verified') {
      setIsVerifiedOnly(false);
    }
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setPriceMin('');
    setPriceMax('');
    setAppliedMin(null);
    setAppliedMax(null);
    setSelectedCondition('Any');
    setSelectedRating(null);
    setIsVerifiedOnly(false);
    setSearchParams({}); // Clear query parameters as well
    setCurrentPage(1);
  };

  const toggleAccordion = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // ----------------------------------------------------
  // Dynamic Filtering Logic
  // ----------------------------------------------------
  const filteredProducts = getAllProducts().filter(product => {
    // 1. Search Query Filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Offers Filter (Hot offers)
    if (offersParam && !product.oldPrice) {
      return false;
    }

    // 2. Category Filter
    if (categoryFilter && categoryFilter !== 'All category' && product.category !== categoryFilter) {
      return false;
    }

    // 3. Brands Filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // 4. Features Filter
    if (selectedFeatures.length > 0) {
      const hasAllFeatures = selectedFeatures.every(f => product.features.includes(f));
      if (!hasAllFeatures) return false;
    }

    // 5. Price Filter
    if (appliedMin !== null && product.price < appliedMin) {
      return false;
    }
    if (appliedMax !== null && product.price > appliedMax) {
      return false;
    }

    // 6. Condition Filter
    if (selectedCondition !== 'Any' && product.condition !== selectedCondition) {
      return false;
    }

    // 7. Ratings Filter
    if (selectedRating !== null && product.rating < selectedRating) {
      return false;
    }

    // 8. Verified Only Filter (simulated: odd id items verified)
    if (isVerifiedOnly && product.id % 2 === 0) {
      return false;
    }

    return true;
  });

  // ----------------------------------------------------
  // Sorting Logic
  // ----------------------------------------------------
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') {
      return a.price - b.price;
    }
    if (sortBy === 'price_high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // Default Featured (unsorted DB order)
  });

  // ----------------------------------------------------
  // Pagination Calculations
  // ----------------------------------------------------
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFilterCount = selectedBrands.length + selectedFeatures.length + (selectedCondition !== 'Any' ? 1 : 0) + (selectedRating !== null ? 1 : 0) + (isVerifiedOnly ? 1 : 0) + (appliedMin !== null || appliedMax !== null ? 1 : 0);

  const youMayLike = getAllProducts().slice(0, 6);

  const sidebarContentMarkup = (
    <>
      {/* Accordion: Category */}
      <div className="sidebar-accordion">
        <div className="accordion-header" onClick={() => toggleAccordion('category')}>
          <span>Category</span>
          <ChevronDown size={16} className={`accordion-icon ${expandedFilters.category ? 'expanded' : ''}`} />
        </div>
        {expandedFilters.category && (
          <div className="accordion-content">
            <ul className="accordion-categories-list">
              {['Clothes and wear', 'Home interiors', 'Electronics', 'Smartphones', 'Mobile accessory', 'Modern tech'].map(cat => (
                <li key={cat}>
                  <button
                    className={categoryFilter === cat ? 'active' : ''}
                    onClick={() => { setSearchParams({ category: cat, q: searchQuery }); setIsFilterOpen(false); }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => { setSearchParams({ q: searchQuery }); setIsFilterOpen(false); }} className={!categoryFilter ? 'active' : ''}>
                  See all
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Accordion: Brands */}
      <div className="sidebar-accordion">
        <div className="accordion-header" onClick={() => toggleAccordion('brands')}>
          <span>Brands</span>
          <ChevronDown size={16} className={`accordion-icon ${expandedFilters.brands ? 'expanded' : ''}`} />
        </div>
        {expandedFilters.brands && (
          <div className="accordion-content">
            {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map(brand => (
              <label key={brand} className="filter-checkbox-row">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Accordion: Features */}
      <div className="sidebar-accordion">
        <div className="accordion-header" onClick={() => toggleAccordion('features')}>
          <span>Features</span>
          <ChevronDown size={16} className={`accordion-icon ${expandedFilters.features ? 'expanded' : ''}`} />
        </div>
        {expandedFilters.features && (
          <div className="accordion-content">
            {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'].map(feat => (
              <label key={feat} className="filter-checkbox-row">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feat)}
                  onChange={() => handleFeatureChange(feat)}
                />
                <span>{feat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Accordion: Price range */}
      <div className="sidebar-accordion">
        <div className="accordion-header" onClick={() => toggleAccordion('price')}>
          <span>Price range</span>
          <ChevronDown size={16} className={`accordion-icon ${expandedFilters.price ? 'expanded' : ''}`} />
        </div>
        {expandedFilters.price && (
          <div className="accordion-content">
            <div className="price-slider-track">
              <div className="price-slider-highlight"></div>
              <div className="price-slider-handle handle-min"></div>
              <div className="price-slider-handle handle-max"></div>
            </div>
            <form onSubmit={(e) => { handleApplyPrice(e); setIsFilterOpen(false); }} className="price-inputs-row">
              <div className="price-input-group">
                <label>Min</label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceMin}
                  onChange={e => setPriceMin(e.target.value)}
                />
              </div>
              <div className="price-input-group">
                <label>Max</label>
                <input
                  type="number"
                  placeholder="999999"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                />
              </div>
              <button type="submit" className="price-apply-btn">Apply</button>
            </form>
          </div>
        )}
      </div>

      {/* Accordion: Condition */}
      <div className="sidebar-accordion">
        <div className="accordion-header" onClick={() => toggleAccordion('condition')}>
          <span>Condition</span>
          <ChevronDown size={16} className={`accordion-icon ${expandedFilters.condition ? 'expanded' : ''}`} />
        </div>
        {expandedFilters.condition && (
          <div className="accordion-content">
            {['Any', 'Refurbished', 'Brand new', 'Old items'].map(cond => (
              <label key={cond} className="filter-checkbox-row">
                <input
                  type="radio"
                  name="condition"
                  checked={selectedCondition === cond}
                  onChange={() => { setSelectedCondition(cond); setCurrentPage(1); }}
                />
                <span>{cond}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Accordion: Ratings */}
      <div className="sidebar-accordion">
        <div className="accordion-header" onClick={() => toggleAccordion('ratings')}>
          <span>Ratings</span>
          <ChevronDown size={16} className={`accordion-icon ${expandedFilters.ratings ? 'expanded' : ''}`} />
        </div>
        {expandedFilters.ratings && (
          <div className="accordion-content">
            {[5, 4, 3, 2].map(starNum => (
              <label key={starNum} className="filter-checkbox-row pointer" onClick={() => { setSelectedRating(starNum); setCurrentPage(1); }}>
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === starNum}
                  onChange={() => { }}
                />
                <div className="rating-stars-list">
                  <StarRating rating={starNum} />
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="container products-page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs hide-on-mobile">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        {categoryFilter ? (
          <>
            <Link to="/products">Products</Link>
            <ChevronRight size={14} />
            <span className="active-breadcrumb">{categoryFilter}</span>
          </>
        ) : offersParam ? (
          <>
            <Link to="/products">Products</Link>
            <ChevronRight size={14} />
            <span className="active-breadcrumb">Hot Offers</span>
          </>
        ) : (
          <span className="active-breadcrumb">All Products</span>
        )}
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isFilterOpen && (
        <div className="filter-drawer-overlay" onClick={() => setIsFilterOpen(false)} />
      )}

      {/* Mobile Filter Drawer */}
      <aside className={`filter-drawer ${isFilterOpen ? 'filter-drawer-open' : ''}`}>
        <div className="filter-drawer-header">
          <h3>Filter ({activeFilterCount})</h3>
          <button className="filter-close-btn" onClick={() => setIsFilterOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="filter-drawer-body">
          <aside className="products-sidebar-mobile">
            {sidebarContentMarkup}
          </aside>
        </div>
        <div className="filter-drawer-footer">
          <button className="btn-primary filter-apply-btn" onClick={() => setIsFilterOpen(false)}>
            Apply ({totalItems})
          </button>
          <button className="btn-outline filter-clear-btn" onClick={() => { clearAllFilters(); setIsFilterOpen(false); }}>
            Clear All
          </button>
        </div>
      </aside>

      <div className="products-layout">

        {/* Left Side Filter Panel (Desktop Only) */}
        <aside className="products-sidebar hide-on-mobile">
          {sidebarContentMarkup}
        </aside>

        {/* Right Side Product Listing Area */}
        <section className="products-content-area">

          {/* Top Toolbar (Desktop Only) */}
          <div className="listing-toolbar hide-on-mobile">
            <div className="toolbar-left">
              <span className="items-count-text">
                <strong>{totalItems.toLocaleString()}</strong> items in <strong>{categoryFilter ? categoryFilter : offersParam ? 'Hot Offers' : 'All categories'}</strong>
              </span>
              <label className="verified-checkbox-label">
                <input
                  type="checkbox"
                  checked={isVerifiedOnly}
                  onChange={e => { setIsVerifiedOnly(e.target.checked); setCurrentPage(1); }}
                />
                <span>Verified only</span>
              </label>
            </div>

            <div className="toolbar-right">
              <div className="sort-dropdown-wrapper">
                <select className="sort-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}>
                  <option value="Featured">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={14} className="sort-arrow-icon" />
              </div>
              <div className="view-toggle-btns">
                <button
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <ListIcon size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Toolbar */}
          <div className="mobile-toolbar show-on-mobile">
            <div className="mobile-sort-btn-wrapper">
              <span className="mobile-sort-label">Sort: </span>
              <select className="mobile-sort-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}>
                <option value="Featured">Newest</option>
                <option value="price_low">Price: Low</option>
                <option value="price_high">Price: High</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown size={14} className="sort-arrow" />
            </div>

            <button className="mobile-filter-toggle-btn" onClick={() => setIsFilterOpen(true)}>
              <span>Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              <Settings size={14} />
            </button>

            <div className="view-toggle-btns-mobile">
              <button
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>

          {/* Active Filter Chips Row */}
          {(selectedBrands.length > 0 || selectedFeatures.length > 0 || selectedCondition !== 'Any' || selectedRating !== null || isVerifiedOnly || appliedMin !== null || appliedMax !== null) && (
            <div className="active-chips-row">
              {selectedBrands.map(b => (
                <div key={b} className="filter-chip">
                  <span>{b}</span>
                  <button onClick={() => removeChip('brand', b)}>×</button>
                </div>
              ))}
              {selectedFeatures.map(f => (
                <div key={f} className="filter-chip">
                  <span>{f}</span>
                  <button onClick={() => removeChip('feature', f)}>×</button>
                </div>
              ))}
              {selectedCondition !== 'Any' && (
                <div className="filter-chip">
                  <span>{selectedCondition}</span>
                  <button onClick={() => removeChip('condition', selectedCondition)}>×</button>
                </div>
              )}
              {selectedRating !== null && (
                <div className="filter-chip">
                  <span>{selectedRating} Star & Up</span>
                  <button onClick={() => removeChip('rating', selectedRating)}>×</button>
                </div>
              )}
              {isVerifiedOnly && (
                <div className="filter-chip">
                  <span>Verified Only</span>
                  <button onClick={() => removeChip('verified', true)}>×</button>
                </div>
              )}
              {(appliedMin !== null || appliedMax !== null) && (
                <div className="filter-chip">
                  <span>
                    Price: {appliedMin !== null ? `$${appliedMin}` : '$0'} - {appliedMax !== null ? `$${appliedMax}` : 'Max'}
                  </span>
                  <button onClick={() => { setPriceMin(''); setPriceMax(''); setAppliedMin(null); setAppliedMax(null); setCurrentPage(1); }}>×</button>
                </div>
              )}
              <button className="clear-all-btn" onClick={clearAllFilters}>Clear all filter</button>
            </div>
          )}

          {/* Product Items Rendering */}
          {paginatedProducts.length === 0 ? (
            <div className="no-products-found">
              <h3>No products found</h3>
              <p>Try adjusting your search query or removing some filters.</p>
              <button className="btn-primary" onClick={clearAllFilters}>Reset Filters</button>
            </div>
          ) : viewMode === 'grid' ? (

            // GRID VIEW LAYOUT (3 Columns)
            <div className="products-grid-view">
              {paginatedProducts.map(product => (
                <div key={product.id} className="grid-product-card" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="grid-img-wrap">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="grid-details-box">
                    <div className="grid-price-row">
                      <div className="grid-prices">
                        <span className="grid-price">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                          <span className="grid-old-price">${product.oldPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        className={`grid-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      >
                        <Heart size={16} fill={wishlist.includes(product.id) ? 'red' : 'none'} color={wishlist.includes(product.id) ? 'red' : '#0d6efd'} />
                      </button>
                    </div>
                    <div className="grid-ratings-row">
                      <StarRating rating={product.rating} />
                      <span className="rating-score-text">{product.rating}</span>
                    </div>
                    <p className="grid-product-name" style={{ cursor: 'pointer' }}>{product.name}</p>
                    <button
                      className="grid-add-cart-btn"
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    >
                      <ShoppingCart size={14} /> Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (

            // LIST VIEW LAYOUT (Vertical Rows)
            <div className="products-list-view">
              {paginatedProducts.map(product => (
                <div key={product.id} className="list-product-row" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="list-img-wrap">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="list-info-wrap">
                    <div className="list-title-row">
                      <h3 className="list-product-title">{product.name}</h3>
                      <button
                        className={`list-wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      >
                        <Heart size={18} fill={wishlist.includes(product.id) ? 'red' : 'none'} color={wishlist.includes(product.id) ? 'red' : '#0d6efd'} />
                      </button>
                    </div>

                    <div className="list-price-row">
                      <span className="list-price">${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="list-old-price">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="list-ratings-row">
                      <StarRating rating={product.rating} />
                      <span className="rating-score-text">{product.rating}</span>
                      <span className="dot-divider">•</span>
                      <span className="orders-count">{product.orders} orders</span>
                      <span className="dot-divider">•</span>
                      <span className="shipping-tag-green">{product.shipping}</span>
                    </div>

                    <p className="list-description">{product.description}</p>
                    <div className="list-action-row">
                      <button className="view-details-link" onClick={() => navigate(`/product/${product.id}`)}>
                        View details
                      </button>
                      <button className="list-add-cart-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
                        <ShoppingCart size={15} /> Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Pagination Control */}
          {totalPages > 1 && (
            <div className="listing-pagination-row">
              <div className="items-per-page-selector">
                <span>Show</span>
                <select className="pagination-limit-select" disabled>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>
              <div className="pagination-nav-btns">
                <button
                  className="page-nav-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    className={`page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  className="page-nav-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

        </section>
      </div>

      {/* You may also like Section */}
      <section className="listing-you-may-like-section">
        <h2 className="section-title mb-16">You may also like</h2>
        <div className="listing-you-may-like-grid">
          {youMayLike.map(item => (
            <div key={item.id} className="you-may-like-card" onClick={() => navigate(`/product/${item.id}`)}>
              <div className="you-may-like-img-wrap">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="you-may-like-info">
                <p className="you-may-like-price">${item.price.toFixed(2)}</p>
                <p className="you-may-like-name">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section listing-newsletter">
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

    </div>
  );
}
