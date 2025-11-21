import { useState, useEffect, useCallback } from 'react';
import { orderAPI } from '../services/api';
import { OrderResponse } from '../types';
import { storage, StorageKeys } from '../utils/storage';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if user is authenticated
      const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
      if (!token) {
        setLoading(false);
        return; // Don't fetch if not authenticated
      }
      
      const data = await orderAPI.listOrders();
      setOrders(data);
    } catch (err: any) {
      // Don't show error for 401 (user not logged in)
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
        console.error('Fetch orders error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // const createOrder = async (
  //   addressId: number,
  //   items: Array<{product_id: number; quantity: number; price: string}>
  // ) => {
  //   try {
  //     setError(null);
  //     const order = await orderAPI.create(addressId, items);
  //     await fetchOrders();
  //     return { success: true, order };
  //   } catch (err: any) {
  //     const message = err.response?.data?.message || 'Failed to create order';
  //     setError(message);
  //     return { success: false, message };
  //   }
  // };

  return {
    orders,
    loading,
    error,
    // createOrder,
    refreshOrders: fetchOrders,
  };
};

export const useOrderDetail = (orderId: number | null) => {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderAPI.orderDetails(id);
      setOrder(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch order details');
      console.error('Fetch order detail error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail(orderId);
    }
  }, [orderId, fetchOrderDetail]);

  return {
    order,
    loading,
    error,
    refetch: () => orderId && fetchOrderDetail(orderId),
  };
};
