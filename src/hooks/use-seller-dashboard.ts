
import { useEffect, useState } from 'react';
import { fetchData, mockSellerStats, mockOrders, mockProducts } from '@/services/api';

// Types for seller dashboard data
export interface SellerStats {
  revenue: { total: number; change: number; period: string };
  productsSold: { total: number; change: number; period: string };
  newCustomers: { total: number; change: number; period: string };
  pendingOrders: { total: number; change: number; period: string };
  salesData: Array<{ name: string; total: number }>;
  productCategories: Array<{ name: string; value: number }>;
}

export interface SellerOrder {
  id: number;
  customer: string;
  product: string;
  amount: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Pending';
}

export interface SellerProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
}

// Hook for fetching seller dashboard statistics
export function useSellerStats() {
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const data = await fetchData<typeof mockSellerStats>('/seller/stats');
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

// Hook for fetching seller orders
export function useSellerOrders() {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchData<typeof mockOrders>('/seller/orders');
        // Explicitly type cast the status field to ensure it matches SellerOrder
        const typedOrders = data.map(order => ({
          ...order,
          status: order.status as 'Delivered' | 'Processing' | 'Shipped' | 'Pending'
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

// Hook for fetching seller products
export function useSellerProducts() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchData<typeof mockProducts>('/seller/products');
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return { products, loading, error };
}
