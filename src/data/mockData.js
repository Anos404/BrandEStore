import { Search, Settings, Truck, BarChart2 } from 'lucide-react';

// Import local tech images
import tech1 from '../IMAGES/tech/1.jpg';
import tech2 from '../IMAGES/tech/2.jpg';
import tech3 from '../IMAGES/tech/3.jpg';
import tech4 from '../IMAGES/tech/4.jpg';
import tech5 from '../IMAGES/tech/5.jpg';
import tech6 from '../IMAGES/tech/6.jpg';
import tech7 from '../IMAGES/tech/7.jpg';
import tech8 from '../IMAGES/tech/8.jpg';
import tech9 from '../IMAGES/tech/9.jpg';
import tech10 from '../IMAGES/tech/10.jpg';

// Import local interior images
import interior1 from '../IMAGES/interior/1.jpg';
import interior2 from '../IMAGES/interior/2.jpg';
import interior3 from '../IMAGES/interior/3.jpg';
import interior4 from '../IMAGES/interior/4.jpg';
import interior5 from '../IMAGES/interior/5.jpg';
import interior6 from '../IMAGES/interior/6.jpg';
import interior7 from '../IMAGES/interior/7.jpg';
import interior8 from '../IMAGES/interior/8.jpg';
import interior9 from '../IMAGES/interior/9.jpg';
import interior10 from '../IMAGES/interior/10.jpg';

// Import local cloth images
import cloth1 from '../IMAGES/cloth/1.jpg';
import cloth2 from '../IMAGES/cloth/2.jpg';
import cloth3 from '../IMAGES/cloth/3.jpg';
import cloth4 from '../IMAGES/cloth/4.jpg';
import cloth5 from '../IMAGES/cloth/5.jpg';
import cloth6 from '../IMAGES/cloth/6.jpg';
import cloth7 from '../IMAGES/cloth/7.jpg';

export const productsData = [
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
    img: tech2,
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
    img: tech5,
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
    img: tech7,
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
    img: tech6,
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
    img: tech1,
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
    img: tech8,
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
    img: tech10,
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
    img: tech9,
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
    img: tech3,
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
    img: tech4,
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
    img: tech9,
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
    img: tech3,
    description: 'Galaxy Buds2 Pro deliver studio-quality sound with 24-bit Hi-Fi audio, active noise canceling, and comfortable ergonomic design.'
  }
];

export const categories = [
  'Automobiles', 'Clothes and wear', 'Home interiors',
  'Computer and tech', 'Tools, equipments', 'Sports and outdoor',
  'Animal and pets', 'Machinery tools', 'More category',
];

export const dealItems = [
  { name: 'Smart watches', discount: '-25%', img: tech1 },
  { name: 'Laptops', discount: '-15%', img: tech4 },
  { name: 'GoPro cameras', discount: '-40%', img: tech5 },
  { name: 'Headphones', discount: '-25%', img: tech3 },
  { name: 'Canon cameras', discount: '-25%', img: tech2 },
];

export const homeItems = [
  { name: 'Soft chairs', price: '19', img: interior1 },
  { name: 'Sofa & chair', price: '19', img: interior2 },
  { name: 'Kitchen dishes', price: '19', img: interior3 },
  { name: 'Minimalist lamp', price: '19', img: interior4 },
  { name: 'Kitchen mixer', price: '100', img: interior5 },
  { name: 'Blenders', price: '39', img: interior6 },
  { name: 'Home appliance', price: '19', img: interior7 },
  { name: 'Coffee maker', price: '10', img: interior8 },
];

export const techItems = [
  { name: 'Smart watches', price: '19', img: tech1 },
  { name: 'Cameras', price: '89', img: tech2 },
  { name: 'Headphones', price: '70', img: tech3 },
  { name: 'Fitness watch', price: '90', img: tech4 },
  { name: 'Gaming set', price: '35', img: tech5 },
  { name: 'Laptops & PC', price: '340', img: tech6 },
  { name: 'Smartphones', price: '19', img: tech7 },
  { name: 'Electric kettle', price: '240', img: tech8 },
];

export const recommended = [
  { id: 1, name: 'T-shirts with multiple colors, for men', price: 10.30, img: cloth1 },
  { id: 2, name: 'Jeans shorts for men blue color', price: 10.30, img: cloth2 },
  { id: 3, name: 'Brown winter coat medium size', price: 12.50, img: cloth3 },
  { id: 4, name: 'Jeans bag for travel for men', price: 31.00, img: cloth4 },
  { id: 5, name: 'Leather wallet', price: 99.00, img: cloth5 },
  { id: 6, name: 'Canon camera black, 100x zoom', price: 9.99, img: tech2 },
  { id: 7, name: 'Headset for gaming with mic', price: 8.95, img: tech3 },
  { id: 8, name: 'Smartwatch silver color modern', price: 10.30, img: tech1 },
  { id: 9, name: 'Blue wallet for men leather metarfial', price: 10.30, img: cloth6 },
  { id: 10, name: 'Jeans bag for travel for men', price: 80.95, img: cloth7 },
];

export const services = [
  { icon: Search, title: 'Source from Industry Hubs', img: interior9 },
  { icon: Settings, title: 'Customize Your Products', img: interior10 },
  { icon: Truck, title: 'Fast, reliable shipping by ocean or air', img: tech9 },
  { icon: BarChart2, title: 'Product monitoring and inspection', img: tech10 },
];

export const defaultDetailFields = {
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

export function enrichProduct(product) {
  const category = product.category || 'Products';
  return {
    ...defaultDetailFields,
    breadcrumbs: ['Home', 'Products', category],
    ...product,
    gallery: product.gallery || [product.img, product.img, product.img, product.img, product.img],
    reviews: product.reviews ?? Math.max(12, Math.floor((product.orders || 50) / 5)),
    sold: product.sold ?? product.orders ?? 50,
    size: product.size || 'Medium',
    color: product.color || 'Blue',
  };
}

export const allProducts = [
  ...productsData.map(enrichProduct),
  ...recommended.map(item => {
    let category = 'Clothes and wear';
    if (item.name.toLowerCase().includes('camera') || item.name.toLowerCase().includes('headset')) {
      category = 'Electronics'; // Map to Electronics to match core data
    } else if (item.name.toLowerCase().includes('watch')) {
      category = 'Mobile accessory';
    }
    return enrichProduct({
      id: item.id + 100,
      name: item.name,
      price: item.price,
      img: item.img,
      category: category,
      brand: 'Generic',
      oldPrice: item.price * 1.25,
      rating: 4.3,
      orders: 80,
      features: ['Metallic'],
      condition: 'Brand new',
      shipping: 'Free Shipping',
      description: `${item.name}. High quality product with excellent craftsmanship and modern design suitable for everyday use.`,
      breadcrumbs: ['Home', 'Products', category],
      seller: item.id % 2 === 0 ? 'Best factory LLC' : 'Artel Market',
    });
  })
];

export function getAllProducts() {
  return allProducts;
}

export function getProductById(id) {
  return allProducts.find(p => p.id === Number(id));
}

export const savedForLaterDefaults = [
  { id: 7, name: 'Lenovo Yoga Tab 11 - Slate Grey tablet', price: 349.00, img: tech10 },
  { id: 3, name: 'iPhone 13 Pro Max - 256GB Red Special', price: 999.00, img: tech7 },
  { id: 5, name: 'Smart Watch Series 7 - Platinum Grey', price: 299.00, img: tech1 },
  { id: 10, name: 'HP Pavilion Laptop 15-inch - Silver Pro', price: 599.00, img: tech4 },
];

export const regions = [
  { flag: '🇦🇪', name: 'Arabic Emirates', url: 'shopname.ae' },
  { flag: '🇦🇺', name: 'Australia', url: 'shopname.com.au' },
  { flag: '🇺🇸', name: 'United States', url: 'shopname.com' },
  { flag: '🇷🇺', name: 'Russia', url: 'shopname.ru' },
  { flag: '🇮🇹', name: 'Italy', url: 'shopname.it' },
  { flag: '🇩🇰', name: 'Denmark', url: 'shopname.dk' },
  { flag: '🇫🇷', name: 'France', url: 'shopname.com.fr' },
  { flag: '🇨🇳', name: 'China', url: 'shopname.co.cn' },
  { flag: '🇬🇧', name: 'Great Britain', url: 'shopname.co.uk' },
];
