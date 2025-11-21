import { useState, useEffect, useCallback } from 'react';
import { addressAPI } from '../services/api';
import { AddressRequest, AddressResponse } from '../types';
import { storage, StorageKeys } from '../utils/storage';

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
      if (!token) {
        setLoading(false);
        return; // User not logged in
      }

      const data = await addressAPI.getAddresses();
      setAddresses(data);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Failed to fetch addresses');
        console.log('Fetch addresses error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = async (data: AddressRequest) => {
    try {
      setError(null);
      await addressAPI.addAddress(data);
      await fetchAddresses();
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to add address';
      setError(message);
      return { success: false, message };
    }
  };

  const updateAddress = async (id: number, data: AddressRequest) => {
    try {
      setError(null);
      await addressAPI.updateAddress(id, data);
      await fetchAddresses();
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update address';
      setError(message);
      return { success: false, message };
    }
  };

  const deleteAddress = async (id: number) => {
    try {
      setError(null);
      await addressAPI.deleteAddress(id);
      await fetchAddresses();
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to delete address';
      setError(message);
      return { success: false, message };
    }
  };

  const defaultAddress = addresses.find(addr => addr.is_default);

  return {
    addresses,
    loading,
    error,
    defaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    refreshAddresses: fetchAddresses,
  };
};
