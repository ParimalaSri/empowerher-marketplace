
import { useEffect, useState } from 'react';
import { fetchData, mockCustomerStats, mockCustomerOrders, mockWishlist, mockAddresses } from '@/services/api';

// Types for customer dashboard data
export interface CustomerStats {
  orders: { total: number; recent: number; period: string };
  wishlist: { total: number; added: number; period: string };
  addresses: { total: number; names: string };
  recentlyViewed: Array<{ id: number; name: string; price: number; image: string }>;
}

export interface CustomerOrder {
  id: number;
  date: string;
  items: number;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  seller: string;
}

export interface Address {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  default: boolean;
}

// Hook for fetching customer dashboard statistics
export function useCustomerStats() {
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const data = await fetchData<typeof mockCustomerStats>('/customer/stats');
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  return { stats, loading, error };
}

// Hook for fetching customer orders
export function useCustomerOrders() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchData<typeof mockCustomerOrders>('/customer/orders');
        // Explicitly type cast the status field to ensure it matches CustomerOrder
        const typedOrders = data.map(order => ({
          ...order,
          status: order.status as 'Delivered' | 'Processing' | 'Shipped'
        }));
        setOrders(typedOrders);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return { orders, loading, error };
}

// Hook for fetching wishlist
export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        setLoading(true);
        const data = await fetchData<typeof mockWishlist>('/customer/wishlist');
        setWishlist(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    getWishlist();
  }, []);

  return { wishlist, loading, error };
}

// Hook for fetching addresses
export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        setLoading(true);
        const data = await fetchData<typeof mockAddresses>('/customer/addresses');
        setAddresses(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    getAddresses();
  }, []);

  return { addresses, loading, error };
}
