import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
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
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Lock,
  ShieldCheck,
  ChevronDown,
  Grid,
  List as ListIcon,
  Star,
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Check,
  MapPin
} from 'lucide-react';
import './homepage.css';

// ----------------------------------------------------
// Global Product Mock Database
// ----------------------------------------------------
const productsData = [
  {
    id: 1,
    name: 'Canon Camera EOS 2000, Black 10x zoom',
    category: 'Electronics',
    brand: 'Lenovo',
    price: 998.00,
    oldPrice: 1128.00,
    rating: 4.8,
    orders: 154,
    features: ['Metallic'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&auto=format&fit=crop&q=80',
    description: 'Canon EOS Rebel T7 DSLR Camera with EF-S 18-55mm IS II Lens. Features 24.1 Megapixel CMOS sensor and built-in Wi-Fi/NFC technology.'
  },
  {
    id: 2,
    name: 'GoPro HERO6 4K Action Camera - Black',
    category: 'Electronics',
    brand: 'Pocco',
    price: 99.50,
    oldPrice: 128.00,
    rating: 4.5,
    orders: 342,
    features: ['Metallic', 'Super power'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&auto=format&fit=crop&q=80',
    description: 'GoPro HERO6 Black action camera captures smooth 4K video. Built-in stabilization and rugged waterproof design makes it perfect for adventures.'
  },
  {
    id: 3,
    name: 'iPhone 13 Pro Max - 256GB Red Special',
    category: 'Smartphones',
    brand: 'Apple',
    price: 999.00,
    oldPrice: 1128.00,
    rating: 4.9,
    orders: 852,
    features: ['Plastic cover', 'Large Memory', '8GB Ram'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80',
    description: 'Apple iPhone 13 Pro with stunning Super Retina XDR display, pro camera system, and ultra-fast A15 Bionic chip for top performance.'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S22 Ultra - Silver 5G',
    category: 'Smartphones',
    brand: 'Samsung',
    price: 899.00,
    oldPrice: 1049.00,
    rating: 4.7,
    orders: 620,
    features: ['Metallic', '8GB Ram', 'Large Memory'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&auto=format&fit=crop&q=80',
    description: 'Samsung S22 Ultra features an embedded S Pen, nightography cameras, and a long-lasting battery. The ultimate Android flagship.'
  },
  {
    id: 5,
    name: 'Smart Watch Series 7 - Platinum Grey',
    category: 'Mobile accessory',
    brand: 'Apple',
    price: 299.00,
    oldPrice: 349.00,
    rating: 4.6,
    orders: 198,
    features: ['Metallic', 'Super power'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&auto=format&fit=crop&q=80',
    description: 'Stay connected and track your fitness with the Apple Watch Series 7. Features an always-on display and advanced health monitoring.'
  },
  {
    id: 6,
    name: 'Xiaomi Poco X4 Pro 5G - Ocean Blue',
    category: 'Smartphones',
    brand: 'Pocco',
    price: 299.50,
    oldPrice: 349.00,
    rating: 4.4,
    orders: 541,
    features: ['Plastic cover', '8GB Ram', 'Super power'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&auto=format&fit=crop&q=80',
    description: 'Poco X4 Pro offers 5G connectivity, a 108MP triple camera, and 67W turbocharging at an unbeatable price point.'
  },
  {
    id: 7,
    name: 'Lenovo Yoga Tab 11 - Slate Grey tablet',
    category: 'Modern tech',
    brand: 'Lenovo',
    price: 349.00,
    oldPrice: 399.00,
    rating: 4.3,
    orders: 120,
    features: ['Plastic cover', 'Large Memory'],
    condition: 'Refurbished',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80',
    description: 'Lenovo Yoga Tab 11 is designed for entertainment with an 11-inch 2K display and JBL quad speakers. Built-in kickstand for multiple modes.'
  },
  {
    id: 8,
    name: 'Huawei MatePad Pro - Midnight Blue',
    category: 'Modern tech',
    brand: 'Huawei',
    price: 499.00,
    oldPrice: 599.00,
    rating: 3.9,
    orders: 85,
    features: ['Metallic', '8GB Ram', 'Large Memory'],
    condition: 'Refurbished',
    shipping: 'Paid Shipping',
    img: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&auto=format&fit=crop&q=80',
    description: 'Huawei MatePad Pro offers an immersive FullView display, powerful Kirin processor, and seamless multi-screen collaboration with Huawei devices.'
  },
  {
    id: 9,
    name: 'Sony WH-1000XM4 Noise Canceling Headphones',
    category: 'Mobile accessory',
    brand: 'Samsung',
    price: 249.00,
    oldPrice: 349.00,
    rating: 4.8,
    orders: 945,
    features: ['Plastic cover', 'Super power'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    description: 'Industry-leading noise cancellation, exceptional sound quality, and smart touch controls make the Sony WH-1000XM4 the perfect travel companion.'
  },
  {
    id: 10,
    name: 'HP Pavilion Laptop 15-inch - Silver Pro',
    category: 'Electronics',
    brand: 'Lenovo',
    price: 599.00,
    oldPrice: 729.00,
    rating: 4.2,
    orders: 204,
    features: ['Metallic', '8GB Ram', 'Large Memory'],
    condition: 'Old items',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&auto=format&fit=crop&q=80',
    description: 'HP Pavilion Laptop delivers reliable performance with a fast Intel Core processor, high-definition graphics, and a sleek modern design.'
  },
  {
    id: 11,
    name: 'Apple iPad Air 5 - Blue Wi-Fi',
    category: 'Modern tech',
    brand: 'Apple',
    price: 549.00,
    oldPrice: 599.00,
    rating: 4.8,
    orders: 412,
    features: ['Metallic', 'Large Memory', '8GB Ram'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80',
    description: 'iPad Air with the breakthrough M1 chip. Features a 10.9-inch Liquid Retina display, 12MP ultra-wide front camera, and Apple Pencil support.'
  },
  {
    id: 12,
    name: 'Samsung Galaxy Buds2 Pro - Graphite',
    category: 'Mobile accessory',
    brand: 'Samsung',
    price: 149.00,
    oldPrice: 229.00,
    rating: 3.5,
    orders: 531,
    features: ['Plastic cover', 'Super power'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80',
    description: 'Galaxy Buds2 Pro deliver studio-quality sound with 24-bit Hi-Fi audio, active noise canceling, and comfortable ergonomic design.'
  }
];

// ----------------------------------------------------
// Mock Data for Homepage Catalog and static sections
// ----------------------------------------------------
const categories = [
  'Automobiles', 'Clothes and wear', 'Home interiors',
  'Computer and tech', 'Tools, equipments', 'Sports and outdoor',
  'Animal and pets', 'Machinery tools', 'More category',
];

const dealItems = [
  { name: 'Smart watches', discount: '-25%', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=180&auto=format&fit=crop&q=80' },
  { name: 'Laptops', discount: '-15%', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=180&auto=format&fit=crop&q=80' },
  { name: 'GoPro cameras', discount: '-40%', img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=180&auto=format&fit=crop&q=80' },
  { name: 'Headphones', discount: '-25%', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=180&auto=format&fit=crop&q=80' },
  { name: 'Canon cameras', discount: '-25%', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=180&auto=format&fit=crop&q=80' },
];

const homeItems = [
  { name: 'Soft chairs', price: '19', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=140&auto=format&fit=crop&q=80' },
  { name: 'Sofa & chair', price: '19', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=140&auto=format&fit=crop&q=80' },
  { name: 'Kitchen dishes', price: '19', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=140&auto=format&fit=crop&q=80' },
  { name: 'Smart watches', price: '19', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=140&auto=format&fit=crop&q=80' },
  { name: 'Kitchen mixer', price: '100', img: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=140&auto=format&fit=crop&q=80' },
  { name: 'Blenders', price: '39', img: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=140&auto=format&fit=crop&q=80' },
  { name: 'Home appliance', price: '19', img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=140&auto=format&fit=crop&q=80' },
  { name: 'Coffee maker', price: '10', img: 'https://images.unsplash.com/photo-1579888944880-d98341148733?w=140&auto=format&fit=crop&q=80' },
];

const techItems = [
  { name: 'Smart watches', price: '19', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=140&auto=format&fit=crop&q=80' },
  { name: 'Cameras', price: '89', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=140&auto=format&fit=crop&q=80' },
  { name: 'Headphones', price: '70', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=140&auto=format&fit=crop&q=80' },
  { name: 'Smart watches', price: '90', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=140&auto=format&fit=crop&q=80' },
  { name: 'Gaming set', price: '35', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=140&auto=format&fit=crop&q=80' },
  { name: 'Laptops & PC', price: '340', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=140&auto=format&fit=crop&q=80' },
  { name: 'Smartphones', price: '19', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=140&auto=format&fit=crop&q=80' },
  { name: 'Electric kettle', price: '240', img: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=140&auto=format&fit=crop&q=80' },
];

const recommended = [
  { id: 1, name: 'T-shirts with multiple colors, for men', price: 10.30, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=220&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Jeans shorts for men blue color', price: 10.30, img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=220&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Brown winter coat medium size', price: 12.50, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=220&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Jeans bag for travel for men', price: 31.00, img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=220&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Leather wallet', price: 99.00, img: 'https://images.unsplash.com/photo-1627124718515-47feef7a6c3f?w=220&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Canon camera black, 100x zoom', price: 9.99, img: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=220&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Headset for gaming with mic', price: 8.95, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=220&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Smartwatch silver color modern', price: 10.30, img: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=220&auto=format&fit=crop&q=80' },
  { id: 9, name: 'Blue wallet for men leather metarfial', price: 10.30, img: 'https://images.unsplash.com/photo-1588444650733-d8c8541f6478?w=220&auto=format&fit=crop&q=80' },
  { id: 10, name: 'Jeans bag for travel for men', price: 80.95, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=220&auto=format&fit=crop&q=80' },
];

const services = [
  { icon: Search, title: 'Source from Industry Hubs', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=320&auto=format&fit=crop&q=80' },
  { icon: Settings, title: 'Customize Your Products', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=320&auto=format&fit=crop&q=80' },
  { icon: Truck, title: 'Fast, reliable shipping by ocean or air', img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=320&auto=format&fit=crop&q=80' },
  { icon: BarChart2, title: 'Product monitoring and inspection', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=320&auto=format&fit=crop&q=80' },
];

// ----------------------------------------------------
// Product detail helpers & unified catalog
// ----------------------------------------------------
const defaultDetailFields = {
  sizes: ['Small', 'Medium', 'Large', 'XL'],
  colors: ['Blue', 'Black', 'Grey', 'White'],
  material: 'Plastic material',
  seller: 'Artel Market',
  inStock: true,
  supplier: {
    name: 'Guanioi Trading LLC',
    location: 'Germany, Berlin',
    verified: true,
    worldwide: true,
  },
  breadcrumbs: ['Home', 'Electronics', 'Products'],
  bulkPricing: [
    { price: 98, range: '50-100 pcs' },
    { price: 90, range: '100-700 pcs' },
    { price: 78, range: '700+ pcs' },
  ],
  specs: {
    price: 'Negotiable',
    type: 'Classic shoes',
    material: 'Plastic material',
    design: 'Modern nice',
  },
  detailFeatures: [
    'Some great feature names here',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'High quality material and durable construction',
  ],
  specTable: [
    { label: 'Model', value: 'For men' },
    { label: 'Style', value: 'Basic style' },
    { label: 'Certificate', value: 'ISO-9001' },
    { label: 'Size', value: '34mm x 450mm x 19mm' },
    { label: 'Memory', value: '36GB RAM' },
  ],
};

function enrichProduct(product) {
  return {
    ...defaultDetailFields,
    ...product,
    gallery: product.gallery || [product.img, product.img, product.img, product.img, product.img],
    reviews: product.reviews ?? Math.max(12, Math.floor((product.orders || 50) / 5)),
    sold: product.sold ?? product.orders ?? 50,
    size: product.size || 'Medium',
    color: product.color || 'Blue',
  };
}

function getAllProducts() {
  const recommendedProducts = recommended.map(item => enrichProduct({
    id: item.id + 100,
    name: item.name,
    price: item.price,
    img: item.img,
    category: 'Clothes and wear',
    brand: 'Generic',
    oldPrice: item.price * 1.25,
    rating: 4.3,
    orders: 80,
    features: ['Metallic'],
    condition: 'Brand new',
    shipping: 'Free Shipping',
    description: `${item.name}. High quality product with excellent craftsmanship and modern design suitable for everyday use.`,
    breadcrumbs: ['Home', 'Clothings', "Men's wear", 'Summer clothing'],
    seller: item.id % 2 === 0 ? 'Best factory LLC' : 'Artel Market',
  }));

  return [...productsData.map(enrichProduct), ...recommendedProducts];
}

function getProductById(id) {
  return getAllProducts().find(p => p.id === Number(id));
}

const savedForLaterDefaults = [
  { id: 7, name: 'Lenovo Yoga Tab 11 - Slate Grey tablet', price: 349.00, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=220&auto=format&fit=crop&q=80' },
  { id: 3, name: 'iPhone 13 Pro Max - 256GB Red Special', price: 999.00, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=220&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Smart Watch Series 7 - Platinum Grey', price: 299.00, img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=220&auto=format&fit=crop&q=80' },
  { id: 10, name: 'HP Pavilion Laptop 15-inch - Silver Pro', price: 599.00, img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=220&auto=format&fit=crop&q=80' },
];

const regions = [
  { flag: '🇦🇪', name: 'Arabic Emirates', url: 'shopname.ae' },
  { flag: '🇦🇺', name: 'Australia', url: 'shopname.com.au' },
  { flag: '🇺🇸', name: 'United States', url: 'shopname.com' },
  { flag: '🇷🇺', name: 'Russia', url: 'shopname.ru' },
  { flag: '🇮🇹', name: 'Italy', url: 'shopname.it' },
  { flag: '🇩🇰', name: 'Denmark', url: 'shopname.dk' },
  { flag: '🇫🇷', name: 'France', url: 'shopname.com.fr' },
  { flag: '🇦🇪', name: 'Arabic Emirates', url: 'shopname.ae' },
  { flag: '🇨🇳', name: 'China', url: 'shopname.co.cn' },
  { flag: '🇬🇧', name: 'Great Britain', url: 'shopname.co.uk' },
];

// ----------------------------------------------------
// Countdown Timer Component
// ----------------------------------------------------
function Countdown() {
  const [time, setTime] = useState({ d: 4, h: 13, m: 34, s: 56 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { d, h, m, s } = prev;
        s--; 
        if (s < 0) { s = 59; m--; } 
        if (m < 0) { m = 59; h--; } 
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return (
    <div className="countdown">
      {[['Days', time.d], ['Hour', time.h], ['Min', time.m], ['Sec', time.s]].map(([label, val]) => (
        <div key={label} className="countdown-item">
          <span className="countdown-num">{pad(val)}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------------------
// Rating Stars Generator Helper
// ----------------------------------------------------
function StarRating({ rating }) {
  const stars = [];
  const rounded = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={14} 
        fill={i <= rounded ? '#ff9017' : 'none'} 
        color={i <= rounded ? '#ff9017' : '#d1d5db'} 
      />
    );
  }
  return <div className="stars-row">{stars}</div>;
}

// ----------------------------------------------------
// Main App Component with Global Layout and Routes
// ----------------------------------------------------
export default function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [wishlist, setWishlist] = useState([]);
  
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

  // Search state in the global header
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('All category');
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);

  // Sync search input with query params if any
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchInput(q);
  }, [searchParams]);

  const handleSearchSubmit = () => {
    const categoryQuery = searchCategory !== 'All category' ? `&category=${encodeURIComponent(searchCategory)}` : '';
    navigate(`/products?q=${encodeURIComponent(searchInput)}${categoryQuery}`);
  };

  const handleCategorySelect = (cat) => {
    setSearchCategory(cat);
    setIsCategorySelectOpen(false);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const searchDropdownCategories = ['All category', 'Electronics', 'Smartphones', 'Mobile accessory', 'Modern tech'];

  return (
    <div className="page-wrapper">
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
      {/* 1. Header */}
      <header className="main-header">
        <div className="container header-inner">
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
            <button className="nav-item-btn" onClick={() => navigate('/')}>
              <User size={20} />
              <span>Profile</span>
            </button>
            <button className="nav-item-btn" onClick={() => navigate('/')}>
              <MessageSquare size={20} />
              <span>Message</span>
            </button>
            <button className="nav-item-btn" onClick={() => navigate('/products')}>
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
      </header>

      {/* 2. Navigation Bar */}
      <nav className="navbar-sub">
        <div className="container navbar-inner">
          <div className="navbar-left">
            <button className="navbar-all-btn" onClick={() => navigate('/products')}>
              <Menu size={18} />
              <span>All category</span>
            </button>
            <ul className="navbar-links">
              <li><Link to="/products">Hot offers</Link></li>
              <li><Link to="/products">Gift boxes</Link></li>
              <li><Link to="/products">Projects</Link></li>
              <li><Link to="/products">Menu item</Link></li>
              <li>
                <span className="has-dropdown" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
                  Help <ChevronDown size={12} />
                </span>
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

      {/* 3. Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage navigate={navigate} addToCart={addToCart} />} />
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
      </Routes>

      {/* 4. Footer */}
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
              <li><Link to="/">Login</Link></li>
              <li><Link to="/">Register</Link></li>
              <li><Link to="/">Settings</Link></li>
              <li><Link to="/">My Orders</Link></li>
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
    </div>
  );
}

// ----------------------------------------------------
// HOMEPAGE COMPONENT
// ----------------------------------------------------
function HomePage({ navigate, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Automobiles');

  return (
    <main className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-inner">
          <aside className="hero-sidebar">
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

          <aside className="hero-aside">
            <div className="aside-user">
              <div className="avatar-placeholder">
                <User size={20} color="#8b96a5" />
              </div>
              <div>
                <p className="aside-greeting">Hi, user</p>
                <p className="aside-sub">let's get started</p>
              </div>
            </div>
            <button className="btn-primary aside-btn" onClick={() => navigate('/products')}>Join now</button>
            <button className="btn-outline aside-btn" onClick={() => navigate('/products')}>Log in</button>
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
                <button key={i} className="deal-item" onClick={() => navigate('/products?category=Electronics')}>
                  <div className="deal-img-wrap">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <p className="deal-name">{item.name}</p>
                  <span className="badge-discount">{item.discount}</span>
                </button>
              ))}
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
            <div className="cat-section-card">
              <div 
                className={`cat-section-sidebar ${section.bgClass}`} 
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
          </div>
        </section>
      ))}

      {/* RFQ Section */}
      <section className="quote-section">
        <div className="container quote-container">
          <div className="quote-banner-bg" style={{ backgroundImage: `linear-gradient(90deg, rgba(26,115,232,0.9) 0%, rgba(13,110,253,0.7) 100%), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80')` }}>
            <div className="quote-left">
              <h2>An easy way to send requests to all suppliers</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div className="quote-form-card">
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
            {recommended.map(item => (
              <div key={item.id} className="product-card">
                <div className="product-img-wrap" onClick={() => navigate(`/product/${item.id + 100}`)}>
                  <img src={item.img} alt={item.name} />
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
              <div key={i} className="service-card" onClick={() => navigate('/products')}>
                <div className="service-img">
                  <img src={s.img} alt={s.title} />
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

// ----------------------------------------------------
// PRODUCT LISTING COMPONENT
// ----------------------------------------------------
function ProductListingPage({ wishlist, toggleWishlist, navigate, addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 1. Read query parameters
  const searchQuery = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';

  // 2. Local filters states
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
  const filteredProducts = productsData.filter(product => {
    // 1. Search Query Filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
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

  return (
    <div className="container products-page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Electronics</Link>
        <ChevronRight size={14} />
        <Link to="/products">Mobile accessory</Link>
        <ChevronRight size={14} />
        <span className="active-breadcrumb">Summer clothing</span>
      </div>

      <div className="products-layout">
        
        {/* Left Side Filter Panel */}
        <aside className="products-sidebar">
          
          {/* Accordion: Category */}
          <div className="sidebar-accordion">
            <div className="accordion-header" onClick={() => toggleAccordion('category')}>
              <span>Category</span>
              <ChevronDown size={16} className={`accordion-icon ${expandedFilters.category ? 'expanded' : ''}`} />
            </div>
            {expandedFilters.category && (
              <div className="accordion-content">
                <ul className="accordion-categories-list">
                  {['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech'].map(cat => (
                    <li key={cat}>
                      <button 
                        className={categoryFilter === cat ? 'active' : ''}
                        onClick={() => setSearchParams({ category: cat, q: searchQuery })}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button onClick={() => setSearchParams({ q: searchQuery })} className={!categoryFilter ? 'active' : ''}>
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
                {/* Visual price slider representation */}
                <div className="price-slider-track">
                  <div className="price-slider-highlight"></div>
                  <div className="price-slider-handle handle-min"></div>
                  <div className="price-slider-handle handle-max"></div>
                </div>
                <form onSubmit={handleApplyPrice} className="price-inputs-row">
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
                      onChange={() => {}}
                    />
                    <div className="rating-stars-list">
                      <StarRating rating={starNum} />
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

        </aside>

        {/* Right Side Product Listing Area */}
        <section className="products-content-area">
          
          {/* Top Toolbar */}
          <div className="listing-toolbar">
            <div className="toolbar-left">
              <span className="items-count-text">
                <strong>{totalItems.toLocaleString()}</strong> items in <strong>{categoryFilter || 'All categories'}</strong>
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

          {/* Active Filter Chips Row */}
          {(selectedBrands.length > 0 || selectedFeatures.length > 0 || selectedCondition !== 'Any' || selectedRating !== null || isVerifiedOnly) && (
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
                <div key={product.id} className="grid-product-card">
                  <div className="grid-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
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
                    <p className="grid-product-name" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>{product.name}</p>
                    <button
                      className="grid-add-cart-btn"
                      onClick={() => addToCart(product)}
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
                <div key={product.id} className="list-product-row">
                  <div className="list-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
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
                      <button className="list-add-cart-btn" onClick={() => addToCart(product)}>
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

      {/* Newsletter Section inside Listing Page */}
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

// ----------------------------------------------------
// CART PAGE COMPONENT
// ----------------------------------------------------
function CartPage({
  cartItems,
  cartTotal,
  cartCount,
  savedForLater,
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
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-card">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="cart-item-card-img"
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
                        <span className="cart-item-card-price">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="cart-item-card-actions">
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

              <div className="cart-trust-badges">
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
              <div className="cart-coupon-box">
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
                  <span>Subtotal:</span>
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

              <button className="cart-checkout-green" onClick={() => alert('Checkout coming soon!')}>
                Checkout
              </button>

              <div className="cart-payment-icons">
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
            <div className="saved-products-grid">
              {savedForLater.map(item => (
                <div key={item.id} className="saved-product-card">
                  <div className="saved-product-img" onClick={() => navigate(`/product/${item.id}`)}>
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
          </section>
        )}

        <section className="cart-promo-banner">
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

// ----------------------------------------------------
// PRODUCT DETAIL PAGE COMPONENT
// ----------------------------------------------------
function ProductDetailPage({ addToCart, wishlist, toggleWishlist, navigate }) {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedSize(product.sizes?.[0] || 'Medium');
      setSelectedColor(product.colors?.[0] || 'Blue');
      setQuantity(1);
    }
  }, [id]);

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