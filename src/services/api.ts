
// This file will serve as the main API service for fetching dashboard data
// Replace with actual API calls when backend is available

// Generic fetch function for future API integration
export async function fetchData<T>(endpoint: string, options = {}): Promise<T> {
  try {
    // In a real implementation, this would call an actual API
    // For now, we'll simulate a delay and return mock data
    const mockDataMap = {
      '/seller/stats': mockSellerStats,
      '/seller/orders': mockOrders,
      '/seller/products': mockProducts,
      '/customer/stats': mockCustomerStats,
      '/customer/orders': mockCustomerOrders,
      '/customer/wishlist': mockWishlist,
      '/customer/addresses': mockAddresses,
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock data based on endpoint
    return mockDataMap[endpoint as keyof typeof mockDataMap] as T;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

// Mock data
export const mockSellerStats = {
  revenue: {
    total: 45231,
    change: 18,
    period: 'last month'
  },
  productsSold: {
    total: 59,
    change: 12,
    period: 'last month'
  },
  newCustomers: {
    total: 24,
    change: 8,
    period: 'last month'
  },
  pendingOrders: {
    total: 7,
    change: -2,
    period: 'yesterday'
  },
  salesData: [
    { name: 'Jan', total: 4800 },
    { name: 'Feb', total: 5900 },
    { name: 'Mar', total: 3800 },
    { name: 'Apr', total: 7200 },
    { name: 'May', total: 6500 },
    { name: 'Jun', total: 9800 },
  ],
  productCategories: [
    { name: 'Handicrafts', value: 40 },
    { name: 'Home Decor', value: 25 },
    { name: 'Textiles', value: 20 },
    { name: 'Jewelry', value: 15 },
  ]
};

export const mockOrders = [
  { id: 1, customer: 'Anita Sharma', product: 'Handcrafted Textile Wall Hanging', amount: 1200, status: 'Delivered' },
  { id: 2, customer: 'Rajesh Kumar', product: 'Ceramic Planter Set', amount: 850, status: 'Processing' },
  { id: 3, customer: 'Priya Mehta', product: 'Embroidered Cushion Covers', amount: 1500, status: 'Shipped' },
  { id: 4, customer: 'Vikram Singh', product: 'Bamboo Storage Basket', amount: 650, status: 'Pending' },
];

export const mockProducts = [
  { id: 1, name: 'Handcrafted Textile Wall Hanging', price: 1200, stock: 8, sold: 12 },
  { id: 2, name: 'Ceramic Planter Set', price: 850, stock: 15, sold: 7 },
  { id: 3, name: 'Embroidered Cushion Covers', price: 1500, stock: 20, sold: 15 },
  { id: 4, name: 'Bamboo Storage Basket', price: 650, stock: 5, sold: 25 },
];

export const mockCustomerStats = {
  orders: {
    total: 12,
    recent: 3,
    period: 'this month'
  },
  wishlist: {
    total: 8,
    added: 2,
    period: 'recently'
  },
  addresses: {
    total: 2,
    names: 'Home & Office'
  },
  recentlyViewed: [
    { id: 1, name: 'Handcrafted Wall Hanging', price: 1200, image: 'https://images.unsplash.com/photo-1591192818044-6d0e89c379f5' },
    { id: 2, name: 'Organic Honey', price: 350, image: 'https://images.unsplash.com/photo-1586870346189-0b070ffd3a9a' },
    { id: 3, name: 'Silver Filigree Earrings', price: 1800, image: 'https://images.unsplash.com/photo-1581252584470-6402d716ec8f' }
  ]
};

export const mockCustomerOrders = [
  { id: 1234, date: '2023-08-15', items: 2, total: 2050, status: 'Delivered' },
  { id: 1235, date: '2023-09-22', items: 1, total: 850, status: 'Processing' },
  { id: 1236, date: '2023-10-05', items: 3, total: 1750, status: 'Shipped' },
];

export const mockWishlist = [
  { id: 1, name: 'Handcrafted Textile Wall Hanging', price: 1200, seller: 'Lakshmi Crafts' },
  { id: 2, name: 'Organic Honey (500g)', price: 350, seller: 'Nature\'s Bounty' },
  { id: 3, name: 'Silver Filigree Earrings', price: 1800, seller: 'Silver Heritage' },
];

export const mockAddresses = [
  { id: 1, name: 'Home', address: '123 Main Street, Green Park', city: 'Delhi', state: 'Delhi', pincode: '110016', default: true },
  { id: 2, name: 'Office', address: '456 Business Avenue, Sector 18', city: 'Noida', state: 'UP', pincode: '201301', default: false },
];
