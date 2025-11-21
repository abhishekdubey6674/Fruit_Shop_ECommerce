import { useState, useEffect, useCallback } from 'react';
import { paymentAPI } from '../services/api';
import { PaymentRequest, PaymentResponse } from '../types';
import { storage, StorageKeys } from '../utils/storage';

export const usePayment = () => {
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Payments ==========================
  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
      if (!token) {
        setLoading(false);
        return;
      }

      const data = await paymentAPI.getPayments();
      setPayments(data);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Failed to fetch payments');
        console.log('Fetch payments error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Make Payment ==========================
  const makePayment = async (data: PaymentRequest) => {
    try {
      setError(null);
      const res = await paymentAPI.pay(data);
      await fetchPayments();
      return { success: true, data: res };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Payment failed';
      setError(message);
      return { success: false, message };
    }
  };

  // Delete Payment (optional)
//   const deletePayment = async (id: number) => {
//     try {
//       setError(null);
//       await paymentAPI.deletePayment(id);
//       await fetchPayments();
//       return { success: true };
//     } catch (err: any) {
//       const message = err.response?.data?.message || 'Failed to delete payment';
//       setError(message);
//       return { success: false, message };
//     }
//   };

  return {
    payments,
    loading,
    error,
    makePayment,
    // deletePayment,
    refreshPayments: fetchPayments,
  };
};
