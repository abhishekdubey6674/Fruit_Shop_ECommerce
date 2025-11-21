import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productsAPI } from '../services/api';

export const useProductDetail = (productId: number | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getById(id);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product details');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  return {
    product,
    loading,
    error,
    refetch: () => productId && fetchProduct(productId),
  };
};
